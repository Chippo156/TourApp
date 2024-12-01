import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import TourAdmin from './tour';
import BookingtourAdmin from './bookingTour';
import BookingHotelAdmin from './bookingHotel';
import HotelAdmin from './hotel';

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <TourAdmin />;
      case '2':
        return <HotelAdmin />;
      case '3':
        return <BookingtourAdmin/>;
      default:
        return <BookingHotelAdmin/>;
    }
  };

  return (
    <Layout style={{ marginTop: 100 }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              label: 'Tour',
            },
            {
              key: '2',
              label: 'Destination',
            }, {
                key: '3',
                label: 'Booking tour',
            },
            {
                key: '4',
                label: 'Booking destination',
              },
           
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0, 
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;