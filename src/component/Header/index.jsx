import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Space,
  message,
  Popover,
  Badge,
  Image,
  AutoComplete,
  Menu,
  Button,
  Drawer,
  Input,
  Dropdown,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import {
  FaUser,
  FaShoppingCart,
  FaRegUserCircle,
  FaRegCalendarCheck,
} from "react-icons/fa";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../controller/loginController";
import { login, logout } from "../../redux/UserSlice";
import { GrUserManager } from "react-icons/gr";

const menu = (
  <Menu>
    <Menu.Item key="login">Login</Menu.Item>
    <Menu.Item key="register">Register</Menu.Item>
  </Menu>
);

const HeaderPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMenuClick = () => {
    setDrawerVisible(true);
  };
  const handleLogout = async () => {
    let res = await logoutUser(localStorage.getItem("token"));
    if (res.code === 200) {
      message.success("Đăng xuất thành công");
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/");
    } else {
      message.error("Đăng xuất thất bại");
    }
  };
  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };
  const items = [
    {
      icon: <CiMenuBurger />,
      children: [
        {
          key: "1",
          label: "Đăng nhập",
          to: "/login",
        },
        {
          key: "2",
          label: "Đăng ký",
          to: "/register",
        },
      ],
    },
  ];
  const [content, setContent] = useState(
    <div className="content_list">
      <NavLink to="/profile" className="content_item">
        <FaRegUserCircle />
        <span>Thông tin cá nhân</span>
      </NavLink>
      <NavLink to="/historyBooking" className="content_item">
        <FaRegCalendarCheck />
        <span>Quản lý đơn hàng</span>
      </NavLink>
      <button className="btn btn_primary" onClick={handleLogout}>
        Đăng xuất
      </button>
    </div>
  );
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user.user?.role_id === 1) {
      setContent(
        <div className="content_list">
          <NavLink to="/admin" className="content_item">
            <GrUserManager />
            <span>Quản Lý</span>
          </NavLink>
          <NavLink to="/profile" className="content_item">
            <FaRegUserCircle />
            <span>Thông tin cá nhân</span>
          </NavLink>
          <button className="btn btn_primary" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      );
    }
  }, [user]);
  const title = (
    <div
      className="title"
      style={{ display: "flex", alignItems: "center", width: "100%" }}
    >
      <div
        className="title_info"
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <p className="title_name" style={{ fontSize: 10 }}>
          {user.user?.lastName}
        </p>
        <p className="title_email">{user.user?.email}</p>
      </div>
    </div>
  );
  const isAuth = user.isAuth;

  return (
    <div className="header">
      <div className="container_header">
        <Row className="header_row" style={{ width: "100%" }}>
          <Col span={6} className="header__logo">
            <NavLink to="/" className="header_left">
              <Image
                className="logo_img"
                preview={false}
                // width={200}
                src="https://shop-t1.gg/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/58b927db2fd026ec72d8f4e117571896.svg"
              />
            </NavLink>
          </Col>
          <Col span={12} className="header__search">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined style={{ fontSize: 20 }} />}
              className="search-input"
            />
          </Col>
          <Col span={4} className="" offset={2}>
            {isAuth ? (
              <Popover content={content} trigger="hover" title={title}>
                <Space className="header_right_space">
                  {user?.isAuth ? (
                    <p className="text">Xin chào,{user.user?.username}</p>
                  ) : (
                    <p className="text">Tài khoản</p>
                  )}
                </Space>
              </Popover>
            ) : (
              <div className="header-option">
                <div className="list-option">
                  <NavLink to="/login" className="text">
                    Đăng nhập
                  </NavLink>
                  <NavLink to="/register" className="text">
                    Đăng ký
                  </NavLink>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeaderPage;
