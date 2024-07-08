import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { getAllJobs, deleteJob } from '../../../api/company';
import { useNavigate } from 'react-router-dom';

const ListedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      message.error('Failed to fetch jobs');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      message.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
      message.error('Failed to delete job');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: '_id' },
    { title: 'Status', dataIndex: 'status', key: '_id' },
    { title: 'Created At', dataIndex: 'createdAt', key: '_id', render: (date) => new Date(date).toLocaleDateString() },
    {
      title: 'Actions',
      key: '_id',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/c/recruitment/jobs/edit/${record._id}`)}>Edit</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} danger>Delete</Button>
          <Button icon={<EyeOutlined />} onClick={() => navigate(`/jobs/${record._id}`)}>View Form</Button>
        </>
      ),
    },
  ];

  const handleAddJobClick = () => {
    navigate('/c/recruitment/jobs/add');
  };

  return (
    <div>
      <Button icon={<PlusOutlined />} onClick={handleAddJobClick} style={{ marginBottom: 16 }}>
        Add New Job
      </Button>
      <Table columns={columns} dataSource={jobs} rowKey="_id" />
    </div>
  );
};

export default ListedJobs;