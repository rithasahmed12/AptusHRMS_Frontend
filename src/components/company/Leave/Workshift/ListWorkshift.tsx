import React from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface WorkShift {
  key: number;
  name: string;
  time: string;
  duration: string;
  workingDays: string;
}

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Working Days',
    dataIndex: 'workingDays',
    key: 'workingDays',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: WorkShift) => (
      <span>
        <Link to={`/edit/${record.key}`}>
          <Button type="link">Edit</Button>
        </Link>
        <Button type="link" danger>Delete</Button>
      </span>
    ),
  },
];

const data: WorkShift[] = [
  {
    key: 1,
    name: 'Morning Shift',
    time: '9:00am - 6:00pm',
    duration: '9hr',
    workingDays: 'Mo,Tu,We,Th,Fr,Sa',
  },
];

const ListWorkshift: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Work Shift</h1>
        <Link to="/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add new Shift
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ListWorkshift;