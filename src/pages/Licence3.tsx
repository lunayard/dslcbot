import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Courses from './Courses';
import Timetable from './Timetable';
import Advice from './Advice';
import Documents from './Documents';
import Careers from './Careers';

export default function Licence3() {
  return (
    <Layout yearLevel="l3">
      <Routes>
        <Route path="/" element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<Courses yearLevel="L3" />} />
        <Route path="timetable" element={<Timetable yearLevel="L3" />} />
        <Route path="advice" element={<Advice yearLevel="L3" />} />
        <Route path="documents" element={<Documents yearLevel="L3" />} />
        <Route path="careers" element={<Careers />} />
      </Routes>
    </Layout>
  );
}
