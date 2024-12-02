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
  List,
  Card,
  Image,
  Typography,
  Spin,
  Select,
} from "antd";
import { getFullAmenities } from "../../controller/DetailsController";
import "./destination.scss";
import {
  getFilterDestination,
  getFilterTour,
} from "../../controller/filterController";
import { ReloadOutlined } from "@ant-design/icons";
import { Rate } from "antd";
const { Title, Text } = Typography;
const { Option } = Select;
import { useNavigate } from "react-router-dom";

function FilterTour() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000 });
  const [selectedTourType, setSelectedTourType] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [activeDuration, setActiveDuration] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const tours_type = [
    { id: 1, categoryName: "Cultural tour" },
    { id: 2, categoryName: "Sightseeing tour" },
    { id: 3, categoryName: "Historical tour" },
    { id: 4, categoryName: "Eco-tour" },
  ];

  const duration = [
    "2 days 1 night",
    "3 days 2 nights",
    "4 days 3 nights",
    "5 days or more",
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
    setSelectedTourType([id]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDurationChange = (dur) => {
    setActiveDuration((prev) =>
      prev.includes(dur)
        ? prev.filter((duration) => duration !== dur)
        : [...prev, dur]
    );
  };

  const handleItemsPerPageChange = (current, size) => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to first page
  };
  const handleDetaiTour = (id) => {
    navigate(`/tour-details/${id}`);
  };
  const handleGetFilterDestination = async () => {
    setLoading(true);
    let param = `&page=${currentPage}&size=${itemsPerPage}`;
    if (priceRange.min >= 0) {
      param += `&minPrice=${priceRange.min}`;
    }
    if (priceRange.max <= 20000000) {
      param += `&maxPrice=${priceRange.max}`;
    }
    if (selectedRating) {
      param += `&rating=${selectedRating}`;
    }
    if (selectedTourType.length > 0) {
      param += `&tourTypeId=${selectedTourType.join(",")}`;
    }
    if (activeDuration.length > 0) {
      param += `&duration=${activeDuration.join(",")}`;
    }
    console.log("param", param);
    try {
      let res = await getFilterTour(param);
      console.log(res);
      if (res && res.code === 200) {
        setFilteredResults(res.result.tours);
        setTotalPages(res.result.totalPage);
        setTotalElements(res.result.totalElement);
        console.log("Total Elements:", res.result.totalElement);
        console.log("Items Per Page:", itemsPerPage);
      }
    } catch (error) {
      console.error("Failed to fetch destinations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setPriceRange({ min: 0, max: 20000000 });
    setSelectedTourType([]);
    setSelectedRating(null);
    setActiveDuration([]);
    handleGetFilterDestination();
    setItemsPerPage(2); // Reset items per page to default
    setCurrentPage(1);
  };

  useEffect(() => {
    handleGetFilterDestination();
  }, [
    priceRange,
    selectedRating,
    selectedTourType,
    activeDuration,
    currentPage,
    itemsPerPage,
  ]);

  return (
    <div className="container_filter_tour">
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
            <div className="filter-item">
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
                    max={20000000}
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
                    max={20000000}
                    value={formatPriceVND(priceRange.max)}
                    onChange={(value) =>
                      setPriceRange((prev) => ({ ...prev, max: value }))
                    }
                    size="large"
                  />
                </Col>
              </Row>
            </div>
            <div className="filter-item">
              <h2>Tour type</h2>
              <Row gutter={8}>
                {tours_type.map((category) => (
                  <Col key={category.id} span={24}>
                    <Checkbox
                      checked={selectedTourType.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    >
                      {category.categoryName}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="filter-item">
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
            <div className="filter-item">
              <h2>Duration</h2>
              <Row gutter={8}>
                {duration.map((dur, index) => (
                  <Col key={index} span={24}>
                    <Checkbox
                      checked={activeDuration.includes(dur)}
                      onChange={() => handleDurationChange(dur)}
                    >
                      {dur}
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
                renderItem={(item) => (
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
                      onClick={() => handleDetaiTour(item.id)}
                    >
                      <Card.Meta
                        title={
                          <Text className="card-meta-title">{item.name}</Text>
                        }
                        description={
                          <>
                            <div className="flex-align-center">
                              <Rate disabled allowHalf value={item.rating} />;
                            </div>
                            <div className="flex-row">
                              <Text className="card-meta-departure">
                                Departure: {item.departure}
                              </Text>
                              <Text className="card-meta-schedule">
                                Schedule: {item.schedule}
                              </Text>
                            </div>
                            <div className="flex-row">
                              <Text className="card-meta-price">
                                Price: {formatPriceVND(item.price)} VND
                              </Text>
                              <Text className="card-meta-duration">
                                Duration: {item.duration}
                              </Text>
                            </div>
                          </>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </Spin>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={totalElements * totalPages * 1.0}
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

export default FilterTour;
