import React, { useEffect, useState } from "react";
import {
  Carousel,
  Image,
  Row,
  Col,
  Card,
  Typography,
  Button,
  List,
  Pagination,
} from "antd";
import {
  SmileOutlined,
  PercentageOutlined,
  RocketOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import anhHaNoi from "../../assets/images/anh-ha-noi.png";
import anhDaNang from "../../assets/images/anh-da-nang.png";
import anhKhac from "../../assets/images/anh-khac.png";
import anhHoChiMinh from "../../assets/images/anh-hcm.png";
import { getCountReview } from "../../controller/DetailsController";
import { handleGetDestination, handleGetFavoriteDestination } from "../../controller/homeController";
import carousel1 from "../../assets/images/carosel1.png";
import carousel2 from "../../assets/images/carosel2.png";
import "./home.scss"; // Import the custom SCSS file

const { Title, Text } = Typography;

function Home() {
  const navigate = useNavigate();
  const [dataLastWeekend, setDataLastWeekend] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [items, setItem] = useState([]);
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


  const data = [
    {
      city: "Hồ Chí Minh",
      country: "Việt Nam",
      uri: anhHoChiMinh,
      value: "Hồ Chí Minh",
    },
    {
      city: "Hà Nội",
      country: "Việt Nam",
      uri: anhHaNoi,
      value: "Hanoi",
    },
    {
      city: "Đà Nẵng",
      country: "Việt Nam",
      uri: anhDaNang,
      value: "Da nang",
    },
    {
      city: "Khu Vực Khác",
      country: "Việt Nam",
      uri: anhKhac,
      value: "Other",
    },
  ];

  const handleGetCountReview = async (des_id) => {
    let res = await getCountReview(des_id);
    if (res && res.code === 200) {
      return res.result;
    }
  };

  const handleGetData = async () => {
    let res = await handleGetDestination();
    console.log(res);
    if (res && res.code === 200) {
      for (const item of res.result.destinations) {
        let count = await handleGetCountReview(item.destination_id);
        item.count_review = count;
      }
      console.log(res);

      setDataLastWeekend(res.result.destinations);
    }
  };
  const handleGetFavorite = async () => {
    let res = await handleGetFavoriteDestination();
    if (res && res.code === 200) {
      setItem(res.result.tours);
    }
  }

  const handleTourDetails = (tour_id) => {
    navigate(`/tour-details/${tour_id}`);
  }

  const handleCityDetail = (value) => {
    navigate(`/destination/filter/${value}`);
  };

  const handleDetails = (des_id) => {
    navigate(`/destination/${des_id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleExploreClick = () => {
    navigate("/filter", { state: { value: "trending" } });
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataLastWeekend.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    handleGetData();
    handleGetFavorite();
  }, []);
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
                  <Text style={{ fontSize: 16, height: 60 }}>
                    {benefit.description}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>

          <Title level={2} style={{ marginTop: "40px" }}>
            Travelers favorite choice
          </Title>
          <Row gutter={[16, 16]}>
            {items.map((item, index) => (
              <Col key={index} span={6}>
                <Card
                  hoverable
                  cover={
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  }
                  onClick={() => handleTourDetails(item.id)}
                >
                  <div>
                    <Text className="title_card">{item.name}</Text>
                  </div>
                  <div className="info-row">
                    <Text className="duration_card">{item.duration}</Text>
                    <Text className="departure_card">{item.departure}</Text>
                  </div>
                  <div className="info-row">
                    <Text className="price" style={{ color: "#ff4d4f" }}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </Text>
                    <Text className="rating">{item.rating}⭐</Text>
                  </div>
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
          <div className="padding-container">
            <Title level={2} className="title-black">
              Explore stays in trending destinations
            </Title>
            <Row gutter={[16, 16]}>
              {data.map((item, index) => (
                <Col key={index} span={6}>
                  <Card
                    hoverable
                    cover={
                      <Image
                        preview={false}
                        src={item.uri}
                        alt={item.city}
                        className="image-cover"
                        height={200}
                      />
                    }
                    onClick={() => handleCityDetail(item.value)}
                  >
                    <Card.Meta
                      title={
                        <Text className="card-meta-title">{item.city}</Text>
                      }
                      description={
                        <Text className="card-meta-description">
                          {item.country}
                        </Text>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="margin-top-bottom">
              <div className="flex-space-between">
                <Title level={2} className="title-white">
                  Travelers favorite choice
                </Title>
              </div>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={currentItems}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      hoverable
                      cover={
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          style={{ height: 200 }}
                        />
                      }
                      onClick={() => handleDetails(item.destination_id)}
                    >
                      <Card.Meta
                        title={
                          <Text className="card-meta-title">{item.name}</Text>
                        }
                        description={
                          <>
                            <Text className="card-meta-description">
                              {item.description}
                            </Text>
                            <div className="flex-align-center">
                              <Text className="rating">
                                {item.average_rating}
                              </Text>
                              <Text className="reviews">
                                ({item.count_review.toFixed(1)} reviews)
                              </Text>
                            </div>
                          </>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
              <div className="centered-container">
                <Pagination
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={dataLastWeekend.length}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
