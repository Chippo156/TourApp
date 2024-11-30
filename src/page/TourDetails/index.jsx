import { Button, Card, Carousel, Image, Typography, Collapse, Modal, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  getTourById,
  getTourImages,
  getListByTourId
} from '../../controller/tourDetailsController'
import { ArrowRightOutlined, CalendarOutlined, ClockCircleOutlined, StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";
import './tourdetails.scss'
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography
const { Panel } = Collapse;

const TourDetails = () => {
  const [tour, setTour] = useState({})
  const [tourImages, setTourImages] = useState([])
  const [itinerary, setItinerary] = useState([])
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const tour_id = useParams().id;

  const fetchTour = async () => {
    const response = await getTourById(tour_id)
    setTour(response.result)
  }

  const fetchTourImages = async () => {
    const response = await getTourImages(tour_id)
    setTourImages(response)
  }

  const fetchItinerary = async () => {
    const response = await getListByTourId(tour_id)
    setItinerary(response)
  }

  const StarRating = ({ rating }) => {
    // Đảm bảo rating là một số hợp lệ
    const validRating = Number.isFinite(rating) ? rating : 0;

    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 !== 0;
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

  useEffect(() => {
    fetchTour()
    fetchTourImages()
    fetchItinerary()
  }, [])

  return (
    <div className='container_tour'>
      <div>
        <Title level={3}>{tour.name}</Title>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <StarRating rating={tour.rating} />
        <Text className='text'>{tour.rating}</Text>
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 20 }}>
        <Carousel
          arrows={true}
          infinite={false}
          draggable={true}
          autoplay
          style={{ width: 800, height: 400 }}
        >
          {tourImages?.map((image) => (
            <div key={image.id}>
              <Image
                preview={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={image.imageUrl}
              />
            </div>
          ))}
        </Carousel>
        <Card >
          <div style={{ gap: 10, display: "flex", padding: 10 }}>
            <ClockCircleOutlined style={{ fontSize: 20 }} />
            <Text className='text'>{tour.duration}</Text>
          </div>
          <div style={{ gap: 10, display: "flex", padding: 10 }}>
            <CalendarOutlined style={{ fontSize: 20 }} />
            <Text className='text'>{tour.start_date}</Text>
          </div>
          <div style={{ gap: 10, display: "flex", alignItems: "flex-start", padding: 10 }}>
            <ArrowRightOutlined style={{ fontSize: 20, marginTop: 5 }} />
            <Text className='text'>{tour.name}</Text>
          </div>
          <div style={{ width: "100%", justifyContent: "flex-end", display: "flex", gap: 10, padding: 10 }}>
            <Text className='text'>Giá từ:</Text>
            <Text className='text' style={{ color: "#b20000", fontWeight: "bold" }}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(tour.price)}</Text>
          </div>
          <Button type='primary' className='button'
          // onClick={() => setIsModalVisible(true)}
          >Gửi yêu cầu</Button>
          {/* <Button type='text' className='text' style={{ height: 45, marginTop: 10, width: "100%" }}>Xem lịch khởi hành</Button> */}
        </Card>
      </div>
      <div style={{ marginTop: 70 }}>
        <div>
          <Title level={3}>Mô tả tour</Title>
          <Text className='text'>{tour.description}</Text>
        </div>
        <div style={{ marginTop: 50 }}>
          <Title level={3}>Lịch trình tour</Title>
          <Collapse defaultActiveKey={['1']}>
            {itinerary.map((item, index) => (
              <Panel style={{ fontSize: 18, fontWeight: "bold" }} header={item.day} key={index}>
                {item.activities.split('.').filter(sentence => sentence.trim() !== '').map((sentence, i) => (
                  <p style={{ marginLeft: 30, marginRight: 20, lineHeight: 2, fontSize: 16, fontWeight: "normal" }} key={i}>{sentence.trim()}.</p>
                ))}
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
      {/* <Modal
        title={<div><p>GỬI YÊU CẦU</p><p>{tour.name}</p></div>}
        visible={isModalVisible}
        width={800}
        footer={null}
      >
        <Form></Form>
      </Modal> */}
    </div>
  )
}

export default TourDetails

