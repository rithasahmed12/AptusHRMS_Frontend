import React, { useState, useEffect } from 'react';
import { Table, Button, Select, DatePicker, Form, message, Modal, Avatar, Typography } from 'antd';
import { getEmployees, getPayrollData } from '../../../api/company';
import { CloseCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const EmployeeInfo = ({ employee }) => (
  <div className="flex items-center">
    <Avatar 
      src={employee?.profilePic} 
      icon={<UserOutlined />} 
      size="large"
    />
    <div className="ml-3">
      <Text strong>{employee?.name || 'N/A'}</Text>
      <br />
      <Text type="secondary">
        {employee?.department || 'No Department'} - {employee?.designation || 'No Designation'}
      </Text>
    </div>
  </div>
);

const PayrollTable = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [employees,setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const fetchPayrollData = async (values = {}) => {
    setLoading(true);
    try {
      console.log("values:", values);
      
      const data = await getPayrollData(values);
      console.log('data:', data);
      
      setPayrollData(data);
    } catch (error:any) {
      console.log("FrontendERROR:",error);
      
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async()=>{
    setLoading(true);
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      message.error('Failed to fetch Data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPayrollData();
    fetchEmployees();
  }, []);

 
  
    const handleEmployeeChange = value => {
      setSelectedEmployee(value);
    };

    const columns = [
      {
        title: 'Employee',
        dataIndex: 'employeeId',
        key: 'employeeId',
        render: (employeeId) => <EmployeeInfo employee={employeeId} />,
      },
      {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
      },
      {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
      },
      {
        title: 'Total Salary',
        dataIndex: ['summary', 'totalSalary'],
        key: 'totalSalary',
        render: (salary) => `₹${salary.toFixed(2)}`,
      },
      {
        title: 'Working Days',
        dataIndex: ['summary', 'totalWorkingDays'],
        key: 'totalWorkingDays',
      },
      {
        title: 'Present Days',
        dataIndex: ['summary', 'totalPresentDays'],
        key: 'totalPresentDays',
      },
      {
        title: 'Absent Days',
        dataIndex: ['summary', 'totalAbsentDays'],
        key: 'totalAbsentDays',
      },
      {
        title: 'Leave Days',
        dataIndex: ['summary', 'totalLeaveDays'],
        key: 'totalLeaveDays',
      },
      {
        title: 'Holidays',
        dataIndex: ['summary', 'totalHolidays'],
        key: 'totalHolidays',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Button onClick={() => showAttendanceDetails(record)}>View Details</Button>
        ),
      },
    ];

  const showAttendanceDetails = (record) => {
    setSelectedEmployeeData(record);
    setDetailModalVisible(true);
  };

  const onFinish = (values) => {
    const params = {};
    if (values.month) {
      params.year = values.month.year();
      params.month = values.month.month() + 1;
    }
    if (values.employee) {
      params.employeeId = values.employee;
    }
    fetchPayrollData(params);
  };

  const detailColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => `₹${salary.toFixed(2)}`,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payroll</h1>
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        className="mb-4"
      >
        <Form.Item name="month">
          <DatePicker.MonthPicker style={{ width: 200 }} placeholder="Select Month" />
        </Form.Item>
        <Form.Item name="employee">
          <Select onChange={handleEmployeeChange} style={{ width: 200 }} placeholder="Select Employee">
            {selectedEmployee && <Option value="" style={{ color: 'red'}} ><CloseCircleOutlined/> Clear </Option>}
            {employees && employees.map((employee:{_id:string,name:string})=>(
              <Option key={employee._id} value={employee._id}>
                {employee.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table 
        columns={columns} 
        dataSource={payrollData} 
        scroll={{ x: true }} 
        loading={loading}
      />
      <Modal
        title={
          selectedEmployeeData && (
            <EmployeeInfo employee={selectedEmployeeData.employeeId} />
          )
        }
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedEmployeeData && (
          <Table
            columns={detailColumns}
            dataSource={selectedEmployeeData.attendanceTable}
            pagination={false}
          />
        )}
      </Modal>
    </div>
  );
};

export default PayrollTable;