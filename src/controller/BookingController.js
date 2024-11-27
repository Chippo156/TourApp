import axios from "../until/customize-axios";
import { useDispatch, useSelector } from "react-redux";
import { loadingTrue, loadingFalse } from "../Redux/userSlice";
import { Linking } from "react-native";
import { Alert } from "react-native";

export let createBooking = async (
  user_id,
  destination_id,
  room_id,
  payment_status,
  payment_method,
  check_in_date,
  check_out_date,
  amount,
  quantity
) => {
  try {
    const response = await axios.post("/bookings", {
      user_id,
      destination_id,
      room_id,
      payment_status,
      payment_method,
      check_in_date,
      check_out_date,
      amount,
      quantity,
    });
    return response;

    // } else if (payment_method === "VNPAY") {
    //   Alert.alert("Confirmation", "You definitely pay via card?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => alert("You cancel payment"),
    //       style: "cancel",
    //     },
    //     {
    //       text: "OK",
    //       onPress: async () => {
    //         try {
    //           const response = await axios.post("/bookings", {
    //             user_id,
    //             destination_id,
    //             room_id,
    //             payment_status,
    //             payment_method,
    //             check_in_date,
    //             check_out_date,
    //             amount,
    //             quantity,
    //           });
    //           if (response.data && response.data.result) {
    //             handleVNPay(amount, "NCB", response.data.result.id);
    //             return response;
    //           } else {
    //             alert("Error: No result in response");
    //           }
    //         } catch (error) {
    //           console.error("Error making the booking:", error);
    //           alert("An error occurred while processing your payment.");
    //         }
    //       },
    //     },
    //   ]);
    // }
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let handleVNPay = async (amount, bankCode, orderId) => {
  try {
    const response = await axios.get(
      `/payment/vn-pay?amount=${amount}&bankCode=${bankCode}&orderId=${orderId}`
    );
    const paymentData = response.data;
    if (paymentData?.code === "ok") {
      Linking.openURL(paymentData.paymentUrl).catch((err) =>
        console.error("An error occurred while opening the URL", err)
      );
    }

    return "success";
  } catch (error) {
    console.error("Error creating payment: ", error);
    alert(`Error creating payment ${error}`);
  }
};
export let getListBookingById = async (id) => {
  try {
    const response = await axios.get(`/bookings/user/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let getDesitnationById = async (id) => {
  try {
    const response = await axios.get(`/destinations/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let CancelBooking = async (id) => {
  try {
    const response = await axios.delete(`/bookings/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
