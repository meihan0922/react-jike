import { Layout, Menu, Popconfirm } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { fetchUserInfo, clearUserInfo } from "@/day_06/store/modules/user";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import logo from "@/assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfo, logout } from "@/store/user";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首頁",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "創建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selectPath = location.pathname;
  const { userInfo } = useSelector((state) => state.user);

  const handleMenuClick = (e) => {
    console.log(`e + ::>>`, e);
    navigate(e.key);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <Layout>
      <Header className="px-0 py-0">
        <img src={logo} alt="logo" className="w-48 h-14 scale-90" />
        <div className="absolute right-0 top-0 pr-5 text-white">
          <span className="mr-5">{userInfo.name}</span>
          <span className="inline-block cursor-pointer">
            <Popconfirm
              title="確認退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={handleLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            items={items}
            selectedKeys={selectPath}
            onClick={handleMenuClick}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="overflow-y-auto px-5 py-5">
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
