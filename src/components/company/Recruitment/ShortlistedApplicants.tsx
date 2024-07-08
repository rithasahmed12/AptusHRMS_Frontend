import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { getShortlistedCandidates, updateCandidateStatus } from '../../../api/company';

const ShortlistedCandidates: React.FC = () => {
  const [shortlisted, setShortlisted] = useState([]);

  useEffect(() => {
    fetchShortlisted();
  }, []);

  const fetchShortlisted = async () => {
    try {
      const response = await getShortlistedCandidates();
      setShortlisted(response.data);
    } catch (error) {
      console.error('Failed to fetch shortlisted candidates:', error);
      message.error('Failed to fetch shortlisted candidates');
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateCandidateStatus(id, newStatus);
      message.success(`Candidate status updated to ${newStatus}`);
      fetchShortlisted();
    } catch (error) {
      console.error('Failed to update candidate status:', error);
      message.error('Failed to update candidate status');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Job Title', dataIndex: 'jobTitle', key: 'jobTitle' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleStatusUpdate(record.id, 'Interviewed')}>Mark as Interviewed</Button>
          <Button onClick={() => handleStatusUpdate(record.id, 'Hired')} type="primary">Hire</Button>
          <Button onClick={() => handleStatusUpdate(record.id, 'Rejected')} danger>Reject</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Shortlisted Candidates</h1>
      <Table columns={columns} dataSource={shortlisted} rowKey="id" />
    </div>
  );
};

export default ShortlistedCandidates;