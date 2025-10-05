import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getWeekType, formatWeekType } from '../utils/weekType';
import { Clock, Calendar } from 'lucide-react';

interface TimetableEntry {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  week_type: string;
  courses: {
    code: string;
    name: string;
    teacher: string | null;
    hours: number;
  } | null;
}

interface TimetableProps {
  yearLevel: string;
}

export default function Timetable({ yearLevel }: TimetableProps) {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const currentWeekType = getWeekType();

  const year = yearLevel.toUpperCase();
  const semesterOptions = year === 'L1' ? [1, 2] : year === 'L2' ? [3, 4] : [5, 6];

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const timeSlots = [
    { label: '07h-10h', start: '07h-10h', end: '10h-13h' },
    { label: '10h-13h', start: '10h-13h', end: '13h-16h' },
    { label: '13h-16h', start: '13h-16h', end: '16h-19h' },
    { label: '16h-19h', start: '16h-19h', end: '19h-22h' },
  ];

  useEffect(() => {
    fetchTimetable();
  }, [yearLevel, selectedSemester]);

  const fetchTimetable = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('timetable')
      .select(`
        *,
        courses (
          code,
          name,
          teacher,
          hours
        )
      `)
      .eq('year_level', year)
      .eq('semester', selectedSemester)
      .eq('week_type', currentWeekType);

    if (!error && data) {
      setTimetable(data);
    }
    setLoading(false);
  };

  const getClassForSlot = (day: string, timeSlot: string) => {
    return timetable.find(
      (entry) => entry.day === day && entry.start_time === timeSlot
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#006400] p-3 rounded-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Emploi du temps</h1>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#00A86B]" />
          <p className="text-lg font-medium text-[#006400]">
            {formatWeekType(currentWeekType)}
          </p>
        </div>

        <p className="text-gray-600">
          Horaires des cours pour {year}
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
          <p className="mt-4 text-gray-600">Chargement de l'emploi du temps...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#006400]">
                  <th className="px-4 py-3 text-left text-white font-semibold border border-gray-300">
                    Horaires
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="px-4 py-3 text-center text-white font-semibold border border-gray-300"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot.label} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700 border border-gray-300 bg-gray-50">
                      {slot.label}
                    </td>
                    {days.map((day) => {
                      const classEntry = getClassForSlot(day, slot.start);
                      return (
                        <td
                          key={`${day}-${slot.label}`}
                          className="px-4 py-3 border border-gray-300 text-center"
                        >
                          {classEntry && classEntry.courses ? (
                            <div className="text-sm">
                              <div className="font-semibold text-[#006400]">
                                {classEntry.courses.code}
                              </div>
                              <div className="text-gray-700 text-xs mt-1">
                                {classEntry.courses.name}
                              </div>
                              {classEntry.courses.teacher && (
                                <div className="text-gray-500 text-xs mt-1">
                                  {classEntry.courses.teacher}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      );
                    })}
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
