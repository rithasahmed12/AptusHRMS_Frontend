import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, DatePicker } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { LeaveType, getAllLeaveTypes, createLeaveType, updateLeaveType, deleteLeaveType, submitLeaveRequest, } from '../../../api/company';
import { useSelector } from 'react-redux';

const { RangePicker } = DatePicker;

const LeaveTypeList: React.FC = () => {
  const {companyInfo} = useSelector((state:any)=>state.companyInfo);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isApplyModalVisible, setIsApplyModalVisible] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState<LeaveType | null>(null);
  const [applyingLeaveType, setApplyingLeaveType] = useState<LeaveType | null>(null);
  const [form] = Form.useForm();
  const [applyForm] = Form.useForm();

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const response = await getAllLeaveTypes();
      if (response.status === 200) {
        setLeaveTypes(response.data);
      } else {
        message.error('Failed to fetch leave types');
      }
    } catch (error) {
      message.error('Failed to fetch leave types');
    }
  };

  const columns = [
    { title: 'Leave Type', dataIndex: 'name', key: 'name' },
    { title: 'Number of Days', dataIndex: 'numberOfDays', key: 'numberOfDays' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: LeaveType) => (
        <span className='flex gap-3 '>
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => showDeleteModal(record)} danger>
            Delete
          </Button>
          <Button onClick={() => showApplyModal(record)}>
            Apply
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

  const showApplyModal = (leaveType: LeaveType | null = null) => {
    setApplyingLeaveType(leaveType);
    applyForm.resetFields();
    setIsApplyModalVisible(true);
  };

  const handleAdd = async (values: any) => {
    try {
      const response = await createLeaveType(values);
      if (response.status === 201) {
        setIsAddModalVisible(false);
        message.success('Leave type added successfully');
        fetchLeaveTypes();
      } else {
        message.error('Failed to add leave type');
      }
    } catch (error) {
      message.error('Failed to add leave type');
    }
  };

  const handleEdit = async (values: any) => {
    if (editingLeaveType) {
      try {
        const response = await updateLeaveType(editingLeaveType._id, values);
        if (response.status === 200) {
          setIsEditModalVisible(false);
          message.success('Leave type updated successfully');
          fetchLeaveTypes();
        } else {
          message.error('Failed to update leave type');
        }
      } catch (error) {
        message.error('Failed to update leave type');
      }
    }
  };

  const handleDelete = async () => {
    if (editingLeaveType) {
      try {
        const response = await deleteLeaveType(editingLeaveType._id);
        if (response.status === 200) {
          setIsDeleteModalVisible(false);
          message.success('Leave type deleted successfully');
          fetchLeaveTypes();
        } else {
          message.error('Failed to delete leave type');
        }
      } catch (error) {
        message.error('Failed to delete leave type');
      }
    } 
  };

  const handleApply = async (values: any) => {
    try {
      console.log("values:",values);

      const body = {
        reason:values.reason,
        startDate:values.dateRange[0],
        endDate:values.dateRange[1],
        leaveTypeId: applyingLeaveType?._id || values.leaveTypeId,
        userId:companyInfo.id
      }
      
      await submitLeaveRequest(body);
     
      setIsApplyModalVisible(false);
      message.success('Leave application submitted successfully');
      
    } catch (error) {
      console.log("ERROR:",error);
      message.error('Failed to submit leave application');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Type</h1>
      <Button icon={<PlusOutlined />} onClick={showAddModal} className="mb-4 mr-2">
        Add Leave Type
      </Button>
      <Button onClick={() => showApplyModal()} className="mb-4">
        Apply for Leave
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

      <Modal
        title="Apply for Leave"
        visible={isApplyModalVisible}
        onCancel={() => setIsApplyModalVisible(false)}
        footer={null}
      >
        <Form form={applyForm} onFinish={handleApply} layout="vertical">
          {!applyingLeaveType && (
            <Form.Item name="leaveTypeId" label="Leave Type" rules={[{ required: true }]}>
              <Select>
                {leaveTypes.map(type => (
                  <Select.Option key={type._id} value={type._id}>{type.name}</Select.Option>
                ))}
                <Select.Option key='other' value='other'>Other</Select.Option>
              </Select>
            </Form.Item>
          )}
          <Form.Item name="dateRange" label="Leave Date Range" rules={[{ required: true }]}>
            <RangePicker className="w-full" />
          </Form.Item>
          <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeaveTypeList;