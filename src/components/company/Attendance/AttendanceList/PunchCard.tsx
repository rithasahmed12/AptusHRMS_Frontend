import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Space, Typography, Row, Col, message } from 'antd';
import { ClockCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { checkIn, checkOut, getEmployee } from '../../../../api/company';
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
  const [attendanceDetails, setAttendanceDetails] = useState({
    inTime: '',
    outTime: '',
    hoursWorked: '',
  });

  useEffect(() => {
    if (userId) {
      fetchEmployeeDetails();
    }
  }, [userId]);

  useEffect(() => {
    if (lastPunchTime) {
      setAttendanceDetails(prev => ({
        ...prev,
        [punchStatus === 'in' ? 'inTime' : 'outTime']: lastPunchTime,
      }));
    }
  }, [lastPunchTime, punchStatus]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await getEmployee(userId);
      setCurrentUser(response.data.workShift);
    } catch (error) {
      message.error('Failed to get user\'s workshift');
    }
  };

  const canPunchIn = () => {
    if (!currentUser) return false;
    const now = moment();
    const shiftStart = moment(currentUser.shiftIn, 'HH:mm');
    return now.isBetween(shiftStart.clone().subtract(30, 'minutes'), shiftStart.clone().add(30, 'minutes'));
  };

  const handlePunch = async (type: 'in' | 'out') => {
    try {
      setLoading(true);
      const response = type === 'in' ? await checkIn(userId) : await checkOut(userId);
      
      const now = moment();
      const timeString = now.format('HH:mm:ss');
      
      dispatch(setPunchStatus(type));
      dispatch(setLastPunchTime(timeString));
      
      if (type === 'out') {
        setAttendanceDetails(prev => ({ 
          ...prev, 
          hoursWorked: response.hoursWorked || 'N/A'
        }));
      }
      
      message.success(`Successfully checked ${type}`);
    } catch (error:any) {
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
              <Paragraph>In Time: {attendanceDetails.inTime || '-'}</Paragraph>
              <Paragraph>Out Time: {attendanceDetails.outTime || '-'}</Paragraph>
            </Col>
            <Col span={12}>
              <Paragraph>Hours Worked: {attendanceDetails.hoursWorked || '-'}</Paragraph>
              <Paragraph>Work Shift: {currentUser.shiftIn} - {currentUser.shiftOut}</Paragraph>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default PunchCard;