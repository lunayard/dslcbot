import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send } from 'lucide-react';
import { getWeekType, formatWeekType } from '../utils/weekType';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour 👋 Je suis ton assistant académique DSLC. Que veux-tu savoir aujourd\'hui ? Je peux vous renseigner sur l\'emploi du temps, les cours, votre année d\'études...',
    },
  ]);
  const [input, setInput] = useState('');

  const getAssistantResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    const currentWeekType = getWeekType();
    const weekInfo = formatWeekType(currentWeekType);

    if (lowerQuery.includes('emploi') || lowerQuery.includes('temps') || lowerQuery.includes('cours aujourd') || lowerQuery.includes('semaine')) {
      const yearMatch = location.pathname.match(/\/(l[123])\//);
      if (!yearMatch) {
        return `Cette semaine, nous sommes en ${weekInfo}. Pour voir votre emploi du temps, veuillez d'abord sélectionner votre année (L1, L2 ou L3), puis accédez à la section "Emploi du temps".`;
      }

      const year = yearMatch[1].toUpperCase();
      if (year === 'L3') {
        return `Cette semaine, nous sommes en ${weekInfo}. Pour la ${year}, veuillez préciser votre option : Description Linguistique, Didactique des Langues et Cultures, Didactique du Français, Sociolinguistique et Ethnolinguistique, ou Communication. Consultez la section "Emploi du temps" pour voir vos cours.`;
      }
      return `Cette semaine, nous sommes en ${weekInfo}. Consultez la section "Emploi du temps" pour voir les cours de ${year}.`;
    }

    if (lowerQuery.includes('l1') || lowerQuery.includes('licence 1')) {
      return 'Vous êtes en Licence 1. Utilisez le menu à gauche pour accéder aux UE/Cours, à l\'emploi du temps, aux conseils, et aux documents.';
    }

    if (lowerQuery.includes('l2') || lowerQuery.includes('licence 2')) {
      return 'Vous êtes en Licence 2. Utilisez le menu à gauche pour accéder aux UE/Cours, à l\'emploi du temps, aux conseils, et aux documents.';
    }

    if (lowerQuery.includes('l3') || lowerQuery.includes('licence 3')) {
      return 'Vous êtes en Licence 3. Cette année comprend 5 options : Description Linguistique, Didactique des Langues et Cultures, Didactique du Français, Sociolinguistique et Ethnolinguistique, et Communication. Consultez aussi la section "Débouchés & Stages" pour votre orientation professionnelle.';
    }

    if (lowerQuery.includes('option') && lowerQuery.includes('l3')) {
      return 'Les options disponibles en L3 sont : 1) Description Linguistique, 2) Didactique des Langues et Cultures, 3) Didactique du Français, 4) Sociolinguistique et Ethnolinguistique, 5) Communication. Consultez la section "Débouchés & Stages" pour plus d\'informations sur chaque option.';
    }

    if (lowerQuery.includes('cours') || lowerQuery.includes('ue')) {
      return 'Consultez la section "UE / Cours" dans le menu pour voir la liste complète des cours avec les codes, les enseignants et les volumes horaires.';
    }

    if (lowerQuery.includes('document') || lowerQuery.includes('ressource')) {
      return 'La section "Documents & Bibliothèque" contient toutes les ressources pédagogiques disponibles. Vous pouvez les télécharger directement.';
    }

    if (lowerQuery.includes('conseil') || lowerQuery.includes('aide') || lowerQuery.includes('organis')) {
      return 'Consultez la section "Conseils & Orientation" pour des recommandations sur l\'organisation, la méthodologie de travail et la réussite de vos études.';
    }

    return 'Je peux vous aider avec l\'emploi du temps, les UE, les options en L3, les documents, ou toute autre question sur votre parcours DSLC. N\'hésitez pas à être plus précis !';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const response = getAssistantResponse(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#006400] hover:bg-[#005000] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] bg-gray-800 border-2 border-[#006400] rounded-2xl shadow-2xl z-50 flex flex-col h-[500px]">
          <div className="bg-gradient-to-r from-[#006400] to-[#00A86B] p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <MessageCircle className="w-5 h-5 text-[#006400]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Assistant DSLC</h3>
                <p className="text-white text-xs opacity-90">En ligne</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-[#006400] text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none placeholder-gray-400"
              />
              <button
                onClick={handleSend}
                className="bg-[#006400] hover:bg-[#005000] text-white p-2 rounded-lg transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
