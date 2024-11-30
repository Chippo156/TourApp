import { Link, useLocation } from "react-router-dom";
import "./deserve.scss";
import {
  Breadcrumb,
  Button,
  Carousel,
  Col,
  Image,
  Radio,
  Row,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
export default function TourBooking() {
  const location = useLocation();
  const { Title, Text } = Typography;
  const [total, setTotal] = useState(0);

  const { tour, name, email, phone, departure, departureDate, people } =
    location.state || {};
  const [selectedOption, setSelectedOption] = useState("payAtProperty");

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
  return (
    <div className="container-deserve">
      <div className="main-container">
        <Breadcrumb
          items={[
            {
              title: <a href="/">Home</a>,
            },
            {
              //   title: <a href={`/destination/${desId}`}>Destination details</a>,
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
                border: "1px solid #000",
                borderRadius: 5,
              }}
            >
              <div style={{ width: 800 }}>
                {/* <Carousel
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
                </Carousel>{" "} */}
              </div>

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
                border: "1px solid #000",
                borderRadius: 5,
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
                border: "1px solid #000",
                borderRadius: "5px",
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

                border: "1px solid #000",
                borderRadius: 5,
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
              </div>
            </div>

            <div
              style={{
                border: "1px solid #000",
                borderRadius: "5px",
                padding: "10px",
                gap: "20px",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              <h2 className="price-details-title">Price details</h2>
              <div className="price-details-container">
                <p className="price-detail">
                  <span className="price-label">Tour price: </span>
                  {formatCurrency(tour.price)}
                </p>
                <p className="price-detail">
                  <span className="price-label">Quantity: </span>
                  {people} people
                </p>
                <p className="price-detail">
                  <span className="price-label">Total: </span>
                  {formatCurrency(total)}
                </p>
              </div>
            </div>
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
                  borderColor: "#000",
                  fontWeight: "bold",
                }}
                block
                // onClick={handleBookNow}
              >
                Book now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
