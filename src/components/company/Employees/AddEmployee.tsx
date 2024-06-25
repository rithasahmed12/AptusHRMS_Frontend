import React, { useEffect, useState } from "react";
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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom for routing
import { getDepartment, getDesignations } from "../../../api/company";

const { Option } = Select;
const { TabPane } = Tabs;

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

const AddEmployee: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartment();
      setDepartments(response.data);
    } catch (error) {
      message.error("Data not fetched");
    }
  };

  const fetchDesignations = async () => {
    try {
      const response = await getDesignations();
      setDesignations(response.data);
    } catch (error) {
      message.error("Data not fetched");
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, []);

  const handleFileChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      // Get this url from response in real implementation
      setProfilePic(URL.createObjectURL(info.file.originFileObj));
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitted(true);
    try {
      const employeeData = { ...values, profilePic };
      message.success("Employee added successfully");
      navigate("/c/employees");
    } catch (error) {
      message.error("Failed to add employee");
    }
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
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
    if (currentTab === "3") {
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

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Button onClick={goBack}>Go Back</Button>
      </div>
      <h1>Add New Employee</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ marginRight: "20px", textAlign: "center" }}>
          <img
            src={profilePic || "https://via.placeholder.com/150"}
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
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ flex: 1 }}
          validateTrigger={isSubmitted ? ["onChange", "onBlur"] : []}>
          <Tabs activeKey={currentTab} onChange={handleTabChange}>
            <TabPane tab="Employee Info" key="1">
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
                    rules={[
                      { required: true, message: "Please select gender!" },
                    ]}
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
                    rules={[
                      { required: true, message: "Please input country!" },
                    ]}
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
              <Form.Item style={{ marginTop: "20px" }}>
                {renderButton()}
              </Form.Item>
            </TabPane>
            <TabPane tab="Contact Info" key="2">
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
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ marginTop: "20px" }}>
                {renderButton()}
              </Form.Item>
            </TabPane>
            <TabPane tab="Employment Info" key="3">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Hire Date"
                    name="hireDate"
                    rules={[
                      { required: true, message: "Please select hire date!" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Joining Date"
                    name="joiningDate"
                    rules={[
                      {
                        required: true,
                        message: "Please select joining date!",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Basic Salary"
                    name="basicSalary"
                    rules={[
                      { required: true, message: "Please input basic salary!" },
                    ]}
                  >
                    <Input prefix="₹" suffix="per month" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Employee Type"
                    name="employeeType"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee type!",
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
                    label="Department"
                    name="departmentId"
                    rules={[
                      {
                        required: true,
                        message: "Please select a department!",
                      },
                    ]}
                  >
                    <Select>
                      {departments.map((department) => (
                        <Option key={department._id} value={department._id}>
                          {department.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Designation"
                    name="designation"
                    rules={[
                      {
                        required: true,
                        message: "Please select a designation!",
                      },
                    ]}
                  >
                    <Select>
                      {designations.map((designation) => (
                        <Option key={designation._id} value={designation._id}>
                          {designation.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Employee ID"
                    name="employeeId"
                    rules={[
                      { required: true, message: "Please input employee ID!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                      { required: true, message: "Please input status!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                      { required: true, message: "Please select a role!" },
                    ]}
                  >
                    <Select>
                      <Option value="admin">Admin</Option>
                      <Option value="hr">HR</Option>
                      <Option value="se">SE</Option>
                      <Option value="me">ME</Option>
                      <Option value="je">JE</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Shift"
                    name="shift"
                    rules={[
                      { required: true, message: "Please select a shift!" },
                    ]}
                  >
                    <Select>
                      <Option value="morning">Morning</Option>
                      <Option value="afternoon">Afternoon</Option>
                      <Option value="night">Night</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ marginTop: "20px" }}>
                {renderButton()}
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
