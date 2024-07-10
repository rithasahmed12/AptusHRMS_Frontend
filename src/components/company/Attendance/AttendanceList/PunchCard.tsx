import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Space, Typography, Row, Col, message } from 'antd';
import { ClockCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { checkIn, checkOut, getEmployee } from '../../../../api/company';

const { Title, Paragraph } = Typography;

const PunchCard = () => {
  const userId = useSelector((state: any) => state.companyInfo.companyInfo.id);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [punchStatus, setPunchStatus] = useState<'in'|'out'|null>(null);
  const [loading, setLoading] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState({
    inTime: '',
    outTime: '',
    hoursWorked: '',
    nextPunchTime: ''
  });

  useEffect(() => {
    if (userId) {
      fetchEmployeeDetails();
    }
  }, [userId]);

  const fetchEmployeeDetails = async() => {
     try {
      const response = await getEmployee(userId);
      console.log('Fetch Response:',response);
      
      setCurrentUser(response.data.workShift);
     } catch (error) {
      message.error('failed to get users workshift')
     }
  };


  const handlePunch = async (type: 'in' | 'out') => {
    try {
      setLoading(true);
      const response = type === 'in' ? await checkIn(userId) : await checkOut(userId);
      console.log("punch response:",response);
      
      
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      
      if (type === 'in') {
        setAttendanceDetails(prev => ({ ...prev, inTime: timeString }));
        setPunchStatus('in');
      } else {
        setAttendanceDetails(prev => ({ 
          ...prev, 
          outTime: timeString,
          hoursWorked: response.hoursWorked || 'N/A'
        }));
        setPunchStatus('out');
      }
      
      message.success(`Successfully checked ${type}`);
    } catch (error:any) {
      message.error(`Failed to check ${type}: ${error.response.data.message}`);
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
                disabled={punchStatus === 'in'}
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