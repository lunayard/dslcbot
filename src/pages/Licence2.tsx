import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Courses from './Courses';
import Timetable from './Timetable';
import Advice from './Advice';
import Documents from './Documents';

export default function Licence2() {
  return (
    <Layout yearLevel="l2">
      <Routes>
        <Route path="/" element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<Courses yearLevel="L2" />} />
        <Route path="timetable" element={<Timetable yearLevel="L2" />} />
        <Route path="advice" element={<Advice yearLevel="L2" />} />
        <Route path="documents" element={<Documents yearLevel="L2" />} />
      </Routes>
    </Layout>
  );
}
