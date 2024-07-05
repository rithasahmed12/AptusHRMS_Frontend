import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddAsset: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFinish = (values: any) => {
    const newAsset = {
      ...values,
      id: Date.now(), // This should be generated on the server in a real application
      image: imageUrl,
    };
    console.log('New asset:', newAsset);
    message.success('Asset added successfully');
    navigate('/c/assets');
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url: string) => {
        setImageUrl(url);
      });
    }
  };

  const getBase64 = (img: Blob, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Asset</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Asset Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Asset Type" rules={[{ required: true }]}>
          <Select>
            <Option value="Computer">Computer</Option>
            <Option value="Mobile">Mobile</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Option value="Available">Available</Option>
            <Option value="In Use">In Use</Option>
            <Option value="Maintenance">Maintenance</Option>
          </Select>
        </Form.Item>
        <Form.Item name="assignedTo" label="Assigned To">
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Asset Image">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleImageUpload}
          >
            {imageUrl ? <img src={imageUrl} alt="asset" style={{ width: '100%' }} /> : <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAsset;