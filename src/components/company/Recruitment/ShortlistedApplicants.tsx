import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Image, message } from 'antd';
import { getShortlistedCandidates, updateApplicantStatus, deleteApplicant } from '../../../api/company';

const ShortlistedCandidates = () => {
  const [shortlisted, setShortlisted] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleUpdateStatus = async (applicantId, status) => {
    try {
      await updateApplicantStatus(applicantId, status);
      message.success(`Candidate status updated to ${status}`);
      fetchShortlisted();
    } catch (error) {
      console.error('Failed to update candidate status:', error);
      message.error('Failed to update candidate status');
    }
  };

  const handleDelete = async (applicantId) => {
    try {
      await deleteApplicant(applicantId);
      message.success('Candidate removed from shortlist');
      fetchShortlisted();
    } catch (error) {
      console.error('Failed to delete candidate:', error);
      message.error('Failed to delete candidate');
    }
  };

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setIsModalVisible(true);
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
      dataIndex: ['applicantDetails', 'place'], 
      key: 'place',
      render: (text, record) => record.applicantDetails?.place || 'N/A'
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
          <Button onClick={() => handleUpdateStatus(record._id, 'Interviewed')}>Mark as Interviewed</Button>
          <Button onClick={() => handleUpdateStatus(record._id, 'Hired')} type="primary">Hire</Button>
          <Button onClick={() => handleDelete(record._id)} danger>Remove</Button>
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
        <p><strong>Location:</strong> {selectedApplicant.place}</p>
        
        <h3>Uploaded Files</h3>
        {selectedApplicant.uploadedFiles && Object.entries(selectedApplicant.uploadedFiles).map(([key, files]) => (
          <div key={key}>
            <h4>{key}</h4>
            {files.map((file, index) => (
              <div key={index}>
                {file.type.startsWith('image') ? (
                  <Image src={file.cloudinaryUrl} alt={file.name} width={200} />
                ) : (
                  <a href={file.cloudinaryUrl} target="_blank" rel="noopener noreferrer">{file.name}</a>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>Shortlisted Candidates</h1>
      <Table columns={columns} dataSource={shortlisted} rowKey="_id" />
      <Modal
        title="Applicant Details"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default ShortlistedCandidates;