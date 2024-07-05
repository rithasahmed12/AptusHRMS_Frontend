import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Tabs,
  Form,
  Input,
  Select,
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
import {
  getEmployee,
  getDepartment,
  getDesignations,
  updateEmployee,
} from "../../../../api/company";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyInfo } from "../../../../redux/slices/companySlice/companySlice";


const { Option } = Select;
const {Text,Title} = Typography

interface Employee {
  _id: string;
  name?: string;
  gender?: string;
  dob?: Date;
  streetAddress?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email: string;
  hireDate?: Date;
  joiningDate?: Date;
  basicSalary?: number;
  employeeType?: string;
  departmentId?: string;
  designationId?: string;
  employeeId?: string;
  status?: string;
  role: string;
  shift?: string;
  profilePic?: string;
}

interface Designation {
  _id: string;
  name: string;
  departmentId: string;
}

interface Department {
  _id: string;
  name: string;
  head: string;
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

const EditUserProfile: React.FC = () => {
  const {companyInfo} = useSelector((state:any) => state.companyInfo);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);

  useEffect(() => {
    fetchEmployee();
    fetchDepartments();
    fetchDesignations();
  }, [id]);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await getEmployee(id!);
      setEmployee(response.data);
      setPreviewUrl(response.data.profilePic);
      form.setFieldsValue({
        ...response.data,
        dob: response.data.dob ? dayjs(response.data.dob) : null,
        hireDate: response.data.hireDate ? dayjs(response.data.hireDate) : null,
        joiningDate: response.data.joiningDate
          ? dayjs(response.data.joiningDate)
          : null,
      });
    } catch (error) {
      message.error("Failed to fetch employee data");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartment();
      setDepartments(response.data);
    } catch (error) {
      message.error("Failed to fetch departments");
    }
  };

  const fetchDesignations = async () => {
    try {
      const response = await getDesignations();
      setDesignations(response.data);
    } catch (error) {
      message.error("Failed to fetch designations");
    }
  };

  const isImageFile = (file: File) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    return file && acceptedImageTypes.includes(file.type);
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file && isImageFile(file)) {
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
  
      // Store the file for later upload
      setFileToUpload(file);
    }else{
      message.error('upload image files only');
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
  
      // Append all form fields to formData
      Object.keys(values).forEach(key => {
        if (key === 'dob' || key === 'hireDate' || key === 'joiningDate') {
          const date = convertToDate(values[key]);
          formData.append(key, date ? date.toISOString() : '');
        } else if (key === 'basicSalary') {
          formData.append(key, values[key].toString());
        } else if (key === 'departmentId' || key === 'designationId') {
          formData.append(key, values[key]?._id || values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });
  
      // Append the file if a new one was selected
      if (fileToUpload) {
        formData.append('file', fileToUpload);
      }
  
      console.log('FormData content:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const response = await updateEmployee(id!, formData);
      console.log(response);
      dispatch(setCompanyInfo({
        ...companyInfo,
        profilePic: response.data.profilePic
      }));
      message.success("Profile updated successfully");
      navigate(`/c/profile/${id}/user`);
    } catch (error) {
      console.error("Error updating employee:", error);
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const nextTab = () => {
    const nextTabKey = (parseInt(currentTab) + 1).toString();
    setCurrentTab(nextTabKey);
  };

  const prevTab = () => {
    const prevTabKey = (parseInt(currentTab) - 1).toString();
    setCurrentTab(prevTabKey);
  };

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  const renderButton = () => {
    if (currentTab === "2") {
      return (
        <Button
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then(() => {
                form.submit();
              })
              .catch((error) => {
                console.log("Validation failed:", error);
              });
          }}
        >
          Submit
        </Button>
      );
    } else {
      return (
        <Button type="primary" onClick={nextTab}>
          Next
        </Button>
      );
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Employee Info",
      children: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the employee's name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select placeholder="Select Gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Please select date of birth!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Street Address"
                name="streetAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input street address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please input city!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please input country!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[
                  { required: true, message: "Please input postal code!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ marginTop: "20px" }}>{renderButton()}</Form.Item>
        </>
      ),
    },
    {
      key: "2",
      label: "Contact Info",
      children: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Please input phone number!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input email!" }]}
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ marginTop: "20px" }}>{renderButton()}</Form.Item>
        </>
      ),
    }
  ];

  // ... (rest of the component code, including tabItems, renderButton, etc., similar to AddEmployee)

  return (
    <div className="container">
        <Spin spinning={loading}>
        <Card
        title={
        <div style={{ display: "flex",justifyContent:'space-between', alignItems:'center' }}>
          <Title level={3}>Edit Employee</Title>
          <Button onClick={goBack}>
            Go Back
          </Button>
          </div>
        }
        >
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ marginRight: "20px", textAlign: "center" }}>
              <img
                src={previewUrl || "https://via.placeholder.com/150"}
                alt="Profile Pic"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
              />

              <Upload
                name="profilePic"
                listType="picture"
                showUploadList={false}
                beforeUpload={(file) => {
                  handleFileChange({ file: { originFileObj: file } });
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <Form
              style={{ flex: 1 }}
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Tabs
                activeKey={currentTab}
                onChange={handleTabChange}
                items={tabItems}
              />
            </Form>
          </div>
      </Card>
      </Spin>
    </div>
  );
};

export default EditUserProfile;
