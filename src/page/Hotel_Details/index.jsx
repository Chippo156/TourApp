/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {
  getAmenities,
  getCountReview,
  getDestinationById,
  getFilterRoom,
  getImageRoom,
  getImagesDestination,
  getReviews,
  getRoomsByDestinationId,
} from "../../controller/DetailsController";
import { useDispatch } from "react-redux";
import { handleGetDestination } from "../../controller/homeController";
import {
  Card,
  Typography,
  List,
  Image as AntImage,
  Row,
  Col,
  Image,
  Carousel,
  Radio,
  DatePicker,
  Button,
  Pagination,
  Breadcrumb,
  Modal,
} from "antd";
import "./details.scss";
import { useNavigate, useParams } from "react-router-dom";
import Icon, {
  MinusOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  StarTwoTone,
  TeamOutlined,
} from "@ant-design/icons";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { message } from "antd";
export default function TravelDetail() {
  const des_id = useParams().id;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const [destination, setDestinations] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [checked, setChecked] = useState("first"); // State for radio button
  const [checkedExtra, setCheckedExtra] = useState("first"); // State for radio button

  const [imagesDes, setImagesDes] = useState([]);
  const [roomImages, setRoomImages] = useState({});
  const [destinations, setListDestination] = useState([]);
  const [numberGuest, setNumberGuest] = useState(1);
  const [numberRoom, setNumbeRoom] = useState(1);
  const [reviews, setReviews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const currentDate = new Date();
  const refundDate = new Date(currentDate);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleChange = (dates) => {
    if (dates) {
      setStartDate(dates[0].format("YYYY-MM-DD"));
      setEndDate(dates[1].format("YYYY-MM-DD"));
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };
  refundDate.setDate(currentDate.getDate() + 7);
  const formatDateRefund = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const handleGetCountReview = async (des_id) => {
    let res = await getCountReview(des_id);
    if (res && res.code === 200) {
      return res.result;
    }
  };
  const handleGetData = async () => {
    let res = await handleGetDestination();
    if (res && res.code === 200) {
      for (const item of res.result.destinations) {
        let count = await handleGetCountReview(item.destination_id);
        item.count_review = count;
      }

      setListDestination(res.result.destinations);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const fetchImagesDestination = async () => {
    if (destination && destination.destination_id) {
      let res = await getImagesDestination(destination.destination_id);
      setImagesDes(res);
    } else {
      let res = await getImagesDestination(1);
      setImagesDes(res);
    }
  };

  const fetchImageRoom = async (id) => {
    if (roomImages[id]) {
      return; // Nếu đã có ảnh trong state, không cần gọi lại API
    }
    let res = await getImageRoom(id);

    setRoomImages((prev) => ({ ...prev, [id]: res })); // Lưu ảnh với ID tương ứng
  };
  const getDestinationDetails = async () => {
    if (des_id) {
      let res = await getDestinationById(des_id);
      if (res.code === 200) {
        setDestinations(res.result);
      }
    } else {
      let res = await getDestinationById(1);
      if (res.code === 200) {
        setDestinations(res.result);
      }
    }
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const getAmenity = async () => {
    if (destination && destination.destination_id) {
      let res = await getAmenities(destination.destination_id);
      setAmenities(res);
    }
  };
  const getRoomsByDestination = async () => {
    if (destination && destination.destination_id) {
      let res = await getRoomsByDestinationId(destination.destination_id);
      setRooms(res);
    }
  };
  const liked =
    "Cleanliness, staff & service, property conditions & facilities, room comfort";

  const getReview = async () => {
    try {
      if (destination && destination.destination_id) {
        let res = await getReviews(destination.destination_id);
        if (res.code === 200) {
          setReviews(res.result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    rooms.forEach((room) => {
      fetchImageRoom(room.id);
    });
  }, [rooms]);
  useEffect(() => {
    getDestinationDetails();
    fetchImagesDestination();
  }, []);

  useEffect(() => {
    getAmenity();
    getReview();
    getRoomsByDestination();
  }, [destination]);

  const StarRating = ({ rating = 0 }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
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

  const handleAddGuest = () => {
    setNumberGuest(numberGuest + 1);
  };
  const handleRemoveGuest = () => {
    if (numberGuest > 1) {
      setNumberGuest(numberGuest - 1);
    }
  };
  const handleAddRoom = () => {
    setNumbeRoom(numberRoom + 1);
  };
  const handleRemoveRoom = () => {
    if (numberRoom > 1) {
      setNumbeRoom(numberRoom - 1);
    }
  };
  const { Text, Title } = Typography;

  const fetchFilterRoom = async () => {
    try {
      let res = await getFilterRoom(
        numberGuest,
        startDate,
        endDate,
        numberRoom,
        destination.destination_id
      );
      setRooms(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (numberGuest === 1 || numberRoom === 1) {
      return;
    }
    fetchFilterRoom();
  }, [numberGuest, numberRoom, endDate]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = destinations.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch the destination details using the des_id
    getDestinationDetails(des_id);
  }, [des_id]);
  const handleDetails = (des_id) => {
    navigate(`/destination/${des_id}`);
  };
  const datePickerRef = useRef(null);

  const handleDeserve = (des_id, room_id) => {
    if (startDate === null || endDate === null) {
      // Scroll to the DatePicker component
      datePickerRef.current.scrollIntoView({ behavior: "smooth" });
      message.warning("Please select both start and end dates.");

      return;
    }
    navigate(`/deserveHotel`, {
      state: {
        desId: des_id,
        roomId: room_id,
        startDate: startDate,
        endDate: endDate,
        numberGuest: numberGuest,
        numberRoom: numberRoom,
        refund: checked,
        extra: checkedExtra,
      },
    });
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
    return date.toLocaleDateString("en-US", options);
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="container-details">
      <div className="container-main">
        <Breadcrumb
          items={[
            {
              title: <a href="/">Home</a>,
            },

            {
              title: "Destination details",
            },
          ]}
        />
        <div className="imageContainer">
          <div style={{ flexGrow: 1 }}>
            <Image
              src={destination?.image_url}
              style={{ width: "550px", height: "410px" }}
            ></Image>
          </div>
          <div style={{ flexGrow: 1 }}>
            <List
              grid={{ gutter: 10, column: 2 }}
              dataSource={imagesDes.slice(2, 6)}
              renderItem={(item) => (
                <Image
                  src={item.imageUrl}
                  style={{ width: "315px", height: "205px" }}
                ></Image>
              )}
            ></List>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <p>Entire Home</p>
          <p className="vipText">VIP access</p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Title className="title">{destination?.name}</Title>
            <StarRating rating={destination?.average_rating} />
          </div>
          <div>
            <Text className="sectionTitle">Explore the area</Text>
            <br />
            <Text style={{ fontSize: 20 }}>{destination?.location}</Text>
          </div>
        </div>
        <div className="refundRow">
          <p className="refundText">Fully refundable</p>
          <p className="refundText">Reserve now, pay later</p>
        </div>
        <div>
          <div className="ratingRow">
            <div className="ratingBox">
              <p className="ratingNumber">{destination?.average_rating}</p>
            </div>
            <p className="excellentText">Exceptional</p>
          </div>
        </div>
        <Button type="primary" onClick={showLoading}>
          See all {reviews?.length} reviews
        </Button>
        <Modal
          title={<p>Review {reviews?.length}</p>}
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <div>
            <List
              dataSource={reviews}
              renderItem={(item) => (
                <div style={styles.card}>
                  <h2 style={styles.rating}>{item.rating + 3}/10 Excellent</h2>
                  <p style={styles.date}>{formatDate(item.created_at)}</p>
                  <p style={styles.comment}>
                    <strong>Liked: </strong>
                    {liked}
                  </p>
                  <p style={styles.title}>{item.title}</p>
                  <p style={styles.description}>{item.content}</p>

                  <div style={styles.response}>
                    <h3>
                      Response from {item.username} on{" "}
                      {formatDate(item.created_at)}
                    </h3>
                  </div>
                </div>
              )}
            />
          </div>
        </Modal>
        <div>
          <Title level={4} className="sectionTitle">
            About this property
          </Title>
          <Title level={4} style={{ marginVertical: 10 }}>
            {destination?.description}
          </Title>
        </div>
        <div ref={datePickerRef}>
          <List
            grid={{ gutter: 0, column: 2 }}
            dataSource={amenities}
            renderItem={(item) => (
              <Row gutter={8} align="middle" style={{ marginBottom: 4 }}>
                <Col>
                  <TeamOutlined />
                </Col>
                <Col>
                  <Text style={{ fontSize: 20, color: "#333" }}>
                    {item.amenityName}
                  </Text>
                </Col>
              </Row>
            )}
          ></List>
        </div>

        <Text className="sectionTitle">Choose your room</Text>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="button-container">
            <FaCalendarAlt size={30} color="green" className="icon" />
            <div className="button-text">
              <p>Ngày</p>
              <DatePicker.RangePicker onChange={handleChange} />
            </div>
          </div>
          <div className="button-container">
            <FaUserAlt size={30} color="orange" className="icon" />
            <div
              className="button-text"
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span>Guest: </span>
                <Button
                  onClick={handleRemoveGuest}
                  type="dashed"
                  icon={<MinusOutlined />}
                ></Button>
                <span>{numberGuest}</span>

                <Button
                  onClick={handleAddGuest}
                  type="dashed"
                  icon={<PlusOutlined />}
                ></Button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span>Room: </span>

                <Button
                  onClick={handleRemoveRoom}
                  type="dashed"
                  icon={<MinusOutlined />}
                ></Button>
                <span>{numberRoom}</span>

                <Button
                  onClick={handleAddRoom}
                  type="dashed"
                  icon={<PlusOutlined />}
                ></Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginVertical: 20 }}>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={rooms}
            renderItem={(item) => (
              <div className="room-item-card">
                <Carousel
                  arrows
                  infinite={true}
                  autoplay
                  style={{ width: "100%", marginBottom: "20px" }} // Adjust the width for the carousel
                >
                  {roomImages[item.id]?.map((image, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={`Room image ${index}`}
                        style={{
                          width: "100%", // Ensures the images take full width of the container
                          height: "300px", // Fixed height for all images
                          objectFit: "cover", // Maintains the aspect ratio while covering the area
                          borderRadius: "10px", // Optional: Add rounded corners for aesthetics
                        }}
                      />
                    </div>
                  ))}
                </Carousel>

                <div style={{ height: 60 }}>
                  <Text className="room-title">
                    {item?.room_type + " " + item?.description}
                  </Text>
                </div>

                <div className="feature-row">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="green"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3h7a6 6 0 0 1 0 12h-3v6H6V3zm4 8h3.2a2 2 0 0 0 2-2 2 2 0 0 0-2-2H10v4z"
                    />
                  </svg>
                  <Text className="green-text">Free self parking</Text>
                </div>

                <div className="room-features">
                  <div className="feature-item">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                    >
                      <path
                        fillRule="evenodd"
                        d="m1 9 2 2a12.73 12.73 0 0 1 18 0l2-2A15.57 15.57 0 0 0 1 9zm8 8 3 3 3-3a4.24 4.24 0 0 0-6 0zm-2-2-2-2a9.91 9.91 0 0 1 14 0l-2 2a7.07 7.07 0 0 0-10 0z"
                      />
                    </svg>
                    <Text className="feature-text">{item?.features}</Text>
                  </div>

                  <div className="feature-item">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                    >
                      <path d="M6 18h2l-3 3-3-3h2V6c0-1.1.9-2 2-2h12V2l3 3-3 3V6H6v12zm14-8v2h-2v-2h2zm0 8a2 2 0 0 1-2 2v-2h2zm0-4v2h-2v-2h2zm-4 4v2h-2v-2h2zm-4 0v2h-2v-2h2z"></path>
                    </svg>
                    <Text className="feature-text">{item?.area} sq m</Text>
                  </div>
                </div>

                <div className="room-sleeps-beds">
                  <div className="feature-item">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.99 8A3 3 0 1 1 5 8a3 3 0 0 1 6 0zm8 0A3 3 0 1 1 13 8a3 3 0 0 1 6 0zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm7.03.05c.35-.03.68-.05.97-.05 2.33 0 7 1.17 7 3.5V19h-6v-2.5c0-1.48-.81-2.61-1.97-3.45z"
                      />
                    </svg>
                    <Text className="feature-text">Sleeps {item?.sleeps}</Text>
                  </div>

                  <div className="feature-item">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                    >
                      <path
                        fillRule="evenodd"
                        d="M11 7h8a4 4 0 0 1 4 4v9h-2v-3H3v3H1V5h2v9h8V7zm-1 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                      />
                    </svg>
                    <Text className="feature-text">{item?.beds}</Text>
                  </div>
                </div>

                <div className="policy-section">
                  <Text className="policy-title">Cancellation policy</Text>
                  <div>
                    <Text>More details on all policy options</Text>
                  </div>

                  <Radio.Group
                    onChange={(e) => setChecked(e.target.value)}
                    value={checked}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <Row style={{ marginBottom: 16 }}>
                      <Col span={16}>
                        <Radio value="first">
                          <Text>None-refundable</Text>
                        </Radio>
                      </Col>
                      <Col span={8}>
                        <Text style={{ marginLeft: 40 }}>+ 0đ</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16}>
                        <Radio value="second">
                          <Text style={{ width: 300 }}>
                            Fully refundable before{" "}
                            {formatDateRefund(refundDate)}
                          </Text>
                        </Radio>
                      </Col>
                      <Col span={8}>
                        <Text style={{ marginLeft: 40 }}>
                          {formatCurrency(item.price * 0.15)}
                        </Text>
                      </Col>
                    </Row>
                  </Radio.Group>
                </div>
                <Text className="policy-title">Extras</Text>
                <div className="extras-section">
                  <Radio.Group
                    onChange={(e) => setCheckedExtra(e.target.value)}
                    value={checkedExtra}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    <Row>
                      <Col span={16}>
                        <Radio value="first">Breakfast buffet</Radio>
                      </Col>
                      <Col span={8}>
                        <Text style={{ marginLeft: 40 }}>+ 0đ</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16}>
                        <Radio value="second">Half board</Radio>
                      </Col>
                      <Col span={8}>
                        <Text style={{ marginLeft: 40 }}>
                          {formatCurrency(500000)}
                        </Text>
                      </Col>
                    </Row>
                  </Radio.Group>
                </div>

                <div className="price-section">
                  <Text className="policy-title">Price details</Text>
                  <div className="price-info">
                    <Text className="price-value">
                      {formatCurrency(item?.price)}
                    </Text>
                    {item?.quantity < 1 ? (
                      <Text className="full-room">Full room</Text>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Text className="room-left">
                          {item?.quantity} room left
                        </Text>
                        <Button
                          type="primary"
                          onClick={() =>
                            handleDeserve(destination.destination_id, item?.id)
                          }
                        >
                          Reserve {numberRoom} room
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        </div>

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
                    title={<Text className="card-meta-title">{item.name}</Text>}
                    description={
                      <>
                        <Text className="card-meta-description">
                          {item.description}
                        </Text>
                        <div className="flex-align-center">
                          <Text className="rating">{item.average_rating}</Text>
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
              total={destinations.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  rating: {
    fontSize: "24px",
    color: "#000",
  },
  date: {
    fontSize: "14px",
    color: "#666",
  },
  comment: {
    fontSize: "16px",
    margin: "10px 0",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "16px",
    margin: "10px 0",
  },
  stay: {
    fontSize: "14px",
    color: "#333",
    fontStyle: "italic",
  },
  response: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
  },
};
