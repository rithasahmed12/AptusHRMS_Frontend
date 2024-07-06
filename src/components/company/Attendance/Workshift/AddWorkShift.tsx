import React from 'react';
import { Form, Input, Button, Checkbox, TimePicker, InputNumber, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createWorkShift } from '../../../../api/company';

const AddWorkShift: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      // Convert TimePicker values to string
      const formattedValues = {
        ...values,
        shiftIn: values.shiftIn.format('HH:mm'),
        shiftOut: values.shiftOut.format('HH:mm'),
      };

      const response = await createWorkShift(formattedValues);
      
      if (response.status === 201 || response.status === 200) {
        message.success('Work shift added successfully');
        navigate('/c/workshift'); 
      } else {
        message.error('Failed to add work shift');
      }
    } catch (error) {
      console.error('Error adding work shift:', error);
      message.error('An error occurred while adding the work shift');
    }
  };

  const handleGoBack = ()=>{
    navigate(-1);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Work Shift</h1>
       
          <Button onClick={handleGoBack} type="primary">Go Back</Button>
      
      </div>
      <Form
        form={form}
        name="addWorkShift"
        onFinish={onFinish}
        layout="vertical"
        className="max-w-2xl mx-auto"
      >
        <Form.Item name="shiftName" label="Shift name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="workingDays" label="Working Days">
          <Checkbox.Group>
            <Checkbox value="Monday">Monday</Checkbox>
            <Checkbox value="Tuesday">Tuesday</Checkbox>
            <Checkbox value="Wednesday">Wednesday</Checkbox>
            <Checkbox value="Thursday">Thursday</Checkbox>
            <Checkbox value="Friday">Friday</Checkbox>
            <Checkbox value="Saturday">Saturday</Checkbox>
            <Checkbox value="Sunday">Sunday</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item name="shiftIn" label="Shift IN" rules={[{ required: true }]}>
          <TimePicker use12Hours format="h:mm A" className="w-full" />
        </Form.Item>

        <Form.Item name="shiftOut" label="Shift OUT" rules={[{ required: true }]}>
          <TimePicker use12Hours format="h:mm A" className="w-full" />
        </Form.Item>

        <Form.Item name="lateThreshold" label="Late Threshold(minutes)">
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item name="halfdayThreshold" label="Halfday Threshold(hours)">
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item name="shiftOutNextDay" valuePropName="checked">
          <Checkbox>Shift out next day</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddWorkShift;