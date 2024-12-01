import {
  Button,
  Card,
  Carousel,
  Image,
  Typography,
  Collapse,
  Modal,
  Form,
  DatePicker,
  Select,
  Input,
  Row,
  Col,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  getTourById,
  getTourImages,
  getListByTourId,
} from "../../controller/tourDetailsController";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import "./tourdetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { handleGetFavoriteDestination } from "../../controller/homeController";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const TourDetails = () => {
  const navigate = useNavigate();
  const [tour, setTour] = useState({});
  const [tourImages, setTourImages] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [items, setItem] = useState([]);

  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [departure, setDeparture] = useState("Hà Nội");
  const [departureDate, setDepartureDate] = useState("");
  const [people, setPeople] = useState(1);
  const tour_id = useParams().id;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleBookingTour();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchTour = async () => {
    const response = await getTourById(tour_id);
    setTour(response.result);
  };

  const fetchTourImages = async () => {
    const response = await getTourImages(tour_id);
    setTourImages(response);
  };
  const formatDate = (date) => {
    date = new Date(date);
    if (!(date instanceof Date)) {
      throw new Error("Invalid date");
    }
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("vn-VN", options);
  };

  const fetchItinerary = async () => {
    const response = await getListByTourId(tour_id);
    setItinerary(response);
  };

  const StarRating = ({ rating }) => {
    // Đảm bảo rating là một số hợp lệ
    const validRating = Number.isFinite(rating) ? rating : 0;

    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {[...Array(fullStars)].map((_, index) => (
          <StarFilled
            key={`full-${index}`}
            style={{ color: "#FFD700", fontSize: "20px" }}
          />
        ))}
        {halfStar && (
          <StarTwoTone
            twoToneColor="#FFD700"
            key="half"
            style={{ fontSize: "20px" }}
          />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <StarOutlined
            key={`empty-${index}`}
            style={{ color: "#FFD700", fontSize: "20px" }}
          />
        ))}
      </div>
    );
  };
  const itineraryRef = useRef(null);

  const handleScrollItinerary = () => {
    itineraryRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setDeparture(value);
  };
  const handleChangePeople = (value) => {
    console.log(`selected ${value}`);
    setPeople(value);
  };
  const handleGetFavorite = async () => {
    let res = await handleGetFavoriteDestination();
    if (res && res.code === 200) {
      setItem(res.result.tours);
    }
  };
  useEffect(() => {
    handleGetFavorite();
    fetchTour();
    fetchTourImages();
    fetchItinerary();
    window.scrollTo(0, 0);
  }, []);
  const handleBookingTour = () => {
    if (!name || !email || !phone || !departure || !departureDate || !people) {
      alert("Vui lòng điền đầy đủ thông tin");
      console.log(name, email, phone, departure, departureDate, people);

      return;
    }
    navigate("/bookingTour", {
      state: {
        tour: tour,
        name: name,
        email: email,
        phone: phone,
        departure: departure,
        departureDate: departureDate,
        people: people,
      },
    });
  };
  const handleTourDetails = (tour_id) => {
    navigate(`/tour-details/${tour_id}`);
  };
  return (
    <div className='container_tour'>
      <div>
        <Title level={3}>{tour.name}</Title>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <StarRating rating={tour.rating} />
        <Text className='text'>{tour.rating}</Text>
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 20 }}>
        <Carousel
          arrows={true}
          infinite={false}
          draggable={true}
          autoplay
          style={{ width: 800, height: 400 }}
        >
          {tourImages?.map((image) => (
            <div key={image.id}>
              <Image
                preview={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={image.imageUrl}
              />
            </div>
          ))}
        </Carousel>
        <Card >
          <div style={{ gap: 10, display: "flex", padding: 10 }}>
            <ClockCircleOutlined style={{ fontSize: 20 }} />
            <Text className='text'>{tour.duration}</Text>
          </div>
          <div style={{ gap: 10, display: "flex", padding: 10 }}>
            <CalendarOutlined style={{ fontSize: 20 }} />
            <Text className='text'>{tour.start_date}</Text>
          </div>
          <div style={{ gap: 10, display: "flex", alignItems: "flex-start", padding: 10 }}>
            <ArrowRightOutlined style={{ fontSize: 20, marginTop: 5 }} />
            <Text className='text'>{tour.name}</Text>
          </div>
          <div style={{ width: "100%", justifyContent: "flex-end", display: "flex", gap: 10, padding: 10 }}>
            <Text className='text'>Giá từ:</Text>
            <Text className='text' style={{ color: "#b20000", fontWeight: "bold" }}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(tour.price)}</Text>
          </div>
          <Button type='primary' className='button'
          // onClick={() => setIsModalVisible(true)}
          >Gửi yêu cầu</Button>
          {/* <Button type='text' className='text' style={{ height: 45, marginTop: 10, width: "100%" }}>Xem lịch khởi hành</Button> */}
        </Card>
      </div>
      <div style={{ marginTop: 70 }}>
        <div>
          <Title level={2}>{tour.name}</Title>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <StarRating rating={tour.rating} />
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 20 }}>
          <Carousel
            autoplaySpeed={2000}
            arrows={true}
            infinite={true}
            draggable={true}
            autoplay
            style={{ width: 800, height: 400 }}
          >
            {tourImages?.map((image) => (
              <div key={image.id}>
                <Image
                  preview={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                  src={image.imageUrl}
                />
              </div>
            ))}
          </Carousel>
          <Card>
            <div style={{ gap: 10, display: "flex", padding: 10 }}>
              <ClockCircleOutlined style={{ fontSize: 20 }} />
              <Text className="text">{tour.duration}</Text>
            </div>
            <div style={{ gap: 10, display: "flex", padding: 10 }}>
              <CalendarOutlined style={{ fontSize: 20 }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text className="text">Khởi hành từ {tour.departure}</Text>
                <Text className="text">
                  Ngày khởi hành: {formatDate(tour.start_date)}
                </Text>
              </div>
            </div>
            <div
              style={{
                gap: 10,
                display: "flex",
                alignItems: "flex-start",
                padding: 10,
              }}
            >
              <ArrowRightOutlined style={{ fontSize: 20, marginTop: 5 }} />
              <Text className="text">{tour.name}</Text>
            </div>
            <div
              style={{
                width: "100%",
                justifyContent: "flex-end",
                display: "flex",
                gap: 10,
                padding: 10,
              }}
            >
              <Text className="text">Giá từ:</Text>
              <Text
                className="text"
                style={{ color: "#b20000", fontWeight: "bold" }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(tour.price)}
              </Text>
            </div>
            <Button type="primary" className="button" onClick={showModal}>
              Gửi yêu cầu
            </Button>
            <Modal
              title="Gửi yêu cầu"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div>
                <Form>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>
                      <Text style={{ marginBottom: 10 }}>
                        Chọn ngày khởi hành:{" "}
                      </Text>
                      <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                        onChange={(date, dateString) => {
                          setDepartureDate(dateString);
                        }}
                      />
                    </div>
                    <div>
                      <Text style={{ marginBottom: 10 }}>Nơi khởi hành: </Text>
                      <Select
                        defaultValue="Hà Nội"
                        style={{ width: "230px", height: "40px" }}
                        onChange={handleChange}
                        options={[
                          { value: "Hà Nội", label: "Hà Nội" },
                          { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
                          { value: "Đà Nẵng", label: "Đà Nẵng" },
                          { value: "Hải Phòng", label: "Hải Phòng" },
                        ]}
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div style={{ flex: 1 }}>
                      <Text style={{ marginBottom: 10 }}>Số lượng người: </Text>
                      <Select
                        showSearch
                        defaultValue="1"
                        style={{ width: "220px", height: "40px" }}
                        onChange={handleChangePeople}
                        options={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                          { value: "3", label: "3" },
                          { value: "4", label: "4" },
                          { value: "5", label: "5" },
                          { value: "6", label: "6" },
                          { value: "7", label: "7" },
                          { value: "8", label: "8" },
                          { value: "9", label: "9" },
                          { value: "10", label: "10" },
                          { value: "11", label: "11" },
                          { value: "12", label: "12" },
                          { value: "13", label: "13" },
                          { value: "14", label: "14" },
                          { value: "15", label: "15" },
                          { value: "16", label: "16" },
                          { value: "17", label: "17" },
                          { value: "18", label: "18" },
                          { value: "19", label: "19" },
                          { value: "20", label: "20" },
                        ]}
                      />
                    </div>
                    <div>
                      <Text style={{ marginBottom: 10 }}>Họ tên: </Text>
                      <Input
                        placeholder="Họ tên"
                        style={{ width: "230px", height: "40px" }}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div style={{ width: "290px" }}>
                      <Text style={{ marginBottom: 10 }}>Email: </Text>
                      <Input
                        placeholder="Email"
                        style={{ width: "100%" }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Text style={{ marginBottom: 10 }}>Số điện thoại: </Text>
                      <Input
                        placeholder="Số điện thoại"
                        style={{ width: "230px", height: "40px" }}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </Modal>
            <Button
              type="dashed"
              className="button-check"
              onClick={handleScrollItinerary}
            >
              Xem lịch trình tour
            </Button>
          </Card>
        </div>
        <div style={{ marginTop: 10 }}>
          <div style={{ marginBottom: 10 }}>
            <Title level={3}>Mô tả tour</Title>
            <Text className="text">{tour.description}</Text>
          </div>
          <div ref={itineraryRef}>
            <Title level={3}>Điểm nổi bật</Title>
            {tour.highlight &&
              tour.highlight.split(".").map((sentence, index) => (
                <Title level={4} key={index}>
                  <CheckOutlined /> {sentence.trim()}.
                </Title>
              ))}
          </div>
          <div style={{ marginTop: 50 }}>
            <Title level={3}>Lịch trình tour</Title>
            <Collapse defaultActiveKey={["1"]}>
              {itinerary.map((item, index) => (
                <Panel
                  style={{ fontSize: 18, fontWeight: "bold" }}
                  header={item.day}
                  key={index}
                >
                  {item.activities
                    .split(".")
                    .filter((sentence) => sentence.trim() !== "")
                    .map((sentence, i) => (
                      <p
                        style={{
                          marginLeft: 30,
                          marginRight: 20,
                          lineHeight: 2,
                          fontSize: 20,
                          fontWeight: "normal",
                        }}
                        key={i}
                      >
                        <CheckSquareOutlined style={{ marginRight: 15 }} />
                        {sentence.trim()}.
                      </p>
                    ))}
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
        <Title level={2} style={{ margin: "20px 0px" }} className="title-white">
          Other Tour
        </Title>
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
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
      </div>
    </div>
  );
};

export default TourDetails;
