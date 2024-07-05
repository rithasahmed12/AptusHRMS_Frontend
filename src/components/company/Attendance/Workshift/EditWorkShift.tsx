import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, TimePicker, InputNumber } from 'antd';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

const EditWorkShift: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Fetch work shift data based on id and set form values
    // This is a mock example
    form.setFieldsValue({
      shiftName: 'Morning Shift',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shiftIn: moment('09:00', 'HH:mm'),
      shiftOut: moment('18:00', 'HH:mm'),
      lateThreshold: 15,
      halfdayThreshold: 4,
      shiftOutNextDay: false,
    });
  }, [id, form]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Work Shift</h1>
        <Link to="/">
          <Button type="primary">Go Back</Button>
        </Link>
      </div>
      <Form
        form={form}
        name="editWorkShift"
        onFinish={onFinish}
        layout="vertical"
        className="max-w-2xl mx-auto"
      >
        {/* Form fields are the same as in AddWorkShift */}
        {/* ... */}

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