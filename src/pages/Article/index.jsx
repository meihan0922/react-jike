import {
  Card,
  Form,
  Breadcrumb,
  Button,
  Select,
  DatePicker,
  Radio,
  message,
  Tag,
  Table,
  Popconfirm,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
// import img404 from "@/day_06/assets/error.png";
import { useEffect, useState } from "react";
import { useGetChannels } from "@/hooks/useGetChannels";
// import { useGetChannels } from "@/day_06/Hooks/useGetChannels";
import { getArticleListAPI, deleteArticleAPI } from "@/apis/articles";

const { RangePicker } = DatePicker;
const status = {
  1: <Tag color="warning">待審核</Tag>,
  2: <Tag color="success">審核通過</Tag>,
};

// 筛选状态
const filterRadios = [
  { text: "全部", val: "" },
  { text: "待審核", val: 1 },
  { text: "審核通過", val: 2 },
];

const Article = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [count, setCount] = useState([]);
  const channels = useGetChannels();
  const [params, setParams] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(params);
      setList(res.data.results);
      setCount(res.data.total_count);
    }
    getList();
  }, [params]);

  const onSearch = ({ channel_id, status, date }) => {
    setParams({
      ...params,
      channel_id,
      status,
      begin_pubdate: date[0]?.format("YYYY-MM-DD"),
      end_pubdate: date[1]?.format("YYYY-MM-DD"),
    });
  };

  const onPageChange = (page) => {
    setParams({
      ...params,
      page,
    });
  };

  const onDeleteArticle = async (id) => {
    await deleteArticleAPI(id);
    setParams({
      ...params,
    });
  };

  return (
    <>
      <Card
        title={
          <Breadcrumb
            items={[{ title: <Link>首頁</Link> }, { title: "文章列表" }]}
          />
        }
      >
        <Form className="pt-6 pb-10" onFinish={onSearch}>
          <Form.Item label="狀態" name="status">
            <Radio.Group>
              {filterRadios.map((item) => (
                <Radio key={item.val} value={item.val}>
                  {item.text}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="渠道" name="channel_id" className="w-60">
            <Select placeholder="請選擇渠道" options={channels} />
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker locale={locale} />
          </Form.Item>
          <Button
            className="tracking-widest ml-10"
            type="primary"
            htmlType="submit"
          >
            篩選
          </Button>
        </Form>
      </Card>
      <Card title={`根據篩選條件共查詢 ${count} 條結果：`} className="mt-4">
        <Table
          rowKey="tableId"
          columns={[
            {
              title: "封面",
              dataIndex: "cover",
              width: 120,
              render: (cover) =>
                cover.images?.[0] ? (
                  <img
                    src={cover.images?.[0]}
                    width={80}
                    height={60}
                    alt="cover"
                  />
                ) : (
                  "-"
                ),
            },
            {
              title: "標題",
              dataIndex: "title",
              width: 220,
            },
            {
              title: "狀態",
              dataIndex: "status",
              render: (data) => status[data],
            },
            {
              title: "發布時間",
              dataIndex: "pubdate",
            },
            {
              title: "閱讀數",
              dataIndex: "read_count",
            },
            {
              title: "評論數",
              dataIndex: "comment_count",
            },
            {
              title: "點讚數",
              dataIndex: "like_count",
            },
            {
              title: "操作",
              render: (data) => {
                return (
                  <div className="flex justify-around">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/publish?id=${data.id}`)}
                    />
                    <Popconfirm
                      title="刪除文章"
                      description="確認要刪除當前文章嗎?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onDeleteArticle(data.id)}
                    >
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  </div>
                );
              },
            },
          ]}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: params.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </>
  );
};

export default Article;
