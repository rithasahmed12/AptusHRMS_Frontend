import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

interface LeaveApplication {
  id: number;
  employeeName: string;
  employeeID: string;
  leaveType: string;
  applyDate: string;
  leaveStartDate: string;
  leaveEndDate: string;
  status: 'Pending' | 'Approved' | 'Declined';
}

const LeaveApplicationList: React.FC = () => {
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([
    {
      id: 1,
      employeeName: 'Rithas Ahamed',
      employeeID: '#SL12121',
      leaveType: 'Casual Leave',
      applyDate: '12/02/2024',
      leaveStartDate: '12/02/2024',
      leaveEndDate: '13/02/2024',
      status: 'Pending',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingApplication, setEditingApplication] = useState<LeaveApplication | null>(null);
  const [form] = Form.useForm();

  const columns = [
    { title: 'No', dataIndex: 'id', key: 'id' },
    { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName' },
    { title: 'EmployeeID', dataIndex: 'employeeID', key: 'employeeID' },
    { title: 'Leave Type', dataIndex: 'leaveType', key: 'leaveType' },
    { title: 'Apply Date', dataIndex: 'applyDate', key: 'applyDate' },
    { title: 'Leave Start Date', dataIndex: 'leaveStartDate', key: 'leaveStartDate' },
    { title: 'Leave End Date', dataIndex: 'leaveEndDate', key: 'leaveEndDate' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'Approved' ? 'green' : status === 'Declined' ? 'red' : 'orange' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: LeaveApplication) => (
        <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
          Update
        </Button>
      ),
    },
  ];

  const showModal = (application: LeaveApplication | null = null) => {
    setEditingApplication(application);
    if (application) {
      form.setFieldsValue(application);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Application</h1>
    
      <Table columns={columns} dataSource={leaveApplications} rowKey="id" />

   
    </div>
  );
};

export default LeaveApplicationList;