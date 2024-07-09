import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/logo.png";
import { login } from "@/store/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (val) => {
    await dispatch(login(val));
    navigate("/");
    message.success("登入成功");
  };

  return (
    <div className="login-page h-screen w-screen bg-contain">
      <Card className="bg-white rounded-md fixed top-1/2 left-1/2 shadow-lg -translate-x-1/2 -translate-y-1/2 pt-4 py-12">
        <img src={logo} alt="logo" className="w-52 h-16 mx-auto mb-4" />
        <Form
          className="w-96 pb-4"
          validateTrigger="onBlur"
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "請輸入手機號碼",
              },
              {
                // pattern: /^09\d{8}$/,
                pattern: /^1[3-9]\d{9}$/,
                message: "請輸入正確的手機",
              },
            ]}
          >
            <Input placeholder="請輸入手機號碼 13800000002" maxLength={11} />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "請輸入驗證碼",
              },
            ]}
          >
            <Input placeholder="請輸入驗證碼 246810" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="tracking-widest w-full h-10"
          >
            登入
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
