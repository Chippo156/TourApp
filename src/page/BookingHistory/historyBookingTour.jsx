import React, { useEffect, useState } from "react";
import { Button, Image, Table, message } from "antd";
import {
  deleteBookingTour,
  getAllBookingTour,
  getBookingTourByUserId,
  handleVNPay,
} from "../../controller/BookingController";
import { useSelector } from "react-redux";
import { getTourById } from "../../controller/tourDetailsController";
import { useLocation } from "react-router-dom";

const Bookingtour = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const paymentStatus = query.get("paymentStatus");

  useEffect(() => {
    if (paymentStatus === "00") {
      message.success("Successful payment");
    } else if (paymentStatus === "01") {
      message.error("Payment failed");
    }
    paymentStatus && window.history.replaceState(null, "", location.pathname);
  }, [paymentStatus]);

  const fetchTourById = async (tour_id) => {
    try {
      const response = await getTourById(tour_id);
      return response.result;
    } catch (error) {
      console.error("Error fetching tour:", error);
    }
  };
  const getData = async () => {
    setLoading(true);
    try {
      const response = await getBookingTourByUserId(
        user.id,
        currentPage,
        itemsPerPage
      );
      console.log("response:", response);
      if (response.code === 200) {
        const bookings = response.result.bookingResponses;

        const bookingsWithTourDetails = await Promise.all(
          bookings.map(async (booking) => {
            const tourDetails = await fetchTourById(booking.tour_id);
            return {
              ...booking,
              tourDetails,
              key: booking.id,
            };
          })
        );
        setData(bookingsWithTourDetails);
        console.log("bookingsWithTourDetails:", bookingsWithTourDetails);

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

  useEffect(() => {
    getData();
  }, [currentPage, itemsPerPage]); // Theo dõi thay đổi của `currentPage` và `itemsPerPage`
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
  const handlePayment = (amount, id) => {
    handleVNPay(amount, "NCB", id);
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
    { title: "Phone", dataIndex: "email" },
    { title: "Email", dataIndex: "phone" },
    {
      title: "Tour Image",
      dataIndex: ["tourDetails", "image"],
      key: "tour_image",
      render: (text, record) => (
        <Image
          src={record.tourDetails.image_url}
          alt="Tour"
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
      title: "Booking Status",
      dataIndex: "booking_status",
      key: "booking_status",
      render: (text, record) => {
        let color;
        if (record.booking_status === "CANCELLED") {
          color = "red";
        } else if (record.booking_status === "BOOKED") {
          color = "green";
        } else {
          color = "black"; // Default color for other statuses
        }
        return (
          <Button disabled style={{ color, width: 100 }}>
            {record.booking_status}
          </Button>
        );
      },
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
        if (text === null) {
          return "Not yet paid";
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
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const handleDelete = async (key) => {
    // Handle delete action
    try {
      console.log("key:", key);

      let res = await deleteBookingTour(key);
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalElements,
          showSizeChanger: true, // Cho phép thay đổi số mục mỗi trang
          pageSizeOptions: ["5", "10", "20", "50"], // Các tùy chọn số mục
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setItemsPerPage(pageSize);
          },
        }}
      />
    </>
  );
};

export default Bookingtour;
