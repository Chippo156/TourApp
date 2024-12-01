import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { getFilterTour } from '../../controller/filterController';
import { updateTour, createTour, getTourType, deleteTour } from '../../controller/tourController';

const { Option } = Select;

const TourAdmin = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [tourTypes, setTourTypes] = useState([]);

  const getdata = async () => {
    setLoading(true);
    const response = await getFilterTour(`&page=${currentPage}&size=${itemsPerPage}`);
    setData(response.result.tours);
    setTotalElements(response.result.totalElements); // Assuming response.result.totalElements contains the total number of elements
    console.log(response.result.tours);
    setLoading(false);
  };

  const fetchTourTypes = async () => {
    const response = await getTourType();
    if (response.code === 200) {
      console.log('Tour types:', response);
      setTourTypes(response.result);
    } else {
      message.error('Failed to fetch tour types');
    }
  };

  useEffect(() => {
    getdata();
    fetchTourTypes();
    console.log('Tour types:', tourTypes);
  }, [currentPage, itemsPerPage]);

  const showModal = (type, record = {}) => {
    setModalType(type);
    setIsModalVisible(true);
    if (type === 'update') {
      form.setFieldsValue(record);
      setCurrentRecord(record); // Store the current record
    } else {
      form.resetFields();
      setCurrentRecord(null); // Reset the current record
    }
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (modalType === 'create') {
        handleCreate(values);
      } else if (modalType === 'update') {
        handleUpdate({ ...currentRecord, ...values }); // Include the id in the values
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = async (record) => {
    console.log('Create', record);
    try {
      const response = await createTour(record);
      if (response.code === 200) {
        console.log('Create successful');
        getdata();
      } else {
        console.log('Failed to create', response);
        message.error('Create failed');
      }
    } catch (error) {
      console.error('Failed to create', error);
      message.error('Create failed');
    }
  };

  const handleUpdate = async (record) => {
    console.log('Update', record.id);
    try {
      const response = await updateTour(record.id, record);
      if (response.code === 200) {
        console.log('Update successful');
        getdata();
      } else {
        message.error('Failed to update tour');
      }
    } catch (error) {
      message.error('Failed to update tour');
      console.error('Update error:', error);
    }
  };

  const handleDelete = async (record) => {
    console.log('Delete', record.id);
    try {
      const response = await deleteTour(record.id); // Await the deleteTour function
      if (response.code === 200) {
        console.log('Response:', response);
        console.log('Delete successful');
        getdata(); // Refresh the data
      } else {
        console.log('Failed to delete', response);
        message.error('Delete failed');
      }
    } catch (error) {
      console.error('Failed to delete', error);
      message.error('Delete failed');
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      render: (text) => text.length > 10 ? `${text.substring(0, 10)}...` : text,
    },
    {
      title: 'Departure',
      dataIndex: 'departure',
      filters: [
        {
          text: 'Hanoi',
          value: 'Hanoi',
        },
        // Add more filters as needed
      ],
      onFilter: (value, record) => record.departure.indexOf(value) === 0,
      render: (text) => text.length > 10 ? `${text.substring(0, 10)}...` : text,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text) => text.length > 10 ? `${text.substring(0, 10)}...` : text,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (text) => text.length > 10 ? `${text.substring(0, 10)}...` : text,
    },
    {
      title: 'Highlight',
      dataIndex: 'highlight',
      render: (text) => text.length > 10 ? `${text.substring(0, 10)}...` : text,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (text) => text.length > 10 ? `${text.substring(0, 10)}...` : text,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (text) => text.length > 10 ? `${text.substring(0, 10)}...` : text,
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      render: (text) => text.length > 10 ? `${text.substring(0, 10)}...` : text,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
         
          <Button type="link" onClick={() => showModal('update', record)}>Update</Button>
          <Button type="link" onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <> 
        <Button type="primary" onClick={() => showModal('create')}>Create Tour</Button>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalElements,
          onChange: (page) => setCurrentPage(page),
        }}
      />
      <Modal
        title={modalType === 'create' ? 'Create Tour' : 'Update Tour'}
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
          <Form.Item name="departure" label="Departure" rules={[{ required: true, message: 'Please input the departure!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="duration" label="Duration" rules={[{ required: true, message: 'Please input the duration!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="highlight" label="Highlight" rules={[{ required: true, message: 'Please input the highlight!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please input the rating!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="schedule" label="Schedule" rules={[{ required: true, message: 'Please input the schedule!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tour_type_id" label="Tour Type" rules={[{ required: true, message: 'Please select the tour type!' }]}>
            <Select>
              {tourTypes.map(type => (
                <Option key={type.id} value={type.id}>{type.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TourAdmin;