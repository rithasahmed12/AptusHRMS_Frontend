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
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { companyDataUpsert, getCompanyInfo } from "../../../../api/company";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyInfo } from "../../../../redux/slices/companySlice/companySlice";
import { toast } from "react-toastify";


const { TextArea } = Input;
const { Title } = Typography;

interface Company {
  _id: string;
  name: string;
  logo?: string;
  industry?: string;
  foundedDate?: Date | string;
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

function convertToDate(dayjsObject: any): Date | null {
  if (dayjsObject && dayjs.isDayjs(dayjsObject)) {
    return new Date(
      dayjsObject.year(),
      dayjsObject.month(),
      dayjsObject.date()
    );
  }
  return null;
}

const EditCompanyProfile: React.FC = () => {
  const {companyInfo} = useSelector((state:any) => state.companyInfo);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const response: any = await getCompanyInfo();
      console.log("response:", response);

      setCompany(response.data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPreviewUrl(response.data.logo);
      form.setFieldsValue({
        ...response.data,
        foundedDate: response.data.foundedDate
          ? dayjs(response.data.foundedDate)
          : null,
      });
    } catch (error) {
      message.error("Failed to fetch company data");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    
    if (file.size > 5 * 1024 * 1024) {
      message.error('File size must be less than 5MB');
      return;
    }
  
    const isImage = file.type.startsWith('image/');
    const isPngOrSvg = ['image/png', 'image/svg+xml'].includes(file.type);
  
    if (!isImage) {
      message.error('You can only upload image files');
      return;
    }
  
    if (!isPngOrSvg) {
      message.error('You can only upload PNG or SVG files');
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFileToUpload(file);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (company && company._id) {
        formData.append("_id", company._id);
      }

      Object.keys(values).forEach((key) => {
        if (key === "foundedDate") {
          const date = convertToDate(values[key]);
          formData.append(key, date ? date.toISOString() : "");
        } else if (key === "employeeCount") {
          formData.append(key, values[key].toString());
        } else {
          formData.append(key, values[key]);
        }
      });

      if (fileToUpload) {
        formData.append("logo", fileToUpload);
      }

      const response = await companyDataUpsert(formData);

        dispatch(setCompanyInfo({
          ...companyInfo,
          companyName:response.data.name,
          logo: response.data.logo
        }));
        message.success("Company profile updated successfully");
        navigate(`/c/profile/${id}/company`);
      
    } catch (error:any) {
      console.error("Error updating company:", error);
      toast.error(error.message);

    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
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

  return (
    <div className="container">
      <Spin spinning={loading}>
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title level={3}>Edit Company Profile</Title>
              <Button onClick={goBack}>Go Back</Button>
            </div>
          }
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
              <Col span={8}>
                <img
                  src={previewUrl || "https://via.placeholder.com/150"}
                  alt="Company Logo"
                  style={{
                    width: "100%",
                    maxWidth: "140px",
                    marginBottom: "10px",
                  }}
                />
                <Upload
                  name="logo"
                  listType="picture"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleFileChange({ file: { originFileObj: file } });
                    return false; // Prevent automatic upload
                  }}
                  accept=".png,.svg" // This limits the file picker to PNG and SVG files
                >
                  <Button icon={<UploadOutlined />}>Change Logo</Button>
                </Upload>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="name"
                  label="Company Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the company name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="industry" label="Industry">
                  <Input />
                </Form.Item>
                <Form.Item name="foundedDate" label="Founded Date">
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="description" label="Description">
              <TextArea rows={4} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input a valid email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="Phone">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="website" label="Website">
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="linkedinHandle" label="LinkedIn Handle">
                  <Input addonBefore="linkedin.com/company/" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="whatsappNumber" label="WhatsApp Number">
                  <Input addonBefore="+" />
                </Form.Item>
              </Col>
            </Row>

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
