import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getAllWorkShifts, deleteWorkShift } from '../../../../api/company';
import moment from 'moment';

interface WorkShift {
  key: string;
  shiftName: string;
  time: string;
  duration: string;
  workingDays: string;
}

const ListWorkshift: React.FC = () => {
  const [data, setData] = useState<WorkShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [workShiftToDelete, setWorkShiftToDelete] = useState<string | null>(null);

  const fetchWorkShifts = async () => {
    try {
      const response = await getAllWorkShifts();
      if (response.status === 200) {
        const formattedData = response.data.map((shift: any) => ({
          key: shift._id,
          shiftName: shift.shiftName,
          time: `${moment(shift.shiftIn, 'HH:mm').format('h:mm A')} - ${moment(shift.shiftOut, 'HH:mm').format('h:mm A')}`,
          duration: calculateDuration(shift.shiftIn, shift.shiftOut),
          workingDays: shift.workingDays.join(', '),
        }));
        setData(formattedData);
      } else {
        message.error('Failed to fetch work shifts');
      }
    } catch (error) {
      console.error('Error fetching work shifts:', error);
      message.error('Failed to fetch data. Check your network connection');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkShifts();
  }, []);

  const calculateDuration = (shiftIn: string, shiftOut: string) => {
    const start = moment(shiftIn, 'HH:mm');
    const end = moment(shiftOut, 'HH:mm');
    if (end.isBefore(start)) {
      end.add(1, 'day');
    }
    const duration = moment.duration(end.diff(start));
    return `${duration.hours()}h ${duration.minutes()}m`;
  };

  const showDeleteModal = (id: string) => {
    setWorkShiftToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setWorkShiftToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (workShiftToDelete) {
      try {
        const response = await deleteWorkShift(workShiftToDelete);
        if (response.status === 200) {
          message.success('Work shift deleted successfully');
          fetchWorkShifts(); // Refresh the list after deletion
        } else {
          message.error('Failed to delete work shift');
        }
      } catch (error) {
        console.error('Error deleting work shift:', error);
        message.error('An error occurred while deleting the work shift');
      } finally {
        setIsDeleteModalVisible(false);
        setWorkShiftToDelete(null);
      }
    }
  };

  const columns = [
    {
      title: 'No',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'shiftName',
      key: 'shiftName',
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
          <Link to={`/c/workshift/edit/${record.key}`}>
            <Button type="link">Edit</Button>
          </Link>
          <Button type="link" danger onClick={() => showDeleteModal(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Work Shift</h1>
        <Link to="/c/workshift/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add new Shift
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
      <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this work shift?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ListWorkshift;