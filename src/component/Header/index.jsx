import React from "react";
import { Layout, Menu, Dropdown, Button, Input } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const { Header } = Layout;

const HeaderPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      // Handle logout logic here
    } else {
      navigate(`/${key}`);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {user ? (
        <>
          <Menu.Item key="profile">Profile</Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login">Login</Menu.Item>
          <Menu.Item key="register">Register</Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Header className="header">
      <img
        src="https://shop-t1.gg/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/58b927db2fd026ec72d8f4e117571896.svg"
        alt="logo"
        className="logo"
      />
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        className="search-input"
      />
      <Dropdown overlay={menu} trigger={["click"]} className="user-button">
        <Button icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
};

export default HeaderPage;
