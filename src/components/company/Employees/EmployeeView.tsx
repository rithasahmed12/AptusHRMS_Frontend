import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Tabs, 
  Button, 
  Row, 
  Col, 
  Spin, 
  message,
  Card,
  Typography 
} from "antd";
import { getEmployee } from "../../../api/company";
import dayjs from 'dayjs';
import { EditOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Text, Title } = Typography;

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
  departmentId?: { _id: string; name: string };
  designationId?: { _id: string; name: string };
  employeeId?: string;
  status?: string;
  role: string;
  shift?: string;
  profilePic?: string;
}

const EmployeeView: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await getEmployee(id!);
      setEmployee(response.data);
    } catch (error) {
      message.error("Failed to fetch employee data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/c/employees/edit/${id}`);
  };

  const renderField = (label: string, value: any) => (
    <div style={{ marginBottom: '10px' }}>
      <Text strong>{label}: </Text>
      <Text>{value || 'N/A'}</Text>
    </div>
  );

  if (loading) {
    return <Spin size="large" />;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="container">
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3}>Employee Details</Title>
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              Edit Employee
            </Button>
          </div>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <img
              src={employee.profilePic || "https://via.placeholder.com/150"}
              alt="Profile Pic"
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={4}>{employee.name}</Title>
            {renderField("Employee ID", employee.employeeId)}
            {renderField("Department", employee.departmentId?.name)}
            {renderField("Designation", employee.designationId?.name)}
          </Col>
        </Row>

        <Tabs defaultActiveKey="1" style={{ marginTop: '20px' }}>
          <TabPane tab="Personal Info" key="1">
            <Row gutter={16}>
              <Col span={12}>
                {renderField("Gender", employee.gender)}
                {renderField("Date of Birth", dayjs(employee.dob).format('YYYY-MM-DD'))}
                {renderField("Phone Number", employee.phone)}
                {renderField("Email", employee.email)}
              </Col>
              <Col span={12}>
                {renderField("Street Address", employee.streetAddress)}
                {renderField("City", employee.city)}
                {renderField("Country", employee.country)}
                {renderField("Postal Code", employee.postalCode)}
              </Col>
            </Row>
          </TabPane>
          
          <TabPane tab="Employment Info" key="2">
            <Row gutter={16}>
              <Col span={12}>
                {renderField("Hire Date", dayjs(employee.hireDate).format('YYYY-MM-DD'))}
                {renderField("Joining Date", dayjs(employee.joiningDate).format('YYYY-MM-DD'))}
                {renderField("Basic Salary", `$${employee.basicSalary?.toLocaleString()}`)}
                {renderField("Employee Type", employee.employeeType)}
              </Col>
              <Col span={12}>
                {renderField("Status", employee.status)}
                {renderField("Role", employee.role)}
                {renderField("Shift", employee.shift)}
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default EmployeeView;