import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Image, message, Popconfirm } from 'antd';
import { getShortlistedCandidates, updateApplicantStatus, deleteApplicant } from '../../../api/company';

interface ApplicantDetails {
  Name: string;
  place: string;
  [key: string]: string;
}

interface UploadedFile {
  name: string;
  type: string;
  cloudinaryUrl: string;
}

interface Applicant {
  _id: string;
  applicantDetails: ApplicantDetails;
  submittedAt: string;
  place: string;
  uploadedFiles?: {
    [key: string]: UploadedFile[];
  };
}

const ShortlistedCandidates: React.FC = () => {
  const [shortlisted, setShortlisted] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  const handleUpdateStatus = async (applicantId: string, status: string) => {
    try {
      await updateApplicantStatus(applicantId, status);
      message.success(`Candidate status updated to ${status}`);
      fetchShortlisted();
    } catch (error) {
      console.error('Failed to update candidate status:', error);
      message.error('Failed to update candidate status');
    }
  };

  const handleDelete = async (applicantId: string) => {
    try {
      await deleteApplicant(applicantId);
      message.success('Candidate removed from shortlist');
      fetchShortlisted();
    } catch (error) {
      console.error('Failed to delete candidate:', error);
      message.error('Failed to delete candidate');
    }
  };

  const handleViewDetails = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsModalVisible(true);
  };

  const columns = [
    { 
      title: 'Name', 
      dataIndex: ['applicantDetails', 'Name'], 
      key: 'name',
      render: (_text: string, record: Applicant) => record.applicantDetails?.Name || 'N/A'
    },
    { 
      title: 'Place', 
      dataIndex: ['applicantDetails', 'place'], 
      key: 'place',
      render: (_text: string, record: Applicant) => record.applicantDetails?.place || 'N/A'
    },
    { 
      title: 'Applied Date', 
      dataIndex: 'submittedAt', 
      key: 'appliedDate',
      render: (text: string) => new Date(text).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Applicant) => (
        <Space>
          <Button onClick={() => handleViewDetails(record)}>View Details</Button>
          <Popconfirm
            title="Are you sure you want to mark this candidate as interviewed?"
            onConfirm={() => handleUpdateStatus(record._id, 'Interviewed')}
            okText="Yes"
            cancelText="No"
          >
            <Button>Mark as Interviewed</Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure you want to hire this candidate?"
            onConfirm={() => handleUpdateStatus(record._id, 'Hired')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Hire</Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure you want to remove this candidate from the shortlist?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Remove</Button>
          </Popconfirm>
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