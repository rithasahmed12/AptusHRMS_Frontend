import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { getAllJobs, deleteJob } from '../../../api/company';
import { useNavigate } from 'react-router-dom';

interface Job {
  _id: string;
  title: string;
  status: string;
  createdAt: string;
}

const ListedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
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

  const handleDelete = async (id: string) => {
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
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { 
      title: 'Created At', 
      dataIndex: 'createdAt', 
      key: 'createdAt', 
      render: (date: string) => new Date(date).toLocaleDateString() 
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Job) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/c/recruitment/jobs/edit/${record._id}`)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this job?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>Delete</Button>
          </Popconfirm>
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