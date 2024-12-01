import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';

import { createDestination, deleteDestination, getAllDestination } from '../../controller/destinationController';
import { getAllCategory } from '../../controller/categoryController';

const { Option } = Select;

const HotelAdmin = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [category, setCategory] = useState([]);

  const getdata = async (page = 1, pageSize = itemsPerPage) => {
    setLoading(true);
    try {
      const response = await getAllDestination(page, pageSize);
      if (response.code === 200) {
        setData(response.result.destinations);
        setTotalElements(response.result.totalElements);
        setCurrentPage(page);
      } else {
        message.error('Failed to fetch destinations');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Failed to fetch data');
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      if (response.code === 200) {
        setCategory(response.result);
      } else {
        message.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Fetch categories error:', error);
      message.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    getdata();
    fetchCategories();
  }, []);

  const showModal = (type, record = {}) => {
    setModalType(type);
    setIsModalVisible(true);
    if (type === 'update') {
      form.setFieldsValue(record);
      setCurrentRecord(record);
    } else {
      form.resetFields();
      setCurrentRecord(null);
    }
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (modalType === 'create') {
        handleCreate(values);
      } else if (modalType === 'update') {
        handleUpdate({ ...currentRecord, ...values });
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = async (record) => {
    try {
      const response = await createDestination(record);
      if (response.code === 200) {
        message.success('Create successful');
        getdata();
      } else {
        message.error('Create failed');
      }
    } catch (error) {
      console.error('Create error:', error);
      message.error('Create failed');
    }
  };

  const handleUpdate = async (record) => {
    console.log('Update:', record.id);
    try {
      const response = await updateTour(record.id, record);
      if (response.code === 200) {
        message.success('Update successful');
        getdata();
      } else {
        message.error('Failed to update');
      }
    } catch (error) {
      console.error('Update error:', error);
      message.error('Failed to update');
    }
  };

  const handleDelete = async (record) => {
    console.log('Delete:', record.id);
    try {
      const response = await deleteDestination(record.destination_id);
      if (response.code === 200) {
        message.success('Delete successful');
        getdata();
      } else {
        message.error('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Delete failed');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'destination_id',
      sorter: (a, b) => a.destination_id - b.destination_id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => text.length > 50 ? `${text.substring(0, 50)}...` : text,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text) => text.length > 50 ? `${text.substring(0, 50)}...` : text,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      render: (text) => text.length > 50 ? `${text.substring(0, 50)}...` : text,
    },
    {
      title: 'Average Rating',
      dataIndex: 'average_rating',
      sorter: (a, b) => a.average_rating - b.average_rating,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal('update', record)}>Update</Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => showModal('create')}>Create Destination</Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalElements,
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setItemsPerPage(size);
            getdata(current, size);
          },
          onChange: (page) => getdata(page),
        }}
      />
      <Modal
        title={modalType === 'create' ? 'Create Destination' : 'Update Destination'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {modalType === 'update' && (
            <Form.Item name="id" label="ID">
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please input the location!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="average_rating" label="Average Rating" rules={[{ required: true, message: 'Please input the average rating!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category_id" label="Category" rules={[{ required: true, message: 'Please select the category!' }]}>
            <Select>
              {category.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HotelAdmin;
