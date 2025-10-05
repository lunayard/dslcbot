import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Target, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  option: string;
  type: string;
}

export default function Careers() {
  const [careers, setCareers] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('all');

  const options = [
    { value: 'all', label: 'Toutes les options' },
    { value: 'Description Linguistique', label: 'Description Linguistique' },
    { value: 'Didactique des Langues et Cultures', label: 'Didactique des Langues et Cultures' },
    { value: 'Didactique du Français', label: 'Didactique du Français' },
    { value: 'Sociolinguistique et Ethnolinguistique', label: 'Sociolinguistique et Ethnolinguistique' },
    { value: 'Communication', label: 'Communication' },
  ];

  useEffect(() => {
    fetchCareers();
  }, [selectedOption]);

  const fetchCareers = async () => {
    setLoading(true);
    let query = supabase.from('career_paths').select('*');

    if (selectedOption !== 'all') {
      query = query.eq('option', selectedOption);
    }

    const { data, error } = await query.order('type');

    if (!error && data) {
      setCareers(data);
    }
    setLoading(false);
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'formation_objective':
        return { icon: Target, label: 'Objectifs de formation', color: 'from-[#006400] to-[#00A86B]' };
      case 'career_profile':
        return { icon: GraduationCap, label: 'Profils de sortie', color: 'from-[#00A86B] to-[#006400]' };
      case 'professional_outlet':
        return { icon: Briefcase, label: 'Débouchés professionnels', color: 'from-[#004d00] to-[#006400]' };
      case 'internship':
        return { icon: TrendingUp, label: 'Stages et rapport de recherche', color: 'from-[#006400] to-[#005000]' };
      default:
        return { icon: Target, label: type, color: 'from-[#006400] to-[#00A86B]' };
    }
  };

  const groupedCareers = careers.reduce((acc, career) => {
    if (!acc[career.type]) {
      acc[career.type] = [];
    }
    acc[career.type].push(career);
    return acc;
  }, {} as Record<string, CareerPath[]>);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#006400] p-3 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Débouchés & Stages</h1>
        </div>
        <p className="text-gray-600">
          Opportunités professionnelles et parcours de spécialisation en L3
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrer par option
        </label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des débouchés...</p>
        </div>
      ) : careers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun débouché disponible pour cette option.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedCareers).map(([type, items]) => {
            const typeInfo = getTypeInfo(type);
            const Icon = typeInfo.icon;

            return (
              <div key={type}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`bg-gradient-to-r ${typeInfo.color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{typeInfo.label}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {items.map((career) => (
                    <div
                      key={career.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 flex-1">
                          {career.title}
                        </h3>
                        <span className="px-2 py-1 bg-[#00A86B] text-white text-xs font-medium rounded whitespace-nowrap ml-2">
                          {career.option}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {career.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
