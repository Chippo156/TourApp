import React from "react";
import { Menu, Dropdown, Button, Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import "./header.scss";
const menu = (
  <Menu>
    <Menu.Item key="login">Login</Menu.Item>
    <Menu.Item key="register">Register</Menu.Item>
  </Menu>
);

const HeaderPage = () => {
  return (
    <div className="header">
      <div className="container_header">
        <a href="/">
          <img
            src="https://shop-t1.gg/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/58b927db2fd026ec72d8f4e117571896.svg"
            alt="logo"
            className="logo"
          />
        </a>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="search-input"
        />
        <Dropdown menu={menu} trigger={["click"]} className="user-button">
          <Button icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderPage;
