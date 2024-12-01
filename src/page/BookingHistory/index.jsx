import { Button, Image, Layout, List, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { getListBookingById } from "../../controller/BookingController";
import { useSelector } from "react-redux";
import { getTourById } from "../../controller/tourDetailsController";
import { getDestinationById } from "../../controller/DetailsController";
import "./bookinghistory.scss";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import BookingtourAdmin from "./historyBookingTour";
import BookingHotelAdmin from "./historybookingHotel";
import Bookingtour from "./historyBookingTour";
import BookingHotel from "./historybookingHotel";
const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [tour, setTour] = useState([]);
  const [destination, setDestination] = useState([]);

  const user = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "2":
        return <Bookingtour />;
      case "1":
        return <BookingHotel />;
    }
  };
  const fetchBookingHistory = async (user_id) => {
    const response = await getListBookingById(user_id);
    setBookingHistory(response.result);
    console.log(response.result);
  };

  const fetchTour = async (tour_id) => {
    const response = await getTourById(tour_id);
    setTour(response.result);
  };

  const fetchDestination = async (destination_id) => {
    const response = await getDestinationById(destination_id);
    setDestination(response.result);
  };

  const renderItem = (item) => {
    return (
      <List.Item>
        <List.Item.Meta
          // avatar={<Image src={item.tour_id ? tour.image_url : destination.image_url} />}
          title={`History Booking:`}
        />
      </List.Item>
    );
  };

  useEffect(() => {
    if (user.isAuth && user.user.id) {
      fetchBookingHistory(user.user.id);
      console.log(bookingHistory);
    }
  }, [user]);

  return (
    <div className="container-history">
      <div className="main-container-history">
        <h2>Booking History</h2>
        <Layout style={{ marginTop: 20 }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={[
                {
                  key: "1",
                  label: "Booking hotel",
                },
                {
                  key: "2",
                  label: "Booking tour",
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
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
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
      </div>
    </div>
  );
};

export default BookingHistory;
