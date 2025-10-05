import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Courses from './Courses';
import Timetable from './Timetable';
import Advice from './Advice';
import Documents from './Documents';

export default function Licence1() {
  return (
    <Layout yearLevel="l1">
      <Routes>
        <Route path="/" element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<Courses yearLevel="L1" />} />
        <Route path="timetable" element={<Timetable yearLevel="L1" />} />
        <Route path="advice" element={<Advice yearLevel="L1" />} />
        <Route path="documents" element={<Documents yearLevel="L1" />} />
      </Routes>
    </Layout>
  );
}
