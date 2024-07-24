import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getJobDetails, updateJob } from '../../../api/company';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

interface DynamicField {
  name: string;
  type: 'text' | 'number' | 'date' | 'file';
  required: boolean;
  fileTypes?: string[];
}

interface JobData {
  title: string;
  description: string;
  requirements: string[];
  status: 'Open' | 'Closed';
  dynamicFields?: DynamicField[];
}

const EditJobForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<JobData>();
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);

  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    if (!id) return;

    try {
      const response = await getJobDetails(id);
      console.log('responseJob:', response);
      
      const jobData: JobData = response.data;
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

  const onFinish = async (values: JobData) => {
    if (!id) return;

    try {
      const jobData: JobData = {
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

  const removeDynamicField = (index: number) => {
    const newFields = [...dynamicFields];
    newFields.splice(index, 1);
    setDynamicFields(newFields);
  };

  const updateDynamicField = (index: number, field: Partial<DynamicField>) => {
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
              {fields.map((field,_index) => (
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
              onChange={(value: DynamicField['type']) => updateDynamicField(index, { type: value })}
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
                onChange={(value: string[]) => updateDynamicField(index, { fileTypes: value })}
                placeholder="Select file types"
              >
                <Option value="pdf">PDF</Option>
                <Option value="image">Image</Option>
                <Option value="doc">Word Document</Option>
              </Select>
            )}
            <Select
              value={field.required}
              onChange={(value: boolean) => updateDynamicField(index, { required: value })}
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