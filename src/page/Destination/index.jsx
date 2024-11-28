import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Slider,
  InputNumber,
  Checkbox,
  Button,
  Pagination,
  DatePicker,
  List,
  Card,
  Image,
  Typography,
} from "antd";
import { getFullAmenities } from "../../controller/DetailsController";
import "./destination.scss";
import { getFilterDestination } from "../../controller/filterController";
const { Title, Text } = Typography;

function FilterPage() {
  const { value } = useParams();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [activeAmenities, setActiveAmenities] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberGuest, setNumberGuest] = useState(1);
  const [selectedSecondLastDay, setSelectedSecondLastDay] = useState(null);
  const [selectedLastDayOfMonth, setSelectedLastDayOfMonth] = useState(null);
  const [city, setCity] = useState(value || "Hồ Chí Minh");
  const [selectAllAmenities, setSelectAllAmenities] = useState(false);
  const itemsPerPage = 10;

  const categories = [
    { id: 1, categoryName: "Villa" },
    { id: 2, categoryName: "Resort" },
    { id: 3, categoryName: "Hotel" },
    { id: 4, categoryName: "Apartment" },
  ];

  useEffect(() => {
    console.log(value);
    // Fetch amenities/services from API
    // setAmenities(fetchedAmenities);
  }, [value]);

  const handlePriceChange = (value) => {
    setPriceRange({ min: value[0], max: value[1] });
  };

  const formatPriceVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleCategoryChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGuestChange = (value) => {
    setNumberGuest(value);
  };

  const handleDateChange = (dates) => {
    setSelectedSecondLastDay(dates[0]);
    setSelectedLastDayOfMonth(dates[1]);
  };

  const getAmenity = async () => {
    let res = await getFullAmenities();
    if (res && res.code === 200) {
      setAmenities(res.result);
    }
  };
  const handleSelectAllAmenities = () => {
    if (selectAllAmenities) {
      setActiveAmenities([]);
    } else {
      setActiveAmenities(amenities.map((_, index) => index + 1));
    }
    setSelectAllAmenities(!selectAllAmenities);
  };

  const handleAmenityChange = (index) => {
    const amenityIndex = index + 1;
    setActiveAmenities((prev) =>
      prev.includes(amenityIndex)
        ? prev.filter((i) => i !== amenityIndex)
        : [...prev, amenityIndex]
    );
    setSelectAllAmenities(false); // Ensure "Select All" is unchecked when individual amenities are selected
  };
  useEffect(() => {
    getAmenity();
  }, []);

  const handleGetFilterDestination = async () => {
    let param = "";
    if (activeAmenities.length > 0) {
      param += `&amenityIds=${activeAmenities.join(",")}`;
    }
    if (priceRange.min > 0 || priceRange.max < 1000) {
      param += `&priceRange=${priceRange.min}-${priceRange.max}`;
    }
    if (selectedRating) {
      param += `&averageRating=${selectedRating}`;
    }
    if (selectedCategories.length > 0) {
      param += `&categoryIds=${selectedCategories.join(",")}`;
    }
    if (numberGuest) {
      param += `&sleeps=${numberGuest}`;
    }
    if (selectedSecondLastDay) {
      param += `&startDate=${selectedSecondLastDay.format("YYYY-MM-DD")}`;
    }
    if (selectedLastDayOfMonth) {
      param += `&endDate=${selectedLastDayOfMonth.format("YYYY-MM-DD")}`;
    }
    console.log(param);
    let res = await getFilterDestination(value, param);
    if (res && res.code === 200) {
      console.log(res);
      setFilteredResults(res.result); // Update data after receiving
      return res.result;
    }
    return [];
  };

  useEffect(() => {
    console.log(1);
    handleGetFilterDestination();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="container">
      <Row gutter={16}>
        <Col span={6}>
          <div className="filter-section">
            <h2>Bộ lọc tour</h2>
            <div>
              <h2>Guests</h2>
              <InputNumber
                min={1}
                value={numberGuest}
                onChange={handleGuestChange}
                size="large"
              />
            </div>
            <div>
              <h2>Date Range</h2>
              <DatePicker.RangePicker onChange={handleDateChange} />
            </div>
            <div>
              <h2>Price</h2>
              <Slider
                range
                min={0}
                max={20000000}
                value={[priceRange.min, priceRange.max]}
                onChange={handlePriceChange}
              />
              <Row gutter={8}>
                <Col span={12}>
                  <InputNumber
                    min={0}
                    max={1000}
                    value={formatPriceVND(priceRange.min)}
                    onChange={(value) =>
                      setPriceRange((prev) => ({ ...prev, min: value }))
                    }
                    size="large"
                  />
                </Col>
                <Col span={12}>
                  <InputNumber
                    min={0}
                    max={1000}
                    value={formatPriceVND(priceRange.max)}
                    onChange={(value) =>
                      setPriceRange((prev) => ({ ...prev, max: value }))
                    }
                    size="large"
                  />
                </Col>
              </Row>
            </div>
            <div>
              <h2>Categories</h2>
              <Row gutter={8}>
                {categories.map((category) => (
                  <Col key={category.id} span={24}>
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    >
                      {category.categoryName}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </div>
            <div>
              <h2>Rating</h2>
              <Row gutter={8}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Col key={rating} span={24}>
                    <Checkbox
                      checked={selectedRating === rating}
                      onChange={() => handleRatingChange(rating)}
                    >
                      {rating} star
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </div>
            <div>
              <h2>Amenities/Services</h2>
              <Row gutter={8}>
                <Col span={24}>
                  <Checkbox
                    checked={selectAllAmenities}
                    onChange={handleSelectAllAmenities}
                  >
                    Select All
                  </Checkbox>
                </Col>
                {amenities.map((amenity, index) => (
                  <Col key={index} span={24}>
                    <Checkbox
                      checked={activeAmenities.includes(index + 1)}
                      onChange={() => handleAmenityChange(index)}
                    >
                      {amenity.amenity_name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </div>

            <Button type="primary" onClick={handleGetFilterDestination}>
              Apply Filters
            </Button>
          </div>
        </Col>
        <Col span={18}>
          <div className="results-section">
            <h2>Danh sách các tour</h2>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={currentItems}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Card
                      hoverable
                      cover={
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          style={{ height: 200 }}
                        />
                      }
                      //   onClick={() => handleDetails(item.destination_id)}
                    >
                      <Card.Meta
                        title={
                          <Text className="card-meta-title">{item.name}</Text>
                        }
                        description={
                          <>
                            <Text className="card-meta-description">
                              {item.description}
                            </Text>
                            <div className="flex-align-center">
                              <Text className="rating">
                                {item.average_rating}
                              </Text>
                            </div>
                            <Text className="card-meta-location">
                              {item.location}
                            </Text>
                          </>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }}
            />
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredResults.length}
              onChange={handlePageChange}
            />
            
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FilterPage;
