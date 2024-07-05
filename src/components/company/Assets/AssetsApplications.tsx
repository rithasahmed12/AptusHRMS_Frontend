import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag, Space } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { confirm } = Modal;

interface AssetApplication {
  id: number;
  employeeName: string;
  employeeId: string;
  assetType: string;
  assetName: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  applicationDate: string;
}

const AssetsApplication: React.FC = () => {
  const [applications, setApplications] = useState<AssetApplication[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<AssetApplication | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockApplications: AssetApplication[] = [
      {
        id: 1,
        employeeName: 'John Doe',
        employeeId: 'EMP001',
        assetType: 'Laptop',
        assetName: 'MacBook Pro',
        reason: 'Need for development work',
        status: 'Pending',
        applicationDate: '2024-07-01',
      },
      {
        id: 2,
        employeeName: 'Jane Smith',
        employeeId: 'EMP002',
        assetType: 'Mobile',
        assetName: 'iPhone 13',
        reason: 'For client communication',
        status: 'Approved',
        applicationDate: '2024-06-28',
      },
    ];
    setApplications(mockApplications);
  }, []);

  const columns = [
    { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName' },
    { title: 'Employee ID', dataIndex: 'employeeId', key: 'employeeId' },
    { title: 'Asset Type', dataIndex: 'assetType', key: 'assetType' },
    { title: 'Asset Name', dataIndex: 'assetName', key: 'assetName' },
    { title: 'Application Date', dataIndex: 'applicationDate', key: 'applicationDate' },
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
    {
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
    },
  ];

  const showConfirm = (action: 'approve' | 'reject', application: AssetApplication) => {
    confirm({
      title: `Do you want to ${action} this application?`,
      icon: <ExclamationCircleOutlined />,
      content: `${action.charAt(0).toUpperCase() + action.slice(1)}ing application for ${application.assetName} by ${application.employeeName}`,
      onOk() {
        handleStatusChange(application.id, action === 'approve' ? 'Approved' : 'Rejected');
      },
    });
  };

  const handleStatusChange = (id: number, newStatus: 'Approved' | 'Rejected') => {
    const updatedApplications = applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
    message.success(`Application ${newStatus.toLowerCase()} successfully`);
  };

  const showModal = (application: AssetApplication) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
    form.setFieldsValue(application);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Asset Applications</h1>
      <Table columns={columns} dataSource={applications} rowKey="id" />

      <Modal
        title="Application Details"
        visible={isModalVisible}
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
            <Form.Item name="assetType" label="Asset Type">
              <Input disabled />
            </Form.Item>
            <Form.Item name="assetName" label="Asset Name">
              <Input disabled />
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