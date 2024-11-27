import React from "react";
import { Menu, Dropdown, Button, Input,Layout } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
const { Header } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="login">Login</Menu.Item>
    <Menu.Item key="register">Register</Menu.Item>
  </Menu>
);

const HeaderPage = () => {
  return (
    <Header className="header">
      <div className="container_header">
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
        <Dropdown menu={menu} trigger={["click"]} className="user-button">
          <Button icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderPage;