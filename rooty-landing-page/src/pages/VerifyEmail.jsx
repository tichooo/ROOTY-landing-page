import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';
import API_BASE_URL from '../config/api';

export default function VerifyEmail() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage(t('verify_no_token', 'No verification token provided'));
      return;
    }

    // Verify the email
    fetch(`${API_BASE_URL}/api/auth/verify-email?token=${token}`)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          setStatus('success');
          setMessage(t('verify_success', 'Your email has been verified successfully!'));
        } else {
          setStatus('error');
          setMessage(data.error || t('verify_error', 'Verification failed'));
        }
      })
      .catch(error => {
        setStatus('error');
        setMessage(t('verify_server_error', 'Unable to verify email. Please try again later.'));
        console.error('Verification error:', error);
      });
  }, [searchParams, t]);

  return (
    <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        {status === 'loading' && (
          <div>
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">
              {t('verify_loading', 'Verifying your email...')}
            </h1>
            <p className="text-gray-600">
              {t('verify_loading_desc', 'Please wait while we verify your account')}
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              {t('verify_success_title', 'Email Verified!')}
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button 
              variant="accent" 
              onClick={() => navigate('/auth')}
            >
              {t('verify_go_to_login', 'Go to Login')}
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              {t('verify_error_title', 'Verification Failed')}
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/')}
              >
                {t('verify_go_home', 'Go Home')}
              </Button>
              <Button 
                variant="accent" 
                onClick={() => navigate('/auth')}
              >
                {t('verify_try_again', 'Try Again')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
