import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Space, Typography, Row, Col, message } from 'antd';
import { ClockCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { checkIn, checkOut, getCurrentDayEmployeeAttendance, getEmployee } from '../../../../api/company';
import moment from 'moment';
import { setLastPunchTime, setPunchStatus } from '../../../../redux/slices/companySlice/attendanceSlice';

const { Title, Paragraph } = Typography;

const PunchCard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.companyInfo.companyInfo.id);
  const punchStatus = useSelector((state: any) => state.attendance.punchStatus);
  const lastPunchTime = useSelector((state: any) => state.attendance.lastPunchTime);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState<any>({
    checkInTime: null,
    checkOutTime: null,
    status: null,
  });

  useEffect(() => {
    fetchCurrentDayEmployeeAttendance();
    if (userId) {
      fetchEmployeeDetails();
    }
  }, [userId]);

  const fetchCurrentDayEmployeeAttendance = async () => {
    try {
      const response = await getCurrentDayEmployeeAttendance(userId);
      console.log('currentDay:',response);
      
      setAttendanceDetails(response);
      updatePunchStatus(response);
    } catch (error) {
      message.error('Failed to fetch attendance details');
    }
  };

  const updatePunchStatus = (details: any) => {
    if (details.checkInTime && !details.checkOutTime) {
      dispatch(setPunchStatus('in'));
      dispatch(setLastPunchTime(moment(details.checkInTime).format('HH:mm:ss')));
    } else if (details.checkOutTime) {
      dispatch(setPunchStatus('out'));
      dispatch(setLastPunchTime(moment(details.checkOutTime).format('HH:mm:ss')));
    } else {
      dispatch(setPunchStatus(null));
      dispatch(setLastPunchTime(null));
    }
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await getEmployee(userId);
      setCurrentUser(response.data.workShift);
    } catch (error) {
      message.error('Failed to get user\'s workshift');
    }
  };

  const canPunchIn = () => {
    if (!currentUser || attendanceDetails.status === 'absent') return false;
    
    const now = moment();
    const shiftStart = moment(currentUser.shiftIn, 'HH:mm');
    const shiftEnd = moment(currentUser.shiftOut, 'HH:mm');
    
    // Handle shifts that cross midnight
    if (shiftEnd.isBefore(shiftStart)) {
      shiftEnd.add(1, 'day');
    }
    
    const shiftDuration = moment.duration(shiftEnd.diff(shiftStart));
    const halfShiftDuration = shiftDuration.asMinutes() / 2;
    
    // Allow punch-in from 30 minutes before shift start
    const punchInWindowStart = shiftStart.clone().subtract(30, 'minutes');
    
    // Allow punch-in until half of the shift duration has passed
    const punchInWindowEnd = shiftStart.clone().add(halfShiftDuration, 'minutes');
    
    return now.isBetween(punchInWindowStart, punchInWindowEnd);
  };

  const handlePunch = async (type: 'in' | 'out') => {
    try {
      setLoading(true);
      const response = type === 'in' ? await checkIn(userId) : await checkOut(userId);
      
      const now = moment();
      const timeString = now.format('HH:mm:ss');
      
      dispatch(setPunchStatus(type));
      dispatch(setLastPunchTime(timeString));
      
      await fetchCurrentDayEmployeeAttendance();
      
      message.success(`Successfully checked ${type}`);
    } catch (error: any) {
      message.error(`Failed to check ${type}: ${error.response?.data?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Card title="Attendance Details"><Paragraph>Loading...</Paragraph></Card>;
  }

  return (
    <Card title="Attendance Details" style={{ marginBottom: 16 }}>
      {currentUser && (
        <>
          <Row gutter={[16, 16]} justify="center" align="middle">
            <Col>
              <Button 
                type={punchStatus === 'in' ? "primary" : "default"}
                shape="circle" 
                icon={<ClockCircleOutlined />} 
                onClick={() => handlePunch('in')}
                disabled={punchStatus === 'in' || !canPunchIn()}
                style={{ width: 80, height: 80, fontSize: 20 }}
              >
                IN
              </Button>
            </Col>
            <Col>
              <Button 
                type={punchStatus === 'out' ? "primary" : "default"}
                shape="circle" 
                icon={<CheckOutlined />} 
                onClick={() => handlePunch('out')}
                disabled={punchStatus !== 'in'}
                style={{ width: 80, height: 80, fontSize: 20 }}
              >
                OUT
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Paragraph>In Time: {attendanceDetails.checkInTime ? moment(attendanceDetails.checkInTime).format('HH:mm:ss') : '-'}</Paragraph>
              <Paragraph>Out Time: {attendanceDetails.checkOutTime ? moment(attendanceDetails.checkOutTime).format('HH:mm:ss') : '-'}</Paragraph>
            </Col>
            <Col span={12}>
              <Paragraph>Status: {attendanceDetails.status || '-'}</Paragraph>
              <Paragraph>Work Shift: {currentUser.shiftIn} - {currentUser.shiftOut}</Paragraph>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default PunchCard;