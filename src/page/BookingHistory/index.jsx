import { Image, List } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  getListBookingById
} from '../../controller/BookingController'
import { useSelector } from 'react-redux'
import { getTourById } from '../../controller/tourDetailsController'
import { getDestinationById } from '../../controller/DetailsController'

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([])
  const [tour, setTour] = useState([])
  const [destination, setDestination] = useState([])

  const user = useSelector((state) => state.user)

  const fetchBookingHistory = async (user_id) => {
    const response = await getListBookingById(user_id)
    setBookingHistory(response.result)
  }

  const fetchTour = async (tour_id) => {
    const response = await getTourById(tour_id)
    setTour(response.result)
  }

  const fetchDestination = async (destination_id) => {
    const response = await getDestinationById(destination_id)
    setDestination(response.result)
  }

  const renderItem = (item) => {

    return (
      <List.Item>
        <List.Item.Meta
        // avatar={<Image src={item.tour_id ? tour.image_url : destination.image_url} />}
          title={`Đặt thành công:`}
          description={`Đơn đặt ${item.id} đã hoàn thành. ${item.tour_id ? `Tour ID: ${item.tour_id}` : `Destination ID: ${item.destination_id}`}`}
        />
      </List.Item>
    )
  }

  useEffect(() => {
    if (user.isAuth && user.user.id) {
      fetchBookingHistory(user.user.id);
      console.log(bookingHistory)
    }
  }, [user]);

  return (
    <div className='container'>
      <div>
        <List
          dataSource={bookingHistory}
          renderItem={(item) => renderItem(item)}
        />
      </div>
    </div>
  )
}

export default BookingHistory
