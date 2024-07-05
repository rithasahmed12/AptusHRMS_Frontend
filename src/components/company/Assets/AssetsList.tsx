import React, { useState } from 'react';
import { Table, Button, Space, Modal, Image } from 'antd';
import { EditOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface Asset {
  id: number;
  name: string;
  type: string;
  status: 'In Use' | 'Available' | 'Maintenance';
  assignedTo: string | null;
  image: string | null; // base64 string
}

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, name: 'Laptop XPS 15', type: 'Computer', status: 'In Use', assignedTo: 'John Doe', image: 'https://res.cloudinary.com/dumxl5c9x/image/upload/v1720171751/employee_profiles/ff2hn8te1brz2ir9zuco.png' },
    { id: 2, name: 'iPhone 13', type: 'Mobile', status: 'Available', assignedTo: null, image: null },
  ]);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const columns = [
    { 
      title: 'Image', 
      dataIndex: 'image', 
      key: 'image',
      render: (image: string | null) => image ? <Image src={image} width={50} /> : 'No image'
    },
    { title: 'Asset ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo' },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record: Asset) => (
        <Space size="middle">
          <Link to={`/c/assets/edit/${record.id}`}>
            <Button icon={<EditOutlined />}>Edit</Button>
          </Link>
          <Button icon={<SwapOutlined />} onClick={() => showRequestModal(record)}>Request</Button>
          <Button onClick={() => showAssignModal(record)}>Assign</Button>
        </Space>
      ),
    },
  ];

  const showRequestModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsRequestModalVisible(true);
  };

  const showAssignModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssignModalVisible(true);
  };

  const handleRequest = () => {
    // Handle asset request logic
    setIsRequestModalVisible(false);
  };

  const handleAssign = () => {
    // Handle asset assignment logic
    setIsAssignModalVisible(false);
  };

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Company Assets</h1>
      <Link to="/c/assets/add">
        <Button icon={<PlusOutlined />} className="mb-4">
          Add New Asset
        </Button>
      </Link>
      <Table columns={columns} dataSource={assets} rowKey="id" />


      <Modal
        title="Request Asset"
        visible={isRequestModalVisible}
        onOk={handleRequest}
        onCancel={() => setIsRequestModalVisible(false)}
      >
        <p>Are you sure you want to request {selectedAsset?.name}?</p>
      </Modal>

      <Modal
        title="Assign Asset"
        visible={isAssignModalVisible}
        onOk={handleAssign}
        onCancel={() => setIsAssignModalVisible(false)}
      >
        <p>Assign {selectedAsset?.name} to:</p>
        {/* Add a form or dropdown to select an employee */}
      </Modal>
    </div>
  );
};

export default AssetList;