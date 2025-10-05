import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BookOpen } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  teacher: string | null;
  hours: number;
  semester: number;
  option: string | null;
}

interface CoursesProps {
  yearLevel: string;
}

export default function Courses({ yearLevel }: CoursesProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const year = yearLevel.toUpperCase();
  const semesterOptions = year === 'L1' ? [1, 2] : year === 'L2' ? [3, 4] : [5, 6];

  useEffect(() => {
    fetchCourses();
  }, [yearLevel, selectedSemester]);

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('year_level', year)
      .eq('semester', selectedSemester)
      .order('code');

    if (!error && data) {
      setCourses(data);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#006400] p-3 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">UE / Cours</h1>
        </div>
        <p className="text-gray-600">
          Constitution des Unités d'Enseignement pour {year}
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        {semesterOptions.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              selectedSemester === sem
                ? 'bg-[#006400] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Semestre {sem}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des cours...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun cours disponible pour ce semestre.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#006400] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Code</th>
                  <th className="px-6 py-4 text-left font-semibold">Nom du cours</th>
                  <th className="px-6 py-4 text-left font-semibold">Enseignant</th>
                  <th className="px-6 py-4 text-left font-semibold">Volume horaire</th>
                  {courses.some(c => c.option) && (
                    <th className="px-6 py-4 text-left font-semibold">Option</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-[#006400]">{course.code}</td>
                    <td className="px-6 py-4 text-gray-900">{course.name}</td>
                    <td className="px-6 py-4 text-gray-600">{course.teacher || 'Non assigné'}</td>
                    <td className="px-6 py-4 text-gray-600">{course.hours}h</td>
                    {courses.some(c => c.option) && (
                      <td className="px-6 py-4 text-gray-600">{course.option || '-'}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
