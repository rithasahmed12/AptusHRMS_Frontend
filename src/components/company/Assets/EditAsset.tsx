import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Upload, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditAsset: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the asset data from an API
    // This is just a mock example
    const mockAsset = {
      id: parseInt(id),
      name: 'Laptop XPS 15',
      type: 'Computer',
      status: 'In Use',
      assignedTo: 'John Doe',
      image: 'https://res.cloudinary.com/dumxl5c9x/image/upload/v1720171751/employee_profiles/ff2hn8te1brz2ir9zuco.png'
    };

    form.setFieldsValue(mockAsset);
    setImageUrl(mockAsset.image);
  }, [id, form]);

  const onFinish = (values: any) => {
    const updatedAsset = {
      ...values,
      id: parseInt(id),
      image: imageUrl,
    };
    console.log('Updated asset:', updatedAsset);
    message.success('Asset updated successfully');
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
      <h1 className="text-2xl font-bold mb-4">Edit Asset</h1>
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
          {imageUrl && <Image src={imageUrl} width={200} />}
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleImageUpload}
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Asset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAsset;