import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, Button, Row, Col, Spin, message, Card, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text, Title } = Typography;

interface Company {
  _id: string;
  name: string;
  logo?: string;
  industry?: string;
  foundedDate?: Date;
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

const CompanyProfile: React.FC = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
                maxWidth: "200px",
                marginBottom: "10px",
              }}
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={4}>{company.name}</Title>
            {renderField("Industry", company.industry)}
            {renderField("Founded", dayjs(company.foundedDate).format("YYYY-MM-DD"))}
            {renderField("Employee Count", company.employeeCount)}
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
                    {renderField("Website", company.website)}
                    {renderField("Email", company.email)}
                    {renderField("Phone", company.phone)}
                  </Col>
                  <Col span={12}>
                    {renderField("Address", company.address)}
                    {renderField("City", company.city)}
                    {renderField("Country", company.country)}
                    {renderField("Postal Code", company.postalCode)}
                  </Col>
                </Row>
              ),
            },
            {
              key: "2",
              label: "Additional Info",
              children: (
                <Row gutter={16}>
                  <Col span={24}>
                    {renderField("Status", company.status)}
                    {/* Add more fields as needed */}
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