import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FadeIn from '../components/motion/FadeIn';
import Button from '../components/ui/Button';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

export default function FAQ() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!user && !email) {
      navigate('/auth', { state: { returnTo: '/faq' } });
      return;
    }

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user ? user.email : email,
          question,
          timestamp: new Date().toISOString(),
          language: t.language || 'en'
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      setSubmitStatus('success');
      setQuestion('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting question:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {t('faq_title', 'Got Questions?')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('faq_subtitle', "Ask us anything about Rooty. We're here to help!")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 p-8 rounded-2xl border bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!user && (
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('faq_email', 'Your email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('faq_email_placeholder', 'Where should we send the answer?')}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black/5 focus:border-black transition"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('faq_question', 'Your question')}
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={t('faq_question_placeholder', 'What would you like to know about Rooty?')}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black/5 focus:border-black transition"
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="accent"
                    className="w-full relative"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Loading className="w-5 h-5" />
                        <span className="ml-2">{t('faq_submitting', 'Sending...')}</span>
                      </div>
                    ) : (
                      t('faq_submit', 'Send Question')
                    )}
                  </Button>
                </div>

                {submitStatus === 'success' && (
                  <div className="text-center text-green-600 font-medium animate-fade-in">
                    {t('faq_success', 'Question sent! We\'ll get back to you soon.')}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-center text-red-600 font-medium animate-fade-in">
                    {t('faq_error', 'Something went wrong. Please try again.')}
                  </div>
                )}
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}