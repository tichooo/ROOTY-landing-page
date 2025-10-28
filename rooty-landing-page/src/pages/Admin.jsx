import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

export default function Admin() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (you should change this!)
    const ADMIN_PASSWORD = 'rooty2025'; // ⚠️ CHANGEZ CE MOT DE PASSE !
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth', 'authenticated');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">🔒 Administration</h1>
              <p className="text-gray-600">Accès réservé aux administrateurs</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Entrez le mot de passe admin"
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" variant="accent" className="w-full">
                🔓 Se connecter
              </Button>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Note de sécurité :</strong> Changez le mot de passe par défaut dans le code !
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const loadStats = async () => {
    setLoading(true);
    try {
      const [usersRes, subsRes] = await Promise.all([
        fetch('/api/admin/export-users'),
        fetch('/api/admin/export-subscribers')
      ]);

      const usersData = await usersRes.json();
      const subsData = await subsRes.json();

      setStats({
        users: usersData.count || 0,
        subscribers: subsData.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
    setLoading(false);
  };

  const downloadUsers = () => {
    window.open('/api/admin/export-users', '_blank');
  };

  const downloadSubscribers = () => {
    window.open('/api/admin/export-subscribers', '_blank');
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">📊 Administration Rooty</h1>
          <Button variant="secondary" onClick={handleLogout}>
            🚪 Déconnexion
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Utilisateurs inscrits</p>
                <p className="text-4xl font-bold text-blue-600">
                  {stats ? stats.users : '-'}
                </p>
              </div>
              <div className="text-5xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Abonnés newsletter</p>
                <p className="text-4xl font-bold text-green-600">
                  {stats ? stats.subscribers : '-'}
                </p>
              </div>
              <div className="text-5xl">📧</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <Button variant="accent" onClick={loadStats} disabled={loading}>
            {loading ? 'Chargement...' : '🔄 Actualiser les stats'}
          </Button>
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">📥 Exporter les données</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-bold text-lg">Utilisateurs</h3>
                <p className="text-gray-600 text-sm">
                  Liste complète des utilisateurs inscrits (sans mots de passe)
                </p>
              </div>
              <Button variant="secondary" onClick={downloadUsers}>
                📥 Télécharger JSON
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-bold text-lg">Abonnés Newsletter</h3>
                <p className="text-gray-600 text-sm">
                  Liste des emails abonnés à la newsletter
                </p>
              </div>
              <Button variant="secondary" onClick={downloadSubscribers}>
                📥 Télécharger JSON
              </Button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">💡 Comment ouvrir dans Excel ?</h3>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>Téléchargez le fichier JSON</li>
              <li>Ouvrez Excel</li>
              <li>Onglet "Données" → "Obtenir des données" → "À partir d'un fichier" → "À partir de JSON"</li>
              <li>Sélectionnez le fichier téléchargé</li>
              <li>Cliquez sur "Transformer les données"</li>
              <li>Cliquez sur "Convertir en table"</li>
            </ol>
          </div>
        </div>

        {/* Database Info */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h3 className="font-bold text-green-800 mb-2">✅ Base de données : Vercel KV (Redis)</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✓ Données persistantes (ne se perdent jamais)</li>
            <li>✓ Gratuit jusqu'à 256 MB</li>
            <li>✓ 10,000 opérations/mois</li>
            <li>✓ Backups automatiques par Vercel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
