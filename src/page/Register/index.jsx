import React, { useState } from 'react';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, DatePicker, Radio, Space } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.scss';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    alert('Register success');
    navigate('/login');
  }


  return (
    <div className="register-container">
      <h2>Register</h2>
      <Space direction="vertical" style={{ width: '100%' }}>

        <Input
          size="large"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <Input
          size="large"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
         <Radio.Group
              size="large"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}
            >
        <Radio value="male" style={{ width: '48%', textAlign: 'center' }}>
          Male
        </Radio>
        <Radio value="female" style={{ width: '48%', textAlign: 'center' }}>
          Female
        </Radio>
      </Radio.Group>

        <Input
          size="large"
          placeholder="Username"
          prefix={<UserOutlined />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <Input
          size="large"
          placeholder="Email"
          prefix={<MailOutlined />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <Input.Password
          size="large"
          placeholder="Password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        
        <Input
          size="large"
          placeholder="Phone"
          prefix={<PhoneOutlined />}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <Input
          size="large"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <DatePicker
          size="large"
          placeholder="Date of Birth"
          value={dob}
          onChange={(date) => setDob(date)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
       
      </Space>
      <Button type="primary" block style={{ marginTop: '20px' }} onClick={handleRegister}>
        Register
      </Button>
      <div className="register-links">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default Register;