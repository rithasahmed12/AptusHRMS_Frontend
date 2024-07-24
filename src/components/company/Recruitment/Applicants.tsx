import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Image, message, Tag, Popconfirm } from 'antd';
import { deleteApplicant, getApplicants, updateApplicantStatus } from '../../../api/company';

interface ApplicantDetails {
  Name?: string;
  place?: string;
  [key: string]: any;
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
  status: string;
  place?: string;
  uploadedFiles?: {
    [key: string]: UploadedFile[];
  };
}

const AppliedCandidates: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await getApplicants();
      console.log('FetchApplicantsResponse:', response);
      setApplicants(response.data);
    } catch (error) {
      console.error('Failed to fetch applicants:', error);
    }
  };

  const handleViewDetails = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async (applicantId: string, status: string) => {
    try {
      await updateApplicantStatus(applicantId, status);
      message.success(`Applicant ${status === 'Shortlisted' ? 'shortlisted' : 'rejected'} successfully`);
      fetchApplicants();
    } catch (error) {
      console.error('Failed to update applicant status:', error);
      message.error('Failed to update applicant status');
    }
  };

  const handleDelete = async (applicantId: string) => {
    try {
      await deleteApplicant(applicantId);
      message.success('Applicant deleted successfully');
      fetchApplicants();
    } catch (error) {
      console.error('Failed to delete applicant:', error);
      message.error('Failed to delete applicant');
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Shortlisted':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Interviewed':
        return 'blue';
      case 'Hired':
        return 'gold';
      default:
        return 'default';
    }
  };

  const columns = [
    { 
      title: 'Name', 
      dataIndex: ['applicantDetails', 'Name'], 
      key: 'name',
      render: (_: any, record: Applicant) => record.applicantDetails?.Name || 'N/A'
    },
    { 
      title: 'Place', 
      dataIndex: ['location','place'], 
      key: 'place',
      render: (_: any, record: Applicant) => record.applicantDetails?.place || 'N/A'
    },
    { 
      title: 'Applied Date', 
      dataIndex: 'submittedAt', 
      key: 'appliedDate',
      render: (text: string) => new Date(text).toLocaleDateString()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status || 'Pending'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Applicant) => (
        <Space>
          <Button onClick={() => handleViewDetails(record)}>View Details</Button>
          {record.status !== 'Hired' && (
            <>
              {record.status !== 'Shortlisted' && (
                <Popconfirm
                  title="Are you sure you want to shortlist this applicant?"
                  onConfirm={() => handleUpdateStatus(record._id, 'Shortlisted')}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Shortlist</Button>
                </Popconfirm>
              )}
              {record.status !== 'Rejected' && (
                <Popconfirm
                  title="Are you sure you want to reject this applicant?"
                  onConfirm={() => handleUpdateStatus(record._id, 'Rejected')}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Reject</Button>
                </Popconfirm>
              )}
            </>
          )}
          <Popconfirm
            title="Are you sure you want to delete this applicant?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
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
        <p><strong>Status:</strong> <Tag color={getStatusColor(selectedApplicant.status)}>{selectedApplicant.status || 'Pending'}</Tag></p>
        
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
      <Table columns={columns} dataSource={applicants} rowKey="_id" />
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

export default AppliedCandidates;