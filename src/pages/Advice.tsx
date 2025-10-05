import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lightbulb, BookOpen, Clock, Target } from 'lucide-react';

interface AdviceItem {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface AdviceProps {
  yearLevel: string;
}

export default function Advice({ yearLevel }: AdviceProps) {
  const [advice, setAdvice] = useState<AdviceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const year = yearLevel.toUpperCase();

  useEffect(() => {
    fetchAdvice();
  }, [yearLevel]);

  const fetchAdvice = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('advice')
      .select('*')
      .or(`year_level.eq.${year},year_level.is.null`)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAdvice(data);
    }
    setLoading(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study':
        return BookOpen;
      case 'organization':
        return Clock;
      case 'methodology':
        return Target;
      default:
        return Lightbulb;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'study':
        return 'from-[#006400] to-[#00A86B]';
      case 'organization':
        return 'from-[#00A86B] to-[#006400]';
      case 'methodology':
        return 'from-[#004d00] to-[#006400]';
      default:
        return 'from-[#006400] to-[#005000]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#006400] p-3 rounded-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Conseils & Orientation</h1>
        </div>
        <p className="text-gray-600">
          Recommandations pour réussir vos études en {year}
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des conseils...</p>
        </div>
      ) : advice.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun conseil disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advice.map((item) => {
            const Icon = getCategoryIcon(item.category);
            const gradient = getCategoryColor(item.category);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-[#006400] bg-opacity-10 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-[#006400]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 flex-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
