import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, TimePicker, InputNumber, message, Spin } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editWorkShift, getWorkShift } from '../../../../api/company';
import moment from 'moment';

const EditWorkShift: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkShift = async () => {
      try {
        const response = await getWorkShift(id);
        if (response.status === 200) {
          const workShift = response.data;
          form.setFieldsValue({
            ...workShift,
            shiftIn: moment(workShift.shiftIn, 'HH:mm'),
            shiftOut: moment(workShift.shiftOut, 'HH:mm'),
          });
        } else {
          message.error('Failed to fetch work shift data');
        }
      } catch (error) {
        console.error('Error fetching work shift:', error);
        message.error('An error occurred while fetching the work shift');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkShift();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        shiftIn: values.shiftIn.format('HH:mm'),
        shiftOut: values.shiftOut.format('HH:mm'),
      };

      const response = await editWorkShift(id, formattedValues);
      
      if (response.status === 200) {
        message.success('Work shift updated successfully');
        navigate('/c/workshift');
      } else {
        message.error('Failed to update work shift');
      }
    } catch (error) {
      console.error('Error updating work shift:', error);
      message.error('An error occurred while updating the work shift');
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          width: "90%",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const handleGoBack = ()=>{
    navigate(-1);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Work Shift</h1>
        <Button onClick={handleGoBack} type="primary">Go Back</Button>
      </div>
      <Form
        form={form}
        name="editWorkShift"
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditWorkShift;