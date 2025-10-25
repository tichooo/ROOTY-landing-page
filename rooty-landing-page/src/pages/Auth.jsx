import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

export default function Auth() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Form submitted:', { email, password, isLogin });
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? t('auth_login_title', 'Welcome Back') : t('auth_register_title', 'Create Account')}
          </h1>
          <p className="text-gray-600">
            {isLogin ? t('auth_login_subtitle', 'Sign in to your account') : t('auth_register_subtitle', 'Join the Rooty community')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <div className="flex gap-4 mb-8">
            <button
              className={`flex-1 py-2 px-4 text-center rounded-full font-medium transition-all ${
                isLogin ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsLogin(true)}
            >
              {t('auth_login_tab', 'Login')}
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center rounded-full font-medium transition-all ${
                !isLogin ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsLogin(false)}
            >
              {t('auth_register_tab', 'Register')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth_email', 'Email')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black/5 focus:border-black transition"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth_password', 'Password')}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black/5 focus:border-black transition"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-600">
                    {t('auth_remember', 'Remember me')}
                  </label>
                </div>
                <a href="#forgot" className="text-[var(--color-primary)] hover:underline">
                  {t('auth_forgot', 'Forgot password?')}
                </a>
              </div>
            )}

            <Button type="submit" variant="accent" className="w-full">
              {isLogin ? t('auth_login_button', 'Sign in') : t('auth_register_button', 'Create account')}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            {isLogin ? (
              <p>
                {t('auth_no_account', "Don't have an account?")}{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  {t('auth_register_link', 'Register here')}
                </button>
              </p>
            ) : (
              <p>
                {t('auth_has_account', 'Already have an account?')}{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  {t('auth_login_link', 'Sign in here')}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}