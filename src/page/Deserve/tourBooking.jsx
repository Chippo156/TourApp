import { useLocation, useNavigate } from "react-router-dom";
import "./deserve.scss";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Image,
  Radio,
  Row,
  Typography,
} from "antd";
import { StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  createBooking,
  createBookingTour,
  handleVNPay,
} from "../../controller/BookingController";
import { useSelector } from "react-redux";
export default function TourBooking() {
  const location = useLocation();
  const { Title, Text } = Typography;
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { tour, name, email, phone, departure, departureDate, people } =
    location.state || {};
  const [selectedOption, setSelectedOption] = useState("payAtProperty");
  const [bookingResponse, setBookingResponse] = useState(null);
  const user = useSelector((state) => state.user.user);

  const [alert, setAlert] = useState({
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
  useEffect(() => {
    setTotal(tour.price * people);
  }, [tour]);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setSelectedOption(e.target.value);
  };
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
  const handleDepartureDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  // Example usage

  const handleBookNow = async () => {
    try {
      if (!phone) {
        alert("Please fill in the phone number");
        return;
      }
      const amount = total;
      let res = await createBookingTour(
        user.id,
        "pending",
        selectedOption,
        convertDateFormat(departureDate),
        amount,
        people,
        name,
        email,
        phone,
        tour.id
      );
      if (res.code === 200) {
        setBookingResponse(res);
      } else if (res.code === 1007) {
        setAlert({
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
          handleVNPay(
            bookingResponse.result.amount,
            "NCB",
            bookingResponse.result.id
          );
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
          {alert.visible && (
            <Alert
              message={alert.message}
              description={alert.description}
              type="error"
              closable
              onClose={() => setAlert({ ...alert, visible: false })}
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
              title: <a href={`/tour-details/${tour.id}`}>Tour details</a>,
            },

            {
              title: "Booking",
            },
          ]}
        />
        <div style={{ display: "flex", gap: 5 }}>
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: 10,
              }}
            >
              <div style={{ width: 800 }}></div>

              <div style={{ padding: 10 }}>
                <Title style={{ margin: "10px 0px" }} level={4}>
                  Confirm Information
                </Title>
                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={4}>
                    <label htmlFor="name">Full name:</label>
                  </Col>
                  <Col span={20}>{name}</Col>
                </Row>
                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={4}>
                    <label htmlFor="name">Email:</label>
                  </Col>
                  <Col span={20}>{email}</Col>
                </Row>
                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={4}>
                    <label htmlFor="name">Phone:</label>
                  </Col>
                  <Col span={20}>{phone}</Col>
                </Row>
                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={4}>
                    <label htmlFor="name">People:</label>
                  </Col>
                  <Col span={20}>{people}</Col>
                </Row>
                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={4}>
                    <label htmlFor="name">Departure:</label>
                  </Col>
                  <Col span={20}>{departure}</Col>
                </Row>
                <Row
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Col span={4}>
                    <label htmlFor="name">Departure date:</label>
                  </Col>
                  <Col span={20}>{departureDate}</Col>
                </Row>
              </div>
            </div>
            <div
              style={{
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: 10,
                padding: 10,
                gap: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#000" }}>
                Policy Cancel
              </Text>
              <div>
                <Text style={{ color: "green" }}>
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
              <h2 style={{ fontWeight: "bold" }}>Payment method</h2>
              <Radio.Group
                onChange={onChange}
                value={selectedOption}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Radio value={"payAtProperty"}>
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
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 20 }}>
              Tour details
            </Text>
            <div
              style={{
                flexDirection: "row",
                gap: 20,

                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: 10,
              }}
            >
              <Image
                src={tour.image_url}
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
                    width: 300,
                  }}
                >
                  {tour.name}
                </Text>
                <Text style={{ color: "#000", width: 200 }}>
                  Duration: {tour.duration}
                </Text>
                <Text style={{ color: "#000" }}>
                  Departure: {tour.departure}
                </Text>
                <StarRating rating={tour.rating} />
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
              <h2 className="price-details-title">Price details</h2>
              <div className="price-details-container">
                <p className="price-detail">
                  Tour price:
                  <span className="price-label">
                    {formatCurrency(tour.price)}{" "}
                  </span>
                </p>
                <p className="price-detail">
                  Quantity:
                  <span className="price-label"> {people} people </span>
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
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",

                    fontWeight: "bold",
                  }}
                  block
                  onClick={handleBookNow}
                >
                  Book now
                </Button>
              </div>
            ) : (
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
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",

                    fontWeight: "bold",
                  }}
                  block
                  onClick={() => navigate("/login")}
                >
                  Login to book
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
