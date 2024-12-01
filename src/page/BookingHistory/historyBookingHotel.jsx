import React, { useEffect, useState } from "react";
import { Button, Image, Table, message } from "antd";
import {
  deleteBooking,
  getAllBookingHotel,
  getBookingHotelByUserId,
  handleVNPay,
} from "../../controller/BookingController";
import { useSelector } from "react-redux";
import { getRoomById } from "../../controller/DetailsController";

const BookingHotel = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const user = useSelector((state) => state.user.user);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getBookingHotelByUserId(
        user.id,
        currentPage,
        itemsPerPage
      );
      if (response.code === 200) {
        const bookings = response.result.bookingResponses;

        const bookingsWithRoomDetails = await Promise.all(
          bookings.map(async (booking) => {
            const roomDetails = await fetchRoomById(booking.room_id);

            return {
              ...booking,
              roomDetails,
              key: booking.id,
            };
          })
        );

        setData(bookingsWithRoomDetails);
        setTotalElements(response.result.totalElements);
      } else {
        message.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      message.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };
  const fetchRoomById = async (room_id) => {
    try {
      const response = await getRoomById(room_id);
      return response;
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [currentPage, itemsPerPage]);

  // Theo dõi sự thay đổi của `currentPage` và `itemsPerPage`
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
  const handlePayment = (amout, id) => {
    handleVNPay(amout, "NCB", id);
  };
  const columns = [
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text) => <p>{text} per</p>,
    },
    {
      title: "Price",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (text) => formatCurrency(text),
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Room Image",
      dataIndex: ["roomDetails", "image"],
      key: "room_image",
      render: (text, record) => (
        <Image
          src={record.roomDetails.image_url}
          alt="Room"
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
      ),
    },
    {
      title: "Check-in",
      dataIndex: "check_in_date",
      key: "check_in_date",
      render: (text) => formatDate(text),
    },
    {
      title: "Check-out",
      dataIndex: "check_out_date",
      key: "check_out_date",
      render: (text) => formatDate(text),
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (text, record) => {
        let color;
        if (record.payment_status === "PENDING") {
          color = "orange";
        } else if (record.payment_status === "PAID") {
          color = "green";
        } else {
          color = "black"; // Default color for other statuses
        }
        return (
          <Button disabled style={{ color }}>
            {record.payment_status}
          </Button>
        );
      },
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (text) => {
        if (text === "payAtProperty") {
          return "Pay At Property";
        }
        return text;
      },
    },
    {
      title: "Payment Date",
      dataIndex: "payment_date",
      key: "payment_date",
      render: (text, record) => {
        if (text === null && record.payment_method === "VNPAY") {
          return (
            <Button
              type="primary"
              onClick={() => handlePayment(record.amount, record.id)}
            >
              Pay Now
            </Button>
          );
        }
        return formatDate(text);
      },
    },
    { title: "Full Name", dataIndex: "full_name" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) =>
        record.booking_status !== "CANCELLED" ? (
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            color="danger"
            variant="solid"
            onClick={() => handleDelete(record.key)}
          >
            Cancel
          </Button>
        ) : null,
    },
  ];
  const handleDelete = async (key) => {
    // Handle delete action
    try {
      console.log("key:", key);

      let res = await deleteBooking(key);
      console.log(res);

      if (res.code === 200) {
        message.success("Delete success");
        getData();
      } else {
        message.error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      message.error("Failed to delete");
    }
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalElements,
          showSizeChanger: true, // Cho phép thay đổi số lượng mục trên mỗi trang
          pageSizeOptions: ["5", "10", "20", "50"], // Các tùy chọn số lượng mục
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setItemsPerPage(pageSize);
          },
        }}
      />
    </>
  );
};

export default BookingHotel;
