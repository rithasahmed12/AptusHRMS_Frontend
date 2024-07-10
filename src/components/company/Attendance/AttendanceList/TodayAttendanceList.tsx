// components/TodayAttendanceList.tsx
import React, { useState, useEffect } from 'react';
import { Table, Card, message } from 'antd';
import { getTodayAttendance } from '../../../../api/company'
import moment from 'moment';

const TodayAttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      setLoading(true);
      const data = await getTodayAttendance();
      setAttendanceList(data);
    } catch (error) {
      message.error('Failed to fetch today\'s attendance');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: ['employee', 'name'],
      key: 'name',
    },
    {
      title: 'Employee ID',
      dataIndex: ['employee', 'employeeId'],
      key: 'employeeId',
    },
    {
      title: 'Check-In Time',
      dataIndex: 'checkIn',
      key: 'checkIn',
      render: (checkIn:Date) => checkIn ? moment(checkIn).format('HH:mm:ss') : '-',
    },
    {
      title: 'Check-Out Time',
      dataIndex: 'checkOut',
      key: 'checkOut',
      render: (checkOut:Date) => checkOut ? moment(checkOut).format('HH:mm:ss') : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Work Shift',
      dataIndex: ['workShift', 'name'],
      key: 'workShift',
    },
    {
      title: 'Hours Worked',
      dataIndex: 'hoursWorked',
      key: 'hoursWorked',
      render: (hoursWorked:number) => hoursWorked ? hoursWorked.toFixed(2) : '-',
    },
  ];

  return (
    <Card title="Today's Attendance">
      <Table
        dataSource={attendanceList}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />
    </Card>
  );
};

export default TodayAttendanceList;