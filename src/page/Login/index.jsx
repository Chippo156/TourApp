import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, notification } from "antd";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../controller/loginController";
const Login = () => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: `Hello, I'm a notification in ${placement}`,
      placement,
    });
  };
  const handleLogin = async () => {
    console.log("username", username);
    console.log("password,", password);
    let res = await loginUser(username, password);
    console.log("ressss", res);
    if (res && res.code === 1000) {
      // openNotification('topRight')
      localStorage.setItem("token", res.result.token);
      navigate("/");
    } else {
      console.log("Login fail");
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <Input
        size="large"
        placeholder="Username"
        prefix={<UserOutlined />}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "20px" }}
      />
      <Input.Password
        size="large"
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "20px" }}
      />
      <Button
        type="primary"
        block
        style={{ marginTop: "20px" }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <div className="login-links">
        <a href="/forgot-password" className="forgot-password">
          Forgot Password?
        </a>
        <a href="/Register">Register</a>
      </div>
    </div>
  );
};

export default Login;
