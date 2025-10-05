import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour 👋 Je suis ton assistant académique DSLC. Que veux-tu savoir aujourd\'hui ?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const responses = [
        'Je peux t\'aider avec les emplois du temps, les UE, ou toute autre question sur ton parcours.',
        'N\'hésite pas à consulter les différentes sections de la plateforme pour plus d\'informations.',
        'Pour des questions spécifiques sur un cours, consulte la section UE/Cours.',
        'Besoin d\'aide pour t\'organiser ? Consulte la section Conseils & Orientation.',
      ];
      const assistantMessage: Message = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
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
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col h-[500px]">
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

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-[#006400] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none"
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
