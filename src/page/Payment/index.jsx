import React, { useState,useEffect } from "react";
import {
    getTourById,
    getTourImages,
    getListByTourId
  } from '../../controller/tourDetailsController';
import { Navigate, useParams } from 'react-router-dom';
import { Button, Card, Carousel, Image, Typography, Collapse, Modal, Form } from 'antd';
function PackageOptions() {
  const [tourDate, setTourDate] = useState("30 Nov 2024");
  const [departingFrom, setDepartingFrom] = useState("Ho Chi Minh City Center");
  const [tourType, setTourType] = useState("Big Group Join-in tour");
  const [guideOption, setGuideOption] = useState("English Guide");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [tour, setTour] = useState({})
  const [tourImages, setTourImages] = useState([])
  const [itinerary, setItinerary] = useState([])
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const tour_id = useParams().id;
  const fetchTour = async () => {
    const response = await getTourById(tour_id)
    setTour(response.result)
  }
  const handlePayment = () => {
    alert(`PaymentComplete!`);
  };

  const fetchTourImages = async () => {
    const response = await getTourImages(tour_id)
    setTourImages(response)
  }

  const fetchItinerary = async () => {
    const response = await getListByTourId(tour_id)
    setItinerary(response)
  }

  const handleOptionChange = (setter, value) => {
    setter(value);
  };

  const incrementCount = (setter, count) => {
    setter(count + 1);
  };

  const decrementCount = (setter, count) => {
    if (count > 0) setter(count - 1);
  };
  useEffect(() => {
    fetchTour()
    fetchTourImages()
    fetchItinerary()
  }, [])
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Package options</h2>
      <div style={styles.optionsContainer}>
        <h4>{tour.name}</h4>      
        <p>Tour date</p>
        <div style={styles.row}>
          <button style={styles.dateButton}>{tour.start_date}</button>
        </div>

        <div style={styles.row}>
        </div>
        
        <h5>Guide options</h5>
        <div style={styles.row}>
          {["English Guide", "Japanese Guide", "Chinese Guide", "Korean Guide"].map((guide) => (
            <button
              key={guide}
              style={
                guideOption === guide ? styles.selectedButton : styles.button
              }
              onClick={() => handleOptionChange(setGuideOption, guide)}
            >
              {guide}
            </button>
          ))}
        </div>
        <h5>Payment Method</h5>
        <div style={styles.row}>
          {[
            "Visa Card",
            "Master Card",
            "Momo",
          ].map((type) => (
            <button
              key={type}
              style={tourType === type ? styles.selectedButton : styles.button}
              onClick={() => handleOptionChange(setTourType, type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div style={styles.quantityRow}>
        </div>

        <h4>Total:{tour.price} VND</h4>
        <br></br>
        <h5>Contact Phone Number: 0999999999 - MR Hau</h5>   
        <br></br>
        <div style={styles.row}>
          <button style={styles.bookNowButton}>Book now</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  optionsContainer: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff",
  },
  row: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
  },
  selectedButton: {
    padding: "10px 15px",
    border: "1px solid #ff6600",
    borderRadius: "5px",
    backgroundColor: "#ffeedc",
    color: "#ff6600",
    cursor: "pointer",
  },
  discountButton: {
    padding: "10px 15px",
    border: "none",
    color: "#ff6600",
    cursor: "pointer",
  },
  dateButton: {
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#ffeedc",
    color: "#ff6600",
    cursor: "pointer",
  },
  quantityRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  counter: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  cartButton: {
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
  },
  bookNowButton: {
    padding: "10px 20px",
    backgroundColor: "#ff6600",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PackageOptions;
