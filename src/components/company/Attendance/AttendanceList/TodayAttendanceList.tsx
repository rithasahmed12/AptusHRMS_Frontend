// components/TodayAttendanceList.tsx
import React, { useState, useEffect } from 'react';
import { Table, Card, message, Tooltip } from 'antd';
import { getTodayAttendance } from '../../../../api/company'
import moment from 'moment';
import { useSelector } from 'react-redux';

const TodayAttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastPunchTime = useSelector((state: any) => state.attendance.lastPunchTime);

  useEffect(() => {
    fetchTodayAttendance();
  }, [lastPunchTime]);

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
      key: '_id',
    },
    {
      title: 'Employee ID',
      dataIndex: ['employee', 'employeeId'],
      key: '_id',
    },
    {
      title: 'Check-In Time',
      dataIndex: 'checkIn',
      key: '_id',
      render: (checkIn:Date) => checkIn ? moment(checkIn).format('HH:mm:ss') : '-',
    },
    {
      title: 'Check-Out Time',
      dataIndex: 'checkOut',
      key: '_id',
      render: (checkOut:Date) => checkOut ? moment(checkOut).format('HH:mm:ss') : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: '_id',
    },
    {
      title: 'Work Shift',
      dataIndex: 'workShift',
      key: '_id',
      render: (workShift: any) => {
        if (!workShift) return '-';
        
        return (
          <div>
            <p><strong>{workShift.shiftName}</strong></p>
            <p>Shift Time: {workShift.shiftIn} - {workShift.shiftOut}</p>
          </div>
        );
      },
    },
    {
      title: 'Hours Worked',
      dataIndex: 'hoursWorked',
      key: '_id',
      render: (hoursWorked:number) => hoursWorked ? hoursWorked.toFixed(2) : '-',
    },
    {
      title: 'Late/Early',
      key: 'lateEarly',
      render: (text: string, record: any) => (
        <span>
          {record.lateArrivalMinutes > 0 && (
            <Tooltip title="Late Arrival">
              <span style={{ color: 'red', marginRight: '5px' }}>
                +{record.lateArrivalMinutes}m
              </span>
            </Tooltip>
          )}
          {record.earlyDepartureMinutes > 0 && (
            <Tooltip title="Early Departure">
              <span style={{ color: 'orange' }}>
                -{record.earlyDepartureMinutes}m
              </span>
            </Tooltip>
          )}
        </span>
      ),
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