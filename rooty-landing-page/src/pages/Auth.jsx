import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

export default function Auth() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Auto-hide message after 15 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 15000); // 15 secondes

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError(t('auth_email_invalid', 'Please enter a valid email address'));
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validate email
    if (!validateEmail(email)) {
      setEmailError(t('auth_email_invalid', 'Please enter a valid email address'));
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const response = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.ok) {
          setMessage({ type: 'success', text: t('auth_login_success', 'Login successful!') });
          // Store token and redirect
          localStorage.setItem('authToken', data.token);
          setTimeout(() => window.location.href = '/premium', 1500);
        } else {
          setMessage({ type: 'error', text: data.error || t('auth_login_error', 'Invalid credentials') });
        }
      } else {
        // Register logic
        const response = await fetch('http://localhost:4000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.ok) {
          setMessage({ 
            type: 'success', 
            text: t('auth_register_success', 'Account created! Please check your email to verify your account.') 
          });
          setEmail('');
          setPassword('');
        } else {
          setMessage({ type: 'error', text: data.error || t('auth_register_error', 'Registration failed') });
        }
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: t('auth_server_error', 'Unable to connect to server. Please try again later.') 
      });
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
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
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg transition-opacity duration-300 ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <p className="flex-1">{message.text}</p>
                <button
                  onClick={() => setMessage({ type: '', text: '' })}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Fermer le message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

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
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black/5 focus:border-black transition ${
                  emailError ? 'border-red-500' : ''
                }`}
                required
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth_password', 'Password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-12 rounded-lg border focus:ring-2 focus:ring-black/5 focus:border-black transition"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? t('auth_hide_password', 'Hide password') : t('auth_show_password', 'Show password')}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  {t('auth_password_hint', 'At least 6 characters')}
                </p>
              )}
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

            <Button type="submit" variant="accent" className="w-full" disabled={loading || !!emailError}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('auth_loading', 'Loading...')}
                </span>
              ) : (
                isLogin ? t('auth_login_button', 'Sign in') : t('auth_register_button', 'Create account')
              )}
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