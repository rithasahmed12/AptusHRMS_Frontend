import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Upload,
  message,
  Row,
  Col,
  Spin,
  Typography,
  Card
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Title } = Typography;

interface Company {
  _id: string;
  name: string;
  logo?: string;
  industry?: string;
  foundedDate?: Date|string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email: string;
  website?: string;
  employeeCount?: number;
  status?: string;
}

const EditCompanyProfile: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dummyCompanyData = {
    _id: "comp123456",
    name: "TechInnovate Solutions",
    logo: "https://via.placeholder.com/150",
    industry: "Information Technology",
    foundedDate: "2010-03-15",
    description: "TechInnovate Solutions is a leading provider of cutting-edge software solutions, specializing in artificial intelligence, cloud computing, and cybersecurity. Our mission is to empower businesses with innovative technology to drive growth and efficiency in the digital age.",
    address: "123 Tech Avenue",
    city: "San Francisco",
    country: "United States",
    postalCode: "94105",
    phone: "+1 (555) 123-4567",
    email: "info@techinnovate.com",
    website: "https://www.techinnovate.com",
    employeeCount: 250,
    status: "Active",
    socialMedia: {
      linkedin: "https://www.linkedin.com/company/techinnovate-solutions",
      twitter: "https://twitter.com/TechInnovateSol",
      facebook: "https://www.facebook.com/TechInnovateSolutions",
    },
    keyProducts: [
      "AI-Driven Analytics Platform",
      "CloudSecure Suite",
      "InnovateCRM",
    ],
    annualRevenue: "$50 million",
    ceo: "Jane Smith",
    headquartersLocation: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    subsidiaries: [
      "TechInnovate Cloud Services",
      "InnovateSec Cybersecurity",
    ],
    stockSymbol: "TECH",
    fundingRounds: [
      { date: "2010-06-01", amount: "$5 million", type: "Seed" },
      { date: "2012-08-15", amount: "$20 million", type: "Series A" },
      { date: "2015-11-30", amount: "$50 million", type: "Series B" },
    ],
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    setLoading(true);
    try {
      // Replace this with your actual API call
    //   const response = await fetch(`/api/company/${id}`);
    //   const data = await response.json();
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompany(dummyCompanyData);
      setPreviewUrl(dummyCompanyData.logo);
      form.setFieldsValue({
        ...dummyCompanyData,
        foundedDate: dummyCompanyData.foundedDate ? dayjs(dummyCompanyData.foundedDate) : null,
      });
    } catch (error) {
      message.error("Failed to fetch company data");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileToUpload(file);
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.keys(values).forEach(key => {
        if (key === 'foundedDate') {
          const date = values[key] ? new Date(values[key]) : null;
          formData.append(key, date ? date.toISOString() : '');
        } else if (key === 'employeeCount') {
          formData.append(key, values[key].toString());
        } else {
          formData.append(key, values[key]);
        }
      });

      if (fileToUpload) {
        formData.append('logo', fileToUpload);
      }

      // Replace this with your actual API call
      const response = await fetch(`/api/company/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        message.success("Company profile updated successfully");
        navigate(`/company/${id}`);
      } else {
        throw new Error("Failed to update company profile");
      }
    } catch (error) {
      console.error("Error updating company:", error);
      message.error("Failed to update company profile");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        width: '90%'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container">
      <Spin spinning={loading}>
        <Card
          title={
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={3}>Edit Company Profile</Title>
              <Button onClick={goBack}>Go Back</Button>
            </div>
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={8}>
                <img
                  src={previewUrl || "https://via.placeholder.com/150"}
                  alt="Company Logo"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    marginBottom: "10px",
                  }}
                />
                <Upload
                  name="logo"
                  listType="picture"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleFileChange({ file: { originFileObj: file } });
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Change Logo</Button>
                </Upload>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="name"
                  label="Company Name"
                  rules={[{ required: true, message: 'Please input the company name!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="industry"
                  label="Industry"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="foundedDate"
                  label="Founded Date"
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  name="employeeCount"
                  label="Number of Employees"
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea rows={4} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="website"
              label="Website"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
            >
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="city"
                  label="City"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="country"
                  label="Country"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="postalCode"
                  label="Postal Code"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="status"
              label="Status"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Company Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};

export default EditCompanyProfile;