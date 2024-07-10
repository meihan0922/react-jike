import {
  Card,
  Form,
  Input,
  Button,
  Breadcrumb,
  Select,
  Radio,
  Upload,
  message,
} from "antd";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  createChannelsAPI,
  getArticleAPI,
  updateArticleAPI,
} from "@/apis/articles";
import { useGetChannels } from "@/hooks/useGetChannels";
// import {
//   addArticleAPI,
//   echoArticleAPI,
//   putArticleAPI,
// } from "@/day_06/apis/article";
// import { useGetChannels } from "@/day_06/Hooks/useGetChannels";

const Publish = () => {
  const navigate = useNavigate();
  const channels = useGetChannels();
  const [params] = useSearchParams();
  const articleId = params.get("id");
  const [imageType, setImageType] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (articleId) {
      async function getDetail(articleId) {
        const res = await getArticleAPI(articleId);
        const d = res.data;
        form.setFieldsValue({ ...d, type: d.cover.type });
        setImageType(d.cover.type);
        setImageList(d.cover.images.map((url) => ({ url })));
      }
      getDetail(articleId);
    }
  }, [articleId, form]);

  const onFinish = ({ title, content, channel_id }) => {
    if (imageList.length !== imageType)
      return message.warning("封面類型和圖片數量不相同！");
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageType
          ? imageList.map((i) => {
              if (i.response) {
                return i.response.data.url;
              } else {
                return i.url;
              }
            })
          : [],
      },
      channel_id,
    };
    if (articleId) {
      updateArticleAPI({ ...reqData, id: articleId });
    } else {
      createChannelsAPI(reqData);
    }
  };

  const onImageChange = (val) => setImageList(val.fileList);

  const onImageTypeChange = (e) => setImageType(e.target.value);

  return (
    <>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to="/">首頁</Link> },
              { title: `${articleId ? "編輯" : "發布"}文章` },
            ]}
          />
        }
      >
        <Form
          className="pl-20 py-6"
          initialValues={0}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="標題"
            name="title"
            rules={[{ required: false, message: "請輸入文章標題" }]}
          >
            <Input placeholder="请输入文章标题" className="w-96" />
          </Form.Item>
          <Form.Item
            label="頻道"
            name="channel_id"
            rules={[{ required: false, message: "請輸入文章頻道" }]}
          >
            <Select
              placeholder="請選擇頻道"
              className="max-w-96"
              options={channels}
              title="name"
            />
          </Form.Item>
          <Form.Item label="封面" name="type">
            <Radio.Group onChange={onImageTypeChange}>
              <Radio value={1}>單圖</Radio>
              <Radio value={3}>三圖</Radio>
              <Radio value={0}>無圖</Radio>
            </Radio.Group>
          </Form.Item>
          {imageType > 0 && (
            <div className="ml-11 mb-6">
              <Upload
                listType="picture-card"
                showUploadList
                maxCount={imageType}
                action="http://geek.itheima.net/v1_0/upload"
                name="image"
                fileList={imageList}
                onChange={onImageChange}
              >
                <div className="my-2">
                  <PlusOutlined />
                </div>
              </Upload>
            </div>
          )}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: false, message: "請輸入文章頻道" }]}
          >
            <ReactQuill
              theme="snow"
              placeholder="請輸入文章內容"
              className="publish-quill"
            />
          </Form.Item>
          <Button className="ml-11" type="primary" htmlType="submit">
            {articleId ? "更新" : "發布"}文章
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default Publish;
