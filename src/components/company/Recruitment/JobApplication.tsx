import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Form, Input, DatePicker, InputNumber, Upload, Button, message, Row, Col, Typography, List, Divider, Descriptions } from 'antd';
import { UploadOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getJobDetails, submitApplication } from '../../../api/company';

const { Title, Paragraph } = Typography;

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState({});
  const [place, setPlace] = useState(null);

  useEffect(() => {
    fetchJobDetails();
    getUserLocation();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await getJobDetails(id);
      setJob(response.data);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      message.error('Failed to fetch job details');
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            setPlace(data.display_name);
          } catch (error) {
            console.error('Error getting place name:', error);
            setPlace(`${latitude}, ${longitude}`);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      
      // Append non-file fields
      Object.keys(values).forEach(key => {
        if (!fileList[key]) {
          formData.append(key, values[key]);
        }
      });
  
      // Append files
      Object.keys(fileList).forEach(key => {
        fileList[key].forEach(file => {
          formData.append(key, file.originFileObj);
        });
      });
  
      formData.append('jobId', id);
      
      if (place) {
        formData.append('place', place);
      }
  
      await submitApplication(formData);
      message.success('Application submitted successfully');
      form.resetFields();
      setFileList({});
    } catch (error) {
      console.error('Failed to submit application:', error);
      message.error('Failed to submit application');
    }
  };

  const handleFileChange = ({ file, fileList }, fieldName) => {
    setFileList(prev => ({
      ...prev,
      [fieldName]: fileList
    }));
  };

  if (!job) return <div>Loading...</div>;

  return (
    <Row gutter={24} style={{ padding: '24px' }}>
      <Col span={12}>
        <Card 
          hoverable
          style={{ height: '100%', overflow: 'auto' }}
        >
          <Title level={2}>{job.title}</Title>
          <Paragraph type="secondary">
            <ClockCircleOutlined /> Posted on: {new Date(job.createdAt).toLocaleDateString()}
          </Paragraph>
          <Divider />
          <Paragraph>{job.description}</Paragraph>
          <Divider />
          <Title level={4}>Requirements</Title>
          <List
            dataSource={job.requirements}
            renderItem={(item) => (
              <List.Item>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                {item}
              </List.Item>
            )}
          />
          <Divider />
          <Descriptions>
            <Descriptions.Item label="Status">
              <Button type={job.status === 'Open' ? 'primary' : 'default'}>
                {job.status}
              </Button>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col span={12}>
        <Card title={<Title level={3}>Application Form</Title>} style={{ height: '100%', overflow: 'auto' }}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            {job.dynamicFields.map((field, index) => {
              switch (field.type) {
                case 'number':
                  return (
                    <Form.Item key={index} name={field.name} label={field.name} rules={[{ required: field.required }]}>
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                  );
                case 'date':
                  return (
                    <Form.Item key={index} name={field.name} label={field.name} rules={[{ required: field.required }]}>
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  );
                case 'file':
                  return (
                    <Form.Item key={index} name={field.name} label={field.name} rules={[{ required: field.required }]}>
                      <Upload 
                        fileList={fileList[field.name] || []}
                        onChange={(info) => handleFileChange(info, field.name)}
                        beforeUpload={() => false}
                        accept={field.fileTypes.map(type => type === 'pdf' ? '.pdf' : type === 'image' ? 'image/*' : '.doc,.docx').join(',')}
                      >
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                      </Upload>
                    </Form.Item>
                  );
                default:
                  return (
                    <Form.Item key={index} name={field.name} label={field.name} rules={[{ required: field.required }]}>
                      <Input />
                    </Form.Item>
                  );
              }
            })}
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Submit Application
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default JobDetails;