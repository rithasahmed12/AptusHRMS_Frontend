import { Layout } from 'antd';
import PunchCard from './PunchCard';
import TodayAttendanceList from './TodayAttendanceList';

const { Content } = Layout;

const AttendancePage = () => {
  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <PunchCard />
        <TodayAttendanceList />
      </Content>
    </Layout>
  );
};

export default AttendancePage;