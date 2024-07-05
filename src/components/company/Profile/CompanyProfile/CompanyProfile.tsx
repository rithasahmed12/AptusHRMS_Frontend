import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, Button, Row, Col, Spin, message, Card, Typography } from "antd";
import { EditOutlined, LinkedinOutlined, WhatsAppOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getCompanyInfo } from "../../../../api/company";

const { Text, Title } = Typography;

interface Company {
  name?:string;
  description?:string;
  foundedDate?:Date
  industry?:string;
  logo?: string;
  email: string;
  phone?: string;
  website?: string;
  linkedinHandle?: string;
  whatsappNumber?: string;
}

const CompanyProfile: React.FC = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const response = await getCompanyInfo();
      setCompany(response.data);
    } catch (error) {
      message.error("Failed to fetch company data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/c/profile/${id}/company/edit`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const renderField = (label: string, value: any) => (
    <div style={{ marginBottom: "10px" }}>
      <Text strong>{label}: </Text>
      <Text>{value || "N/A"}</Text>
    </div>
  );

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

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="container">
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title level={3}>Company Profile</Title>
            <div>
              <Button
                style={{ marginRight: '8px' }}
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Edit Company
              </Button>
              <Button onClick={goBack}>Go Back</Button>
            </div>
          </div>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <img
              src={company.logo || "https://via.placeholder.com/150"}
              alt="Company Logo"
              style={{
                width: "100%",
                maxWidth: "140px",
                marginBottom: "10px",
              }}
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={4}>{company.name}</Title>
            {renderField("Industry", company.industry)}
            {renderField("Founded", dayjs(company.foundedDate).format("YYYY-MM-DD"))}
            <div style={{ marginTop: "10px" }}>
              <a 
                href={`https://www.linkedin.com/company/${company.linkedinHandle}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ marginRight: '15px', fontSize: '24px', color: '#0077B5' }}
              >
                <LinkedinOutlined />
              </a>
              <a 
                href={`https://wa.me/${company.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: '24px', color: '#25D366' }}
              >
                <WhatsAppOutlined />
              </a>
            </div>
          </Col>
        </Row>
  
        <Tabs
          defaultActiveKey="1"
          style={{ marginTop: "20px" }}
          items={[
            {
              key: "1",
              label: "Company Info",
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    {renderField("Description", company.description)}
                  </Col>
                  <Col span={12}>
                    {renderField("Website", company.website)}
                    {renderField("Email", company.email)}
                    {renderField("Phone", company.phone)}
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );  
};

export default CompanyProfile;