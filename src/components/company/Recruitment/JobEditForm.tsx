import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getJobDetails, updateJob } from '../../../api/company';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditJobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await getJobDetails(id);
      console.log('responseJob:',response);
      
      const jobData = response.data;
      form.setFieldsValue({
        title: jobData.title,
        description: jobData.description,
        requirements: jobData.requirements,
        status: jobData.status,
      });
      setDynamicFields(jobData.dynamicFields || []);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      message.error('Failed to fetch job details');
    }
  };

  const onFinish = async (values) => {
    try {
      const jobData = {
        ...values,
        dynamicFields: dynamicFields.map(field => ({
          name: field.name,
          type: field.type,
          required: field.required,
          fileTypes: field.fileTypes
        }))
      };
      await updateJob(id, jobData);
      message.success('Job updated successfully');
      navigate('/c/recruitment/jobs');
    } catch (error) {
      message.error('Failed to update job');
    }
  };

  const addDynamicField = () => {
    setDynamicFields([...dynamicFields, { name: '', type: 'text', required: false, fileTypes: [] }]);
  };

  const removeDynamicField = (index) => {
    const newFields = [...dynamicFields];
    newFields.splice(index, 1);
    setDynamicFields(newFields);
  };

  const updateDynamicField = (index, field) => {
    const newFields = [...dynamicFields];
    newFields[index] = { ...newFields[index], ...field };
    setDynamicFields(newFields);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Job Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Job Description" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="requirements" label="Requirements">
        <Form.List name="requirements">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[{ required: true, whitespace: true, message: "Please input the requirement or delete this field." }]}
                  >
                    <Input placeholder="Enter a requirement" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Requirement
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select>
          <Option value="Open">Open</Option>
          <Option value="Closed">Closed</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Dynamic Fields">
        {dynamicFields.map((field, index) => (
          <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Input
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => updateDynamicField(index, { name: e.target.value })}
            />
            <Select
              value={field.type}
              onChange={(value) => updateDynamicField(index, { type: value })}
            >
              <Option value="text">Text</Option>
              <Option value="number">Number</Option>
              <Option value="date">Date</Option>
              <Option value="file">File Upload</Option>
            </Select>
            {field.type === 'file' && (
              <Select
                mode="multiple"
                value={field.fileTypes}
                onChange={(value) => updateDynamicField(index, { fileTypes: value })}
                placeholder="Select file types"
              >
                <Option value="pdf">PDF</Option>
                <Option value="image">Image</Option>
                <Option value="doc">Word Document</Option>
              </Select>
            )}
            <Select
              value={field.required}
              onChange={(value) => updateDynamicField(index, { required: value })}
            >
              <Option value={true}>Required</Option>
              <Option value={false}>Optional</Option>
            </Select>
            <MinusCircleOutlined onClick={() => removeDynamicField(index)} />
          </Space>
        ))}
        <Button type="dashed" onClick={addDynamicField} block icon={<PlusOutlined />}>
          Add Dynamic Field
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Job
        </Button>
        <Button onClick={() => navigate('/c/recruitment/jobs')}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditJobForm;