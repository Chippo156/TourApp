import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Rate,
} from "antd";
import { getFullAmenities } from "../../controller/DetailsController";
import "./destination.scss";
import { getFilterDestination } from "../../controller/filterController";
import { Spin } from "antd"; // Import Spin
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function FilterPage() {
  const navigate = useNavigate();
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
  const [city, setCity] = useState("");
  const [selectAllAmenities, setSelectAllAmenities] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedLocation, setSelectedLocation] = useState("");

  const categories = [
    { id: 1, categoryName: "Villa" },
    { id: 2, categoryName: "Resort" },
    { id: 3, categoryName: "Hotel" },
    { id: 4, categoryName: "Apartment" },
  ];
  const cityData = [
    {
      city: "Hồ Chí Minh",
      value: "Hồ Chí Minh",
    },
    {
      city: "Hà Nội",
      value: "Hanoi",
    },
    {
      city: "Đà Nẵng",
      value: "Da nang",
    },
  ];
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
    setLoading(true); // Bắt đầu loading
    let param = `&page=${currentPage}&size=${itemsPerPage}`;
    if (activeAmenities.length > 0) {
      param += `&amenityIds=${activeAmenities.join(",")}`;
    }
    if (priceRange.min >= 0) {
      param += `&minPrice=${priceRange.min}`;
    }
    if (priceRange.max <= 20000000) {
      param += `&maxPrice=${priceRange.max}`;
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
    try {
      var res;
      if (value === "Other") {
        if (selectedLocation) {
          res = await getFilterDestination("Other", param, selectedLocation);
        } else {
          res = await getFilterDestination("Other", param);
        }
      } else {
        res = await getFilterDestination(value, param);
      }
      console.log(param);
      if (res && res.code === 200) {
        console.log(res);
        setFilteredResults(res.result.destinations); // Update data after receiving
        setTotalPages(res.result.totalPage);
        setTotalElements(res.result.totalElement);
      }
    } catch (error) {
      console.error("Failed to fetch destinations", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleLocationChange = (value) => {
    setSelectedLocation((prevSelectedLocation) =>
      prevSelectedLocation === value ? "" : value
    );
  };
  const handleItemsPerPageChange = (current, size) => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to first page
  };
  const handleRefresh = () => {
    // Reset các bộ lọc về trạng thái mặc định
    setPriceRange({ min: 0, max: 20000000 });
    setSelectedCategories([]);
    setSelectedRating(null);
    setActiveAmenities([]);
    setNumberGuest(1);
    setSelectedSecondLastDay(null);
    setSelectedLastDayOfMonth(null);
    setSelectAllAmenities(false);
    setItemsPerPage(2); // Reset items per page to default
    setCurrentPage(1);
    if (value === "Other") {
      setSelectedLocation("");
    }
    // Gọi lại API để lấy dữ liệu ban đầu
    handleGetFilterDestination();
  };

  useEffect(() => {
    handleGetFilterDestination();
  }, [
    activeAmenities,
    priceRange,
    selectedRating,
    selectedCategories,
    numberGuest,
    selectedSecondLastDay,
    selectedLastDayOfMonth,
    selectedLocation,
    currentPage,
    itemsPerPage,
  ]);
  const handleDetails = (des_id) => {
    navigate(`/destination/${des_id}`);
  };
  return (
    <div className="container_filter">
      <Row gutter={16}>
        <Col span={6}>
          <div className="filter-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: 0, padding: 0 }}>Filter tour</h2>
              <Button
                type="default"
                icon={<ReloadOutlined />}
                onClick={() => {
                  handleRefresh();
                }}
              />
            </div>
            {value === "Other" && (
              <div>
                <h2>Location</h2>
                <Row gutter={8}>
                  {cityData.map((city) => (
                    <Col key={city.value} span={24}>
                      <Checkbox
                        checked={selectedLocation === city.value}
                        onChange={() => handleLocationChange(city.value)}
                      >
                        {city.city}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
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
          </div>
        </Col>
        <Col span={18}>
          <div className="results-section">
            <h2>List of tours</h2>
            <Spin spinning={loading} tip="Loading...">
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={filteredResults}
                renderItem={(item) => {
                  return (
                    <List.Item
                      onClick={() => handleDetails(item.destination_id)}
                    >
                      <Card
                        hoverable
                        cover={
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            style={{ height: 200 }}
                          />
                        }
                        onClick={() => handleDetails(item.id)}
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
                                <Rate
                                  disabled
                                  allowHalf
                                  value={item.average_rating}
                                />
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
            </Spin>

            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={itemsPerPage * totalPages * 1.0}
              onChange={handlePageChange}
              showSizeChanger
              onShowSizeChange={handleItemsPerPageChange}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FilterPage;
