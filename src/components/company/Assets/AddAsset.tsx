import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createAsset, getEmployees } from "../../../api/company";
import Title from "antd/es/typography/Title";

const AddAsset: React.FC = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees();
      if (response.status === 200) {
        console.log("response:", response);
        setEmployees(response.data);
      }
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch employees");
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      setLoading(true);
      const response = await createAsset(formData);
      if (response.status === 201) {
        message.success("Asset added successfully");
        navigate("/c/assets");
      } else {
        message.error("Failed to add asset");
      }
    } catch (error) {
      message.error("Failed to add asset");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6">
      <Spin spinning={loading}>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            justifyContent: "space-between",
            marginLeft: "1%",
            alignItems: "center",
          }}
        >
          <Title level={3}>Add Asset</Title>
          <Button onClick={goBack}>Go Back</Button>
        </div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Asset Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Asset Type"
            rules={[{ required: true }]}
          >
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
            <Select placeholder="Assign an employee">
              {employees.map((employee: any) => (
                <Option key={employee._id} value={employee._id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Asset Image">
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={handleImageUpload}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Asset
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default AddAsset;
