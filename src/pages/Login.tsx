import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf } from 'lucide-react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [yearLevel, setYearLevel] = useState('L1');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSignUp) {
      if (password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        setLoading(false);
        return;
      }

      const { error } = await signUp(email, password, fullName, yearLevel);

      if (error) {
        setError('Erreur lors de l\'inscription. Cet email est peut-être déjà utilisé.');
        setLoading(false);
      } else {
        navigate('/dashboard');
      }
    } else {
      const { error } = await signIn(email, password);

      if (error) {
        setError('Email ou mot de passe incorrect');
        setLoading(false);
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 100, 0, 0.1) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 100, 0, 0.1) 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      <style>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 100, 0, 0.5), 0 0 40px rgba(0, 168, 107, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 100, 0, 0.8), 0 0 60px rgba(0, 168, 107, 0.5);
          }
        }
      `}</style>

      <div className="max-w-md w-full relative z-10">
        <div
          className="bg-gray-900 border-4 border-[#006400] rounded-2xl p-8 shadow-2xl"
          style={{
            animation: 'borderGlow 3s ease-in-out infinite'
          }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-[#006400] to-[#00A86B] p-4 rounded-full shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Bienvenue sur DSLC Assistant
          </h1>
          <p className="text-center text-gray-300 mb-6 text-sm">
            Département des Sciences du Langage et de la Communication
          </p>

          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition text-white"
                  placeholder="Votre nom complet"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition text-white"
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition text-white"
                placeholder="••••••••"
              />
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="yearLevel" className="block text-sm font-medium text-gray-300 mb-2">
                  Niveau d'études
                </label>
                <select
                  id="yearLevel"
                  value={yearLevel}
                  onChange={(e) => setYearLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition text-white"
                >
                  <option value="L1">Licence 1</option>
                  <option value="L2">Licence 2</option>
                  <option value="L3">Licence 3</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#006400] to-[#00A86B] hover:from-[#005000] hover:to-[#008858] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (isSignUp ? 'Inscription...' : 'Connexion...') : (isSignUp ? 'S\'inscrire' : 'Se connecter')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-[#00A86B] hover:text-[#006400] font-medium transition"
            >
              {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              Plateforme universitaire UAC - FLAC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
