import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const years = [
    {
      level: 'L1',
      title: 'Licence 1',
      description: 'Première année - Fondamentaux',
      icon: BookOpen,
      gradient: 'from-[#006400] to-[#00A86B]',
    },
    {
      level: 'L2',
      title: 'Licence 2',
      description: 'Deuxième année - Approfondissement',
      icon: GraduationCap,
      gradient: 'from-[#00A86B] to-[#006400]',
    },
    {
      level: 'L3',
      title: 'Licence 3',
      description: 'Troisième année - Spécialisation',
      icon: Sparkles,
      gradient: 'from-[#006400] to-[#004d00]',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choisissez votre année
          </h1>
          <p className="text-lg text-gray-300">
            Sélectionnez votre niveau d'études pour accéder à votre contenu personnalisé
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {years.map((year) => {
            const Icon = year.icon;
            return (
              <div
                key={year.level}
                onClick={() => navigate(`/${year.level.toLowerCase()}`)}
                className="group cursor-pointer"
              >
                <div className="bg-gray-800 border-2 border-[#006400] rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#006400]/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className={`h-32 bg-gradient-to-br ${year.gradient} flex items-center justify-center`}>
                    <Icon className="w-16 h-16 text-white" />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {year.title}
                    </h2>
                    <p className="text-gray-300 mb-4">
                      {year.description}
                    </p>

                    <div className="flex items-center text-[#00A86B] font-semibold group-hover:translate-x-2 transition-transform">
                      Accéder
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
