import React, { useState, useEffect } from 'react';
import { Table, Button, Select, DatePicker, Form } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

const PayrollTable = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch payroll data here
    // For now, we'll use mock data
    const mockData = [
      {
        key: '1',
        employeeId: '#SN1212',
        name: 'Rithas Ahamed',
        designation: 'Demo Officer',
        department: 'Information Technology',
        grossSalary: 50000,
        attendanceDeduction: 1200,
        creditDeduction: 0,
        savingsDeduction: 5000,
        savingsClaim: 0,
        bonus: 5000,
        allowances: 10000,
        dueDate: '3/13/2023',
        totalGrossSalary: 58800,
        status: 'Due',
      },
      {
        key: '2',
        employeeId: '#MN234',
        name: 'Rithas Ahamed',
        designation: 'Demo Officer',
        department: 'Information Technology',
        grossSalary: 50000,
        attendanceDeduction: 1200,
        creditDeduction: 0,
        savingsDeduction: 5000,
        savingsClaim: 0,
        bonus: 5000,
        allowances: 10000,
        dueDate: '3/14/2023',
        totalGrossSalary: 58800,
        status: 'Not Due',
      },
    ];
    setPayrollData(mockData);
  }, []);

  const columns = [
    {
      title: 'EmployeeID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div className="text-xs text-gray-500">{record.designation}</div>
          <div className="text-xs text-gray-500">{record.department}</div>
        </div>
      ),
    },
    {
      title: 'Gross Salary',
      dataIndex: 'grossSalary',
      key: 'grossSalary',
    },
    {
      title: 'Attendance Deduction',
      dataIndex: 'attendanceDeduction',
      key: 'attendanceDeduction',
    },
    {
      title: 'Credit Deduction',
      dataIndex: 'creditDeduction',
      key: 'creditDeduction',
    },
    {
      title: 'Savings Deduction',
      dataIndex: 'savingsDeduction',
      key: 'savingsDeduction',
    },
    {
      title: 'Savings Claim',
      dataIndex: 'savingsClaim',
      key: 'savingsClaim',
    },
    {
      title: 'Bonus',
      dataIndex: 'bonus',
      key: 'bonus',
    },
    {
      title: 'Allowances',
      dataIndex: 'allowances',
      key: 'allowances',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Gross Salary',
      dataIndex: 'totalGrossSalary',
      key: 'totalGrossSalary',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            className="mr-2"
            onClick={() => handleApprove(record)}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => handleDecline(record)}
          >
            Decline
          </Button>
        </span>
      ),
    },
  ];

  const handleApprove = (record) => {
    console.log('Approved:', record);
    // Implement approval logic here
  };

  const handleDecline = (record) => {
    console.log('Declined:', record);
    // Implement decline logic here
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Implement form submission logic here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payroll</h1>
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        className="mb-4"
      >
        <Form.Item name="department" className="mb-2">
          <Select style={{ width: 200 }} placeholder="Select Department">
            <Option value="it">Information Technology</Option>
            {/* Add more departments as needed */}
          </Select>
        </Form.Item>
        <Form.Item name="designation" className="mb-2">
          <Select style={{ width: 200 }} placeholder="Select Designation">
            <Option value="officer">Demo Officer</Option>
            {/* Add more designations as needed */}
          </Select>
        </Form.Item>
        <Form.Item name="month" className="mb-2">
          <DatePicker.MonthPicker style={{ width: 200 }} placeholder="Select Month" />
        </Form.Item>
        <Form.Item name="employee" className="mb-2">
          <Select style={{ width: 200 }} placeholder="Select Employee">
            <Option value="1">Rithas Ahamed</Option>
            {/* Add more employees as needed */}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={payrollData} scroll={{ x: true }} />
    </div>
  );
};

export default PayrollTable;