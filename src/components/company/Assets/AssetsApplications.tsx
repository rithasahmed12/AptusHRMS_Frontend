import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag, Space, Image } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getAllAssetApplications, updateAssetRequestStatus } from '../../../api/company'; // Update the import path as needed
import { useSelector } from 'react-redux';

const { Option } = Select;
const { confirm } = Modal;

interface AssetApplication {
  _id: string;
  userId: {
    _id: string;
    name: string;
    employeeId: string;
  };
  assetId: {
    _id: string;
    name: string;
    type: string;
    image: string;
  };
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

const AssetsApplication: React.FC = () => {
  const { companyInfo } = useSelector((state: any) => state.companyInfo);
  const isAdminOrHR = companyInfo.role === "admin" || companyInfo.role === "hr";

  const [applications, setApplications] = useState<AssetApplication[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<AssetApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getAllAssetApplications();
      setApplications(response.data);
    } catch (error) {
      message.error('Failed to fetch asset applications');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      title: 'Employee Name', 
      dataIndex: ['userId', 'name'], 
      key: 'employeeName',
    },
    { 
      title: 'Employee ID', 
      dataIndex: ['userId', 'employeeId'], 
      key: 'employeeId',
    },
    { 
      title: 'Asset',
      key: 'asset',
      render: (_text: string, record: AssetApplication) => (
        <Space>
          <Image
            src={record.assetId.image}
            alt={record.assetId.name}
            width={50}
            height={50}
            style={{ objectFit: 'cover' }}
          />
          <span>{`${record.assetId.type} - ${record.assetId.name}`}</span>
        </Space>
      ),
    },
    { 
      title: 'Application Date', 
      dataIndex: 'createdAt', 
      key: 'applicationDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Approved' ? 'green' : status === 'Rejected' ? 'red' : 'gold'}>
          {status}
        </Tag>
      ),
    },
    ...isAdminOrHR ? [{
      title: 'Action',
      key: 'action',
      render: (_: any, record: AssetApplication) => (
        <Space size="middle">
          <Button 
            icon={<CheckOutlined />} 
            type="primary"
            onClick={() => showConfirm('approve', record)}
            disabled={record.status !== 'Pending'}
          >
            Approve
          </Button>
          <Button 
            icon={<CloseOutlined />} 
            danger
            onClick={() => showConfirm('reject', record)}
            disabled={record.status !== 'Pending'}
          >
            Reject
          </Button>
          <Button onClick={() => showModal(record)}>View Details</Button>
        </Space>
      ),
    }]:[],
  ]

  const showConfirm = (action: 'approve' | 'reject', application: AssetApplication) => {
    confirm({
      title: `Do you want to ${action} this application?`,
      icon: <ExclamationCircleOutlined />,
      content: `${action.charAt(0).toUpperCase() + action.slice(1)}ing application for ${application.assetId.name} by ${application.userId.name}`,
      onOk() {
        handleStatusChange(application._id, action === 'approve' ? 'Approved' : 'Rejected');
      },
    });
  };

  const handleStatusChange = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    try {
      await updateAssetRequestStatus(id, newStatus);
      const updatedApplications = applications.map(app =>
        app._id === id ? { ...app, status: newStatus } : app
      );
      setApplications(updatedApplications);
      message.success(`Application ${newStatus.toLowerCase()} successfully`);
    } catch (error:any) {
      message.error(error.message);
    }
  };

  const showModal = (application: AssetApplication) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
    form.setFieldsValue({
      employeeName: application.userId.name,
      employeeId: application.userId.employeeId,
      assetType: application.assetId.type,
      assetName: application.assetId.name,
      reason: application.reason,
      applicationDate: new Date(application.createdAt).toLocaleDateString(),
      status: application.status,
    });
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Asset Applications</h1>
      <Table 
        columns={columns} 
        dataSource={applications} 
        rowKey="_id" 
        loading={loading}
      />

      <Modal
        title="Application Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedApplication && (
          <Form form={form} layout="vertical">
            <Form.Item name="employeeName" label="Employee Name">
              <Input disabled />
            </Form.Item>
            <Form.Item name="employeeId" label="Employee ID">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Asset">
              <Space>
                <Image
                  src={selectedApplication.assetId.image}
                  alt={selectedApplication.assetId.name}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                />
                <Input disabled value={`${selectedApplication.assetId.type} - ${selectedApplication.assetId.name}`} />
              </Space>
            </Form.Item>
            <Form.Item name="reason" label="Reason for Application">
              <Input.TextArea disabled />
            </Form.Item>
            <Form.Item name="applicationDate" label="Application Date">
              <Input disabled />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select disabled>
                <Option value="Pending">Pending</Option>
                <Option value="Approved">Approved</Option>
                <Option value="Rejected">Rejected</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AssetsApplication;