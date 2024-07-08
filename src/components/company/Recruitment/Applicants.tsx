import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space } from 'antd';
import { getApplicants, updateApplicantStatus } from '../../../api/company';

const AppliedCandidates = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await getApplicants();
      console.log('FetchApplicantsResponse:',response);
      
      setApplicants(response.data);
    } catch (error) {
      console.error('Failed to fetch applicants:', error);
    }
  };

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async (applicantId, status) => {
    try {
      await updateApplicantStatus(applicantId, status);
      fetchApplicants();
    } catch (error) {
      console.error('Failed to update applicant status:', error);
    }
  };

  const columns = [
    { 
      title: 'Name', 
      dataIndex: ['applicantDetails', 'Name'], 
      key: 'name',
      render: (text, record) => record.applicantDetails?.Name || 'N/A'
    },
    { 
      title: 'Place', 
      dataIndex: ['applicantDetails', 'Place'], 
      key: 'place',
      render: (text, record) => record.applicantDetails?.Place || 'N/A'
    },
    { 
      title: 'Work Experience', 
      dataIndex: ['applicantDetails', 'Work Experience'], 
      key: 'workExperience',
      render: (text, record) => record.applicantDetails?.['Work Experience'] || 'N/A'
    },
    { 
      title: 'Current CTC', 
      dataIndex: ['applicantDetails', 'Current CTC'], 
      key: 'currentCTC',
      render: (text, record) => record.applicantDetails?.['Current CTC'] || 'N/A'
    },
    { 
      title: 'Expected CTC', 
      dataIndex: ['applicantDetails', 'Expected CTC'], 
      key: 'expectedCTC',
      render: (text, record) => record.applicantDetails?.['Expected CTC'] || 'N/A'
    },
    { 
      title: 'Applied Date', 
      dataIndex: 'submittedAt', 
      key: 'appliedDate',
      render: (text) => new Date(text).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleViewDetails(record)}>View Details</Button>
          <Button onClick={() => handleUpdateStatus(record._id, 'Shortlisted')}>Shortlist</Button>
          <Button onClick={() => handleUpdateStatus(record._id, 'Rejected')}>Reject</Button>
        </Space>
      ),
    },
  ];

  const renderModalContent = () => {
    if (!selectedApplicant) return null;
    return (
      <div>
        <h2>Applicant Details</h2>
        {Object.entries(selectedApplicant.applicantDetails).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
        <p><strong>Applied Date:</strong> {new Date(selectedApplicant.submittedAt).toLocaleString()}</p>
      </div>
    );
  };

  return (
    <>
      <Table columns={columns} dataSource={applicants} rowKey="_id" />
      <Modal
        title="Applicant Details"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default AppliedCandidates;