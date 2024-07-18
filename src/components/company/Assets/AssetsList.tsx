// AssetList.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Image, message ,Select} from 'antd';
import { EditOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Asset, getAllAssets, assignAsset, requestAsset, getEmployees } from '../../../api/company';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AssetList: React.FC = () => {
  const {companyInfo} = useSelector((state:any)=> state.companyInfo);
  const isAdminOrHR = companyInfo.role === "admin" || companyInfo.role === "hr";

  const { Option } = Select;
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [employees, setEmployees] = useState<[]>([]);
  const [assignedTo, setAssignedTo] = useState<string>('');

  useEffect(() => {
    fetchAssets();
    fetchEmployees();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await getAllAssets();
      if (response.status === 200) {
        console.log('response:',response.data);
        
        setAssets(response.data);
      } else {
        message.error('Failed to fetch assets');
      }
    } catch (error) {
      message.error('Failed to fetch assets');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      if(response.status ===  200){
        console.log('response:', response);
        setEmployees(response.data);
      }
    } catch (error) {
      message.error("Failed to fetch employees");
    }
  };

  const columns = [
    { 
      title: 'Image', 
      dataIndex: 'image', 
      key: 'image',
      render: (image: string | null) => image ? <Image src={image} width={50} /> : 'No image'
    },
    { title: 'Asset ID', dataIndex: 'assetId', key: 'assetId' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { 
      title: 'Assigned To', 
      dataIndex: ['assignedTo', 'name'], 
      key: 'assignedTo',
      render: (name: string, record: Asset) => record.assignedTo?.name || 'Not Assigned'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record: Asset) => (
        <Space size="middle">
          {isAdminOrHR ?
          <>
          <Link to={`/c/assets/edit/${record._id}`}>
            <Button icon={<EditOutlined />}>Edit</Button>
          </Link>
          <Button onClick={() => showAssignModal(record)}>Assign</Button>
          </> : 
          <>
          <Button icon={<SwapOutlined />} onClick={() => showRequestModal(record)}>Request</Button>
          </>
          }
          
          
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

  const handleRequest = async () => {
    if (selectedAsset) {
      try {
        const response = await requestAsset(selectedAsset._id, companyInfo.id); // You'll need to have currentUserId available
        if (response.status === 200) {
          message.success('Asset requested successfully');
          fetchAssets();
        } else {
          message.error('Failed to request asset');
        }
      } catch (error) {
        message.error('Failed to request asset');
      }
    }
    setIsRequestModalVisible(false);
  };


  const handleAssign = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedAsset && assignedTo) {
      try {
        const response = await assignAsset(selectedAsset._id, assignedTo);
        if (response.status === 200) {
          message.success('Asset assigned successfully');
          fetchAssets();
        } else {
          message.error('Failed to assign asset');
        }
      } catch (error:any) {
        toast.error(error.message);
      }
    }
    setIsAssignModalVisible(false);
  };

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Company Assets</h1>
    {isAdminOrHR &&
      <Link to="/c/assets/add">
        <Button icon={<PlusOutlined />} className="mb-4">
          Add New Asset
        </Button>
      </Link>
    }
      <Table columns={columns} dataSource={assets} rowKey="id" />


      <Modal
        title="Request Asset"
        open={isRequestModalVisible}
        onOk={handleRequest}
        onCancel={() => setIsRequestModalVisible(false)}
      >
        <p>Are you sure you want to request {selectedAsset?.name}?</p>
      </Modal>

      <Modal
    title="Assign Asset"
    open={isAssignModalVisible}
    onOk={handleAssign}
    onCancel={() => setIsAssignModalVisible(false)}
  >
    <p>Assign {selectedAsset?.name} to:</p>
    <Select
      style={{ width: '100%' }}
      placeholder="Select an employee"
      onChange={(value: string) => setAssignedTo(value)}
    >
      {employees.map((employee:any) => (
        <Option key={employee._id} value={employee._id}>{employee.name}</Option>
      ))}
    </Select>
  </Modal>
    </div>
  );
};

export default AssetList;