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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployee,
  getDepartment,
  getDesignations,
  updateEmployee,
  getAllWorkShifts,
} from "../../../api/company";
import Title from "antd/es/typography/Title";

const { Option } = Select;

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

interface WorkShift {
  _id:string;
  shiftName:string;
  shiftIn:string;
  shiftOut:string
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

const EditEmployee: React.FC = () => {
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
  const [workShifts, setWorkShifts] = useState<WorkShift[]>([]);
  const [allowances, setAllowances] = useState<{ name: string; amount: number }[]>([]);

  useEffect(() => {
    fetchEmployee();
    fetchDepartments();
    fetchDesignations();
    fetchWorkShift();
  }, [id]);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await getEmployee(id!);
      setEmployee(response.data);
      setPreviewUrl(response.data.profilePic);
      setAllowances(response.data.allowances || []); // Set allowances from fetched data
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

  // Add these functions to handle allowances
  const handleRemoveAllowance = (index: number) => {
    const newAllowances = allowances.filter((_, i) => i !== index);
    setAllowances(newAllowances);
  };

  const handleAddAllowance = () => {
    setAllowances([...allowances, { name: '', amount: 0 }]);
  };

  const handleAllowanceChange = (index: number, field: 'name' | 'amount', value: string | number) => {
    const newAllowances = [...allowances];
    newAllowances[index][field] = value as never;
    setAllowances(newAllowances);
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

  const fetchWorkShift = async () => {
    try {
      const response = await getAllWorkShifts();
      setWorkShifts(response.data);
    } catch (error) {
      message.error("Could not get shifts");
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
      message.error('please upload image files only')
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
        } else if (key === 'departmentId' || key === 'designationId' || key === 'workShift') {
          formData.append(key, values[key]?._id || values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });
  
      // Append allowances
      formData.append('allowances', JSON.stringify(allowances));
  
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
      message.success("Employee updated successfully");
      navigate("/c/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      message.error("Failed to update employee");
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
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ marginTop: "20px" }}>{renderButton()}</Form.Item>
        </>
      ),
    },
    {
      key: "3",
      label: "Employment Info",
      children: (
        <>
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
                    message: "Please select employee type!",
                  },
                ]}
              >
                <Select placeholder="Select Employee Type">
                  <Option value="full-time">Full-time</Option>
                  <Option value="part-time">Part-time</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="intern">Intern</Option>
                </Select>
              </Form.Item>
            </Col>
            <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Allowances">
                {allowances.map((allowance, index) => (
                  <Row key={index} gutter={8} style={{ marginBottom: 8 }}>
                    <Col span={10}>
                      <Input
                        placeholder="Allowance Name"
                        value={allowance.name}
                        onChange={(e) => handleAllowanceChange(index, 'name', e.target.value)}
                      />
                    </Col>
                    <Col span={10}>
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={allowance.amount}
                        onChange={(e) => handleAllowanceChange(index, 'amount', parseFloat(e.target.value))}
                      />
                    </Col>
                    <Col span={4}>
                      <Button onClick={() => handleRemoveAllowance(index)} danger>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button onClick={handleAddAllowance} type="dashed" block>
                  Add Allowance
                </Button>
              </Form.Item>
            </Col>
          </Row>
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
                name="designationId"
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
                rules={[{ required: true, message: "Please select status!" }]}
              >
                <Select placeholder="Select Status">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="terminated">Terminated</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select placeholder="Select Role">
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
  name="workShift"
  rules={[{ required: false, message: "Please select a shift!" }]}
>
  <Select>
    {workShifts.map((shift) => (
      <Option key={shift._id} value={shift._id}>
        {shift.shiftName} <span className="text-gray-400">({shift.shiftIn} - {shift.shiftOut})</span>
      </Option>
    ))}
  </Select>
</Form.Item>

            </Col>
          </Row>
          <Form.Item style={{ marginTop: "20px" }}>{renderButton()}</Form.Item>
        </>
      ),
    },
  ];

  // ... (rest of the component code, including tabItems, renderButton, etc., similar to AddEmployee)

  return (
    <div>
      <Spin spinning={loading}>
        <div className="container">
        <div style={{ display: "flex", marginBottom: "20px",justifyContent:'space-between', marginLeft:'1%', alignItems:'center' }}>
          <Title level={3}>Edit Employee</Title>
          <Button onClick={goBack}>
            Go Back
          </Button>
          </div>
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
        </div>
      </Spin>
    </div>
  );
};

export default EditEmployee;
