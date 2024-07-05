import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

interface LeaveType {
  id: number;
  name: string;
  numberOfDays: number;
  status: 'Active' | 'Inactive';
}

const LeaveTypeList: React.FC = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { id: 1, name: 'Casual Leave', numberOfDays: 21, status: 'Active' },
  ]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState<LeaveType | null>(null);
  const [form] = Form.useForm();

  const columns = [
    { title: 'No', dataIndex: 'id', key: 'id' },
    { title: 'Leave Type', dataIndex: 'name', key: 'name' },
    { title: 'Number of Days', dataIndex: 'numberOfDays', key: 'numberOfDays' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: LeaveType) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => showDeleteModal(record)} danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const showAddModal = () => {
    form.resetFields();
    setIsAddModalVisible(true);
  };

  const showEditModal = (leaveType: LeaveType) => {
    setEditingLeaveType(leaveType);
    form.setFieldsValue(leaveType);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (leaveType: LeaveType) => {
    setEditingLeaveType(leaveType);
    setIsDeleteModalVisible(true);
  };

  const handleAdd = (values: any) => {
    const newLeaveType: LeaveType = {
      id: leaveTypes.length + 1,
      name: values.name,
      numberOfDays: values.numberOfDays,
      status: values.status,
    };
    setLeaveTypes([...leaveTypes, newLeaveType]);
    setIsAddModalVisible(false);
    message.success('Leave type added successfully');
  };

  const handleEdit = (values: any) => {
    if (editingLeaveType) {
      const updatedLeaveTypes = leaveTypes.map(leaveType =>
        leaveType.id === editingLeaveType.id
          ? { ...leaveType, ...values }
          : leaveType
      );
      setLeaveTypes(updatedLeaveTypes);
      setIsEditModalVisible(false);
      message.success('Leave type updated successfully');
    }
  };

  const handleDelete = () => {
    if (editingLeaveType) {
      const updatedLeaveTypes = leaveTypes.filter(leaveType => leaveType.id !== editingLeaveType.id);
      setLeaveTypes(updatedLeaveTypes);
      setIsDeleteModalVisible(false);
      message.success('Leave type deleted successfully');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Type</h1>
      <Button icon={<PlusOutlined />} onClick={showAddModal} className="mb-4">
        Add Leave
      </Button>
      <Table columns={columns} dataSource={leaveTypes} rowKey="id" />

      <Modal
        title="Add Leave Type"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item name="name" label="Leave Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="numberOfDays" label="Number of days" rules={[{ required: true }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Leave Type"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEdit} layout="vertical">
          <Form.Item name="name" label="Leave Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="numberOfDays" label="Number of days" rules={[{ required: true }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Leave Type"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this leave type?</p>
      </Modal>
    </div>
  );
};

export default LeaveTypeList;