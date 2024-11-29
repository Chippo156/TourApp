import React from "react";
import { Carousel, Image } from "antd";
import carousel1 from "../../assets/images/carosel1.png";
import carousel2 from "../../assets/images/carosel2.png";
import "./home.scss"; // Import the custom SCSS file
import { Row, Col, Card, Typography, Button } from "antd";
import {
  SmileOutlined,
  PercentageOutlined,
  RocketOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function Home() {
  const benefits = [
    {
      icon: <SmileOutlined style={{ fontSize: "24px", color: "#ff8a65" }} />,
      title: "Discover the possibilities",
      description:
        "With nearly half a million attractions, hotels & more, you're sure to find joy.",
    },
    {
      icon: (
        <PercentageOutlined style={{ fontSize: "24px", color: "#ff8a65" }} />
      ),
      title: "Enjoy deals & delights",
      description:
        "Quality activities. Great prices. Plus, earn Klook credits to save more.",
    },
    {
      icon: <RocketOutlined style={{ fontSize: "24px", color: "#ff8a65" }} />,
      title: "Exploring made easy",
      description:
        "Book last minute, skip lines & get free cancellation for easier exploring.",
    },
    {
      icon: <SafetyOutlined style={{ fontSize: "24px", color: "#ff8a65" }} />,
      title: "Travel you can trust",
      description:
        "Read reviews & get reliable customer support. We're with you at every step.",
    },
  ];

  const items = [
    {
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      title: "Tokyo Disneyland Ticket",
      location: "Theme parks • Tokyo",
      price: "US$ 52.85",
      rating: "4.8",
      bookings: "3M+ booked",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "JR Whole Japan Rail Pass",
      location: "Rail passes • Tokyo",
      price: "From US$ 334.35",
      rating: "4.8",
      bookings: "600K+ booked",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Mount Fuji sightseeing tour",
      location: "Tours • Yamanashi",
      price: "US$ 50.39",
      rating: "4.8",
      bookings: "30K+ booked",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "TeamLab Planets TOKYO Ticket",
      location: "Museums • Tokyo",
      price: "From US$ 24.30",
      rating: "4.8",
      bookings: "500K+ booked",
    },
  ];

  return (
    <div className="home-container">
      <Carousel arrows infinite={false} draggable={true} autoplay>
        <div>
          <Image preview={false} style={{ width: "100%" }} src={carousel1} />
        </div>
        <div>
          <Image preview={false} style={{ width: "100%" }} src={carousel2} />
        </div>
      </Carousel>
      <div className="home-main-container">
        <div style={{ padding: "20px" }}>
          <Title level={2}>Why choose Klook</Title>
          <Row gutter={[16, 16]}>
            {benefits.map((benefit, index) => (
              <Col key={index} xs={24} sm={12} lg={6}>
                <Card bordered={false}>
                  {benefit.icon}
                  <Title level={4}>{benefit.title}</Title>
                  <Text>{benefit.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>

          <Title level={2} style={{ marginTop: "40px" }}>
            Travelers' favorite choice
          </Title>
          <Row gutter={[16, 16]}>
            {items.map((item, index) => (
              <Col key={index} xs={24} sm={12} lg={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={item.title}
                      src={item.image}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 300,
                      }}
                    />
                  }
                >
                  <div>
                    <Text className="title">{item.title}</Text>
                  </div>
                  <div>
                    <Text type="secondary" block className="location">
                      {item.location}
                    </Text>
                  </div>
                  <div>
                    <Text style={{ color: "#ff4d4f" }}>{item.price}</Text>
                  </div>
                  <div>
                    <Text>⭐ {item.rating}</Text>
                    <Text style={{ marginLeft: "8px" }}>{item.bookings}</Text>
                  </div>
                  {item.badge && (
                    <div>
                      <Text
                        style={{
                          color: "#52c41a",
                          marginTop: "8px",
                          display: "block",
                        }}
                      >
                        {item.badge}
                      </Text>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          <div style={{ textAlign: "center", marginTop: "40px",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Button
              type="primary"
              className="button"
            >
              See more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
