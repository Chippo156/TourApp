/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Carousel,
  Col,
  Image,
  Input,
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
export default function Deserve() {
  const { Title, Text } = Typography;

  const currentDate = new Date();
  const refundDate = new Date(currentDate);
  refundDate.setDate(currentDate.getDate() + 7);
  const formatDate = (date) => {
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

  const des_id = 1;
  const [destination, setDestinations] = useState({});
  const [imagesDes, setImagesDes] = useState([]);
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
      let res = await getRoomById(1);
      setRoom(res);
      console.log(res);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);
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
  useEffect(() => {
    fetchImagesDestination();
  }, [destination]);
  // const [selectedOptions, setSelectedOptions] = useState({
  //   payAtProperty: false,
  //   VNPAY: false,
  // });
  // const handleToggle = (option) => {
  //   setSelectedOptions((prev) => ({
  //     ...prev,
  //     [option]: !prev[option],
  //   }));
  // };
  const [selectedOption, setSelectedOption] = useState("");

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setSelectedOption(e.target.value);
  };
  return (
    <div className="container">
      <div className="main-container">
        <div style={{ flex: 2 }}>
          {/* <Icon name="calendar" size={50} color="#FFD700"></Icon> */}
          <Title level={3}>Booking details</Title>
          <div className="">
            <Text style={{ fontSize: 14, width: 340 }}>
              <Text style={{ fontWeight: "bold" }}>
                Full refund before 6:00 p.m., {formatDate(refundDate)} (local
                time of property).
              </Text>
              You can change or cancel any of these reservations to receive the
              full refund if plans change. Because of duplication, flexibility
              is needed.
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
                <Text style={{ fontSize: 16 }}>{destination.description}</Text>
                {/* <Text style={{ color: "#000" }}>
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    Check in:
                  </Text>{" "}
                  {checkInDate.toLocaleDateString()}
                </Text>
                <Text style={{ color: "#000" }}>
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    Check out:
                  </Text>{" "}
                  {checkOutDate.toLocaleDateString()}
                </Text> */}
              </div>
              <div
                style={{
                  backgroundColor: "#",

                  borderWidth: 1,
                  borderRadius: 5,
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "green" }}>
                  Great choice! Hurry and book now before the room runs out!
                </Text>
              </div>
              <Title level={4}>Confirm Information(*)</Title>
              <div>
                <form>
                  <Row
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Col span={4}>
                      <label htmlFor="name">Full name:</label>
                    </Col>
                    <Col span={20}>
                      <Input placeholder="FullName: " />
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
                      <Input placeholder="Email: " />
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
                      <Input placeholder="Phone: " />
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </div>
          <div
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginTop: "20px",
              padding: "10px",
              gap: "20px",
              borderColor: "#000",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>
              Who&apos;s checking in?
            </h2>
            <div>
              <p style={{ color: "#000" }}>
                <span style={{ fontWeight: "bold" }}>10 Room: </span>
                10 Guest, {room.beds}, no smokers, no pets
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
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

            {/* {user?.id ? (
              <div style={{ gap: "20px", marginTop: "20px" }}>
                <div>
                  <p style={{ color: "#fff" }}>Email:</p>
                  <p style={{ color: "#fff", fontWeight: "bold" }}>
                    {user.email}
                  </p>
                </div>
                <div>
                  <p style={{ color: "#fff" }}>Phone number:</p>
                  <p style={{ color: "#fff", fontWeight: "bold" }}>
                    {user.phone}
                  </p>
                </div>
              </div>
            ) : (
              <div></div>
            )} */}
          </div>

          <div
            style={{
              border: "1px solid #000",
              borderRadius: 5,
              marginTop: 20,
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
                {formatDate(refundDate)} or no-shows will be charged a property
                fee equal to 100% of the total price paid for the reservation.
              </Text>
            </div>
          </div>
        </div>
        <div
          style={{
            borderColor: "#f5f5f5",

            borderRadius: 5,
            marginTop: 20,
            padding: 12,
            gap: 20,
            flex: 1,
          }}
        >
          <Text style={{ color: "#000", fontWeight: "bold", fontSize: 20 }}>
            Room details
          </Text>
          <div style={{ flexDirection: "row", gap: 20 }}>
            <Image
              src={room.image_url}
              style={{ width: 400, height: 200, borderRadius: 20 }}
            />
            <div style={{ gap: 10, flexDirection: "column", display: "flex" }}>
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
              <Text style={{ color: "#000", width: 200 }}>{room.beds}</Text>
              <Text style={{ color: "#000" }}>{room.features}</Text>
              <Text style={{ color: "#000" }}>{room.area} sq m</Text>
              <Text style={{ color: "#000" }}>
                Each room has {room.sleeps} guests
              </Text>
            </div>
          </div>
          <div
            style={{
              border: "1px solid #000",
              borderRadius: "5px",
              marginTop: "20px",
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
          <div
            style={{
              border: "1px solid #000",
              borderRadius: "5px",
              marginTop: "20px",
              padding: "10px",
              gap: "20px",
              backgroundColor: "#fff",
              color: "#000",
            }}
          >
            <h2 className="price-details-title">Price details</h2>
            <div className="price-details-container">
              <p className="price-detail">
                <span className="price-label">Room price: </span>
                {formatCurrency(room.price)}
              </p>
              <p className="price-detail">
                <span className="price-label">Total: </span>
                {formatCurrency(room.price)}
              </p>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="primary" block>
              Book now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
