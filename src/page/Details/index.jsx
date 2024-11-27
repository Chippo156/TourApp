/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  getAmenities,
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
  Space,
  Row,
  Col,
  Image,
  Carousel,
  Radio,
} from "antd";
import "./details.scss";
import { Route, useNavigation } from "react-router-dom";
import { IconBase } from "react-icons";
import { StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";

export default function TravelDetail() {
  const des_id = 1;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [destination, setDestinations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [checked, setChecked] = useState("first"); // State for radio button
  const [checkedExtra, setCheckedExtra] = useState("first"); // State for radio button
  const [modalVisibleReview, setModalVisibleReview] = useState(false);

  const [imagesDes, setImagesDes] = useState([]);
  const [roomImages, setRoomImages] = useState({});
  const [destinations, setListDestination] = useState([]);
  const [selectDay, setSelectDay] = useState(true);
  const [selectedSecondLastDay, setSelectedSecondLastDay] = useState("");
  const [selectedLastDayOfMonth, setSelectedLastDayOfMonth] = useState("");
  const [visibleDate, setVisibleDate] = useState(false); // Overlay cho ngày

  const [visibleGuest, setVisibleGuest] = useState(false); // Overlay cho khách
  const [numberGuest, setNumberGuest] = useState(1);
  const [numberRoom, setNumbeRoom] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const currentDate = new Date();
  const refundDate = new Date(currentDate);
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

  const fetchListDestination = async () => {
    try {
      let res = await handleGetDestination();
      setListDestination(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImagesDestination = async () => {
    // if (route.params && route.params.id) {
    //   let res = await getImagesDestination(route.params.id);
    //   setImagesDes(res);
    // } else {
    //   let res = await getImagesDestination(1);
    //   setImagesDes(res);
    // }

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
    console.log(res);

    setRoomImages((prev) => ({ ...prev, [id]: res })); // Lưu ảnh với ID tương ứng
  };
  const getDestinationDetails = async () => {
    // if (route.params && route.params.id) {
    //   let res = await getDestinationById(route.params.id);
    //   if (res.code === 200) {
    //     setDestinations(res.result);
    //     setLoading(false);
    //   }
    // } else {
    //   let res = await getDestinationById(1);
    //   if (res.code === 200) {
    //     setDestinations(res.result);
    //   }
    // }
    if (des_id) {
      let res = await getDestinationById(des_id);
      if (res.code === 200) {
        setDestinations(res.result);
        setLoading(false);
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
      console.log(res);
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
    // fetchListDestination();
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

  const toggleGuestOverlay = () => setVisibleGuest(!visibleGuest);
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
  const toggleDateOverlay = () => setVisibleDate(!visibleDate);
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const getMonthDay = (date) => {
    const day = date.split("-")[2];
    const month = date.split("-")[1];
    return `${day}/${month}`;
  };
  // Hàm lấy ngày thứ
  const getDayOfWeek = (date) => {
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai ",
      "Thứ Ba  ",
      "Thứ Tư  ",
      "Thứ Năm ",
      "Thứ Sáu ",
      "Thứ Bảy ",
    ];
    return daysOfWeek[date.getDay()];
  };

  // Hàm lấy 2 ngày cuối tháng
  const getLastTwoDaysOfMonth = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ); // Ngày cuối tháng
    const secondLastDay = new Date(lastDayOfMonth);
    secondLastDay.setDate(lastDayOfMonth.getDate() - 1); // Ngày trước đó một ngày

    setSelectedSecondLastDay(formatDate(secondLastDay)); // Thiết lập ngày đã chọn ban đầu
    setSelectedLastDayOfMonth(formatDate(lastDayOfMonth)); // Thiết lập ngày đã chọn ban đầu
  };

  useEffect(() => {
    getLastTwoDaysOfMonth();
  }, []);

  const handleNavigate = (id) => {
    navigation.push("TravelDetail", { id });
  };
  const handleDeserve = (desid, roomid) => {
    navigation.navigate("Deserve", {
      desId: desid,
      roomId: roomid,
      startDate: selectedSecondLastDay,
      endDate: selectedLastDayOfMonth,
      numberGuest: numberGuest,
      numberRoom: numberRoom,
      refund: checked,
      extra: checkedExtra,
    });
  };

  const fetchFilterRoom = async () => {
    try {
      let res = await getFilterRoom(
        numberGuest,
        selectedSecondLastDay,
        selectedLastDayOfMonth,
        numberRoom,
        destination.destination_id
      );
      setRooms(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddReview = async (review) => {
    setReviews([...reviews, review]);
    try {
      let res = await createReview(
        review.title,
        review.content,
        review.rating,
        destination.destination_id,
        1
      );
      if (res.code === 200) {
        setModalVisibleReview(false);
      } else {
        Alert.alert("Error", "Create review failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilterRoom();
  }, [numberGuest, numberRoom, selectedSecondLastDay, selectedLastDayOfMonth]);

  const { Text, Title } = Typography;

  const renderItem = (item, handleNavigate) => {
    return (
      <Card
        hoverable
        style={{ margin: 8, borderRadius: 8 }}
        onClick={() => handleNavigate(item.destination_id)}
        cover={
          <AntImage
            src={item.image_url}
            alt={item.name}
            style={{ borderRadius: 8, objectFit: "cover", height: 135 }}
            preview={false}
          />
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title
            level={4}
            style={{ margin: 0, fontWeight: "bold", lineHeight: "1.5" }}
          >
            {item.name}
          </Title>
          <Text ellipsis={{ rows: 2 }} style={{ fontSize: 16 }}>
            {item.description}
          </Text>
          <List
            dataSource={item.amenities.slice(0, 4)}
            renderItem={(amenity) => (
              <Row gutter={8} align="middle" style={{ marginBottom: 4 }}>
                <Col>
                  <IconBase
                    component={amenity.amenityIcon}
                    style={{ fontSize: 24, color: "#333" }}
                  />
                </Col>
                <Col>
                  <Text>{amenity.amenityName}</Text>
                </Col>
              </Row>
            )}
          />
        </Space>
      </Card>
    );
  };
  return (
    <div className="container">
      <div className="container-main">
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
        <div
          onClick={() => setModalVisible(true)}
          className={{ cursor: "pointer" }}
        >
          <p className="reviewsText">See all {reviews?.length} reviews</p>
        </div>
        <div>
          <Title level={4} className="sectionTitle">
            About this property
          </Title>
          <Title level={4} style={{ marginVertical: 10 }}>
            {destination?.description}
          </Title>
        </div>
        <div>
          <List
            grid={{ gutter: 10, column: 2 }}
            dataSource={amenities}
            renderItem={(item) => (
              <Row gutter={8} align="middle" style={{ marginBottom: 4 }}>
                {/* <Col>
                  <IconBase
                    component={item.amenityIcon}
                    style={{ fontSize: 24, color: "#333" }}
                  />
                </Col> */}
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

                <Text className="room-title">
                  {item?.room_type + " " + item?.description}
                </Text>

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
                    style={{ width: "100%" }}
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
                        <button
                          onClick={() =>
                            handleDeserve(destination.destination_id, item?.id)
                          }
                          className="reserve-button"
                        >
                          Reserve {numberRoom} room
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
