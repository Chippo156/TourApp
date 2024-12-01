/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Breadcrumb,
  Button,
  Carousel,
  Col,
  Form,
  Image,
  Input,
  message,
  notification,
  Radio,
  Row,
  Typography,
} from "antd";
import "./deserve.scss";
import {
  getDestinationById,
  getImagesDestination,
  getRoomById,
} from "../../controller/DetailsController";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking, handleVNPay } from "../../controller/BookingController";
import { useSelector } from "react-redux";
export default function Deserve() {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    desId,
    roomId,
    startDate,
    endDate,
    numberGuest,
    numberRoom,
    refund,
    extra,
  } = location.state || {};
  const [refundCost, setRefundCost] = useState(0);
  const [extraCost, setExtraCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingResponse, setBookingResponse] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [alertt, setAlertt] = useState({
    visible: false,
    message: "",
    description: "",
  });
  const currentDate = new Date();
  const refundDate = new Date(currentDate);
  refundDate.setDate(currentDate.getDate() + 7);
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
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const [destination, setDestinations] = useState({});
  const [imagesDes, setImagesDes] = useState([]);
  const getDestinationDetails = async () => {
    if (desId) {
      let res = await getDestinationById(desId);
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
  useEffect(() => {
    getDestinationDetails();
  }, []);
  const [room, setRoom] = useState({});
  const fetchRoom = async () => {
    try {
      let res = await getRoomById(roomId);
      setRoom(res);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const checkInDate = new Date(startDate);
  const checkOutDate = new Date(endDate);
  const timeDiff = checkOutDate - checkInDate; // Milliseconds
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  useEffect(() => {
    setRefundCost(refund === "first" ? 0 : room.price * 0.15);
    setExtraCost(extra === "first" ? 0 : 500000);
    setTotal(room.price * dayDiff * numberRoom + extraCost + refundCost);
  }, [room]);
  const fetchImagesDestination = async () => {
    if (destination && destination.destination_id) {
      let res = await getImagesDestination(destination.destination_id);
      setImagesDes(res);
    } else {
      let res = await getImagesDestination(1);
      setImagesDes(res);
    }
  };
  useEffect(() => {
    fetchImagesDestination();
  }, [destination]);

  const [selectedOption, setSelectedOption] = useState("payAtProperty");

  const onChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const onChangeFullName = (e) => {
    setFullName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleBookNow = async () => {
    try {
      if (!phone) {
        window.scrollTo(0, 0);
        setAlertt({
          visible: true,
          message: "Please enter phone number confirm",
        });
        return;
      }
      const amount = total * 1.1 + refundCost + extraCost;
      let res = await createBooking(
        1,
        desId,
        roomId,
        "pending",
        selectedOption,
        startDate,
        endDate,
        amount,
        numberRoom,
        fullName,
        email,
        phone
      );
      if (res.code === 200) {
        setBookingResponse(res);
      } else if (res.code === 1007) {
        window.scrollTo(0, 0);
        setAlertt({
          visible: true,
          message: "Admin not booking",
          description: "Please login with your account user to book",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (bookingResponse) {
      if (bookingResponse.code === 200) {
        if (selectedOption === "VNPAY") {
          handleVNPay(bookingResponse.amount, "NCB", bookingResponse.result.id);
        } else {
          alert("Booking success");
          navigate("/");
        }
      }
    }
  }, [bookingResponse, selectedOption, navigate]);

  return (
    <div className="container-deserve">
      <div className="main-container">
        <div style={{ margin: "20px 0px" }}>
          {alertt.visible && (
            <Alert
              message={alertt.message}
              description={alertt.description}
              type="error"
              closable
              onClose={() => setAlert({ ...alertt, visible: false })}
            />
          )}
          {/* Your other component content */}
        </div>
        <Breadcrumb
          items={[
            {
              title: <a href="/">Home</a>,
            },
            {
              title: <a href={`/destination/${desId}`}>Destination details</a>,
            },

            {
              title: "Booking",
            },
          ]}
        />
        <div
          style={{
            display: "flex",
            gap: 5,
          }}
        >
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* <Icon name="calendar" size={50} color="#FFD700"></Icon> */}
            <Title level={3}>Booking details</Title>
            <div className="">
              <Text style={{ fontSize: 14, width: 340 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Full refund before 6:00 p.m., {formatDate(refundDate)} (local
                  time of property).
                </Text>
                You can change or cancel any of these reservations to receive
                the full refund if plans change. Because of duplication,
                flexibility is needed.
              </Text>
            </div>
            <div
              style={{
                marginVertical: 10,
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                style={{
                  width: 800,
                }}
              >
                <Carousel
                  arrows
                  infinite={true}
                  style={{ width: "100%", marginBottom: "20px", height: 300 }} // Adjust the width for the carousel
                >
                  {imagesDes.map((image, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={`Room image ${index}`}
                        style={{
                          width: "800px", // Ensures the images take full width of the container
                          height: "300px", // Fixed height for all images
                          objectFit: "cover", // Maintains the aspect ratio while covering the area
                          borderRadius: "10px", // Optional: Add rounded corners for aesthetics
                        }}
                      />
                    </div>
                  ))}
                </Carousel>{" "}
              </div>
              <div style={{ padding: 10 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    borderBottomWidth: 1,
                    marginBottom: 10,
                  }}
                >
                  {destination.name}
                </Text>
                <div style={{ gap: 10 }}>
                  <Text style={{ fontSize: 16 }}>
                    {destination.description}
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 15,
                    }}
                  >
                    <Text style={{ color: "#000" }}>
                      <Text style={{ fontWeight: "bold", color: "#000" }}>
                        Check in:
                      </Text>{" "}
                      {formatDate(startDate)}
                    </Text>
                    <Text style={{ color: "#000" }}>
                      <Text style={{ fontWeight: "bold", color: "#000" }}>
                        Check out:
                      </Text>{" "}
                      {formatDate(endDate)}
                    </Text>
                  </div>
                </div>
                <div
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "green" }}>
                    Great choice! Hurry and book now before the room runs out!
                  </Text>
                </div>
                <Title style={{ margin: "10px 0px" }} level={4}>
                  Confirm Information(optional)
                </Title>
                <div>
                  <Row
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Col span={4}>
                      <label htmlFor="name">Full name:</label>
                    </Col>
                    <Col span={20}>
                      <Input
                        placeholder="FullName: "
                        onChange={onChangeFullName}
                      />
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Col span={4}>
                      <label htmlFor="name">Email:</label>
                    </Col>
                    <Col span={20}>
                      <Input placeholder="Email: " onChange={onChangeEmail} />
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Col span={4}>
                      <label htmlFor="name">Phone:</label>
                    </Col>
                    <Col span={20}>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone number!",
                          },
                        ]}
                      >
                        <Input placeholder="Phone: " onChange={onChangePhone} />
                        <span style={{ color: "red" }}>*</span>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",

                padding: "10px",
                gap: "20px",
                borderColor: "#000",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}
              >
                Who&apos;s checking in?
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: 15,

                  flexDirection: "column",
                }}
              >
                <p style={{ color: "#000" }}>
                  <span style={{ fontWeight: "bold" }}>
                    {numberRoom} Room:{" "}
                  </span>
                  <span style={{ fontWeight: "bold" }}>{numberGuest} </span>
                  Guest, {room.beds}, no smokers, no pets
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Fullname: </span>
                  {user.first_name} {user.last_name}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Email: </span>
                  {user.email}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Phone: </span>
                  {user.phone}
                </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="green"
                    clipRule="evenodd"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3h7a6 6 0 0 1 0 12h-3v6H6V3zm4 8h3.2a2 2 0 0 0 2-2 2 2 0 0 0-2-2H10v4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span style={{ color: "green" }}>Free parking</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="green"
                    clipRule="evenodd"
                  >
                    <path
                      fillRule="evenodd"
                      d="m1 9 2 2a12.73 12.73 0 0 1 18 0l2-2A15.57 15.57 0 0 0 1 9zm8 8 3 3 3-3a4.24 4.24 0 0 0-6 0zm-2-2-2-2a9.91 9.91 0 0 1 14 0l-2 2a7.07 7.07 0 0 0-10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span style={{ color: "green" }}>Free Wifi</span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              borderColor: "#f5f5f5",
              borderRadius: 5,
              padding: 12,
              gap: 20,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 20 }}>
              Room details
            </Text>
            <div
              style={{
                flexDirection: "row",
                gap: 20,

                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
              }}
            >
              <Image
                src={room.image_url}
                style={{ width: 400, height: 200, borderRadius: 5 }}
              />
              <div
                style={{
                  gap: 10,
                  flexDirection: "column",
                  display: "flex",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "bold",
                    width: 200,
                  }}
                >
                  {room.room_type} {room.description}
                </Text>
                <Text style={{ color: "#000", width: 200 }}>
                  Beds: {room.beds}
                </Text>
                <Text style={{ color: "#000" }}>Feature: {room.features}</Text>
                <Text style={{ color: "#000" }}>Area: {room.area} sq m</Text>
                <Text style={{ color: "#000" }}>
                  Each room has {room.sleeps} guests
                </Text>
              </div>
            </div>
            <div
              style={{
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                padding: 10,
                gap: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#000", fontSize: 20 }}>
                Policy Cancel
              </Text>
              <div>
                <Text style={{ color: "green", display: "block" }}>
                  Full refund in advance {formatDate(refundDate)}
                </Text>
                <Text style={{ color: "#000" }}>
                  Changes or cancellations made after 6:00 PM (local time) on{" "}
                  {formatDate(refundDate)} or no-shows will be charged a
                  property fee equal to 100% of the total price paid for the
                  reservation.
                </Text>
              </div>
            </div>
            <div
              style={{
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                padding: "10px",
                gap: "20px",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Payment method
              </Text>
              <Radio.Group
                onChange={onChange}
                value={selectedOption}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Radio style={{ textAlign: "left" }} value={"payAtProperty"}>
                  <span style={{ fontWeight: "bold" }}> Pay At Property</span> (
                  Your credit card is required to secure your booking. You will
                  pay for your stay at the property)
                </Radio>

                <Radio value={"VNPAY"}>
                  <span style={{ fontWeight: "bold" }}>VNPAY</span> ( Pay with
                  VNPAY)
                </Radio>
              </Radio.Group>
            </div>

            <div
              style={{
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                padding: "10px",
                gap: "20px",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              <h2 className="price-details-title">Price details</h2>
              <div className="price-details-container">
                <p className="price-detail">
                  Room price:
                  <span className="price-label">
                    {" "}
                    {formatCurrency(room.price)}
                  </span>
                </p>
                <p>
                  <p className="price-detail">
                    Quantity:
                    <span className="price-label">
                      {" "}
                      {numberRoom} Room, {numberGuest} Guest
                    </span>
                  </p>
                  <Title level={5}></Title>
                </p>

                <p className="price-detail">
                  Refund:
                  <span className="price-label">
                    {formatCurrency(refundCost)}{" "}
                  </span>
                </p>
                <p className="price-detail">
                  Extra:
                  <span className="price-label">
                    {" "}
                    {formatCurrency(extraCost)}
                  </span>
                </p>
                <p className="price-detail">
                  Total:
                  <span className="price-label"> {formatCurrency(total)}</span>
                </p>
              </div>
            </div>
            {user.role_id ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                    height: 50,
                    color: "#fff",

                    fontWeight: "bold",
                  }}
                  block
                  onClick={handleBookNow}
                >
                  BOOK NOW
                </Button>
              </div>
            ) : (
              <Button
                type="primary"
                style={{
                  width: "100%",
                  height: 50,
                  color: "#fff",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",

                  fontWeight: "bold",
                }}
                block
                onClick={() => navigate("/login")}
              >
                Login to book
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
