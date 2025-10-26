import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import FadeIn from "../components/motion/FadeIn";
import Button from '../components/ui/Button';

export default function Premium() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openFeature, setOpenFeature] = useState(null);
  const timerRef = useRef(null);

  const handlePremiumClick = () => {
    if (auth && auth.user) {
      navigate('/coming-soon');
    } else {
      navigate('/auth', { state: { from: '/premium' } });
    }
  };

  const features = [
    {
      key: 'nav_weather',
      icon: '🌤️'
    },
    {
      key: 'offline_mode',
      icon: '📱'
    },
    {
      key: 'favorite_routes',
      icon: '⭐'
    },
    {
      key: 'community_rankings',
      icon: '🏆'
    },
    {
      key: 'advanced_stats',
      icon: '📊'
    }
  ];

  // Premium app screens showing different features
  const screens = [
    "/img/screen_routing.png",    // Navigation route screen
    "/img/screen_guidance.png",   // Turn-by-turn navigation
    "/img/screen_community.png",  // Community features
    "/img/demo-2.png",           // Weather navigation
    "/img/demo-3.png"            // Statistics and tracking
  ].map(path => process.env.PUBLIC_URL + path); // Ensure correct path resolution

  // Autoplay functionality
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 2600);
    return () => clearInterval(timerRef.current);
  }, [paused, screens.length]);

  // Touch swipe functionality
  const startX = useRef(null);
  function onTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const threshold = 40;
    if (dx < -threshold) setIndex((i) => (i + 1) % screens.length);
    if (dx > threshold) setIndex((i) => (i - 1 + screens.length) % screens.length);
    startX.current = null;
  }

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="py-20 relative">
        <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-blue-50 via-blue-50/50 to-transparent -z-10"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <div>
                <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-gray-900">
                  {t('premium_title')}<br />
                  {t('premium_price')}
                </h1>
                <div className="mt-8 mb-12">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={handlePremiumClick}
                  >
                    {t('premium_cta')}
                  </Button>
                </div>

                {/* Comparison Table */}
                <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-3 text-center py-4 bg-gray-50 font-bold">
                    <div>{t('premium_comparison.title')}</div>
                    <div>{t('premium_comparison.free')}</div>
                    <div>{t('premium_comparison.premium')}</div>
                  </div>
                  {Object.entries(t('premium_comparison.features', { returnObjects: true })).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 text-center py-4 border-t">
                      <div className="text-left px-4">{value.name}</div>
                      <div className={!value.included_free ? 'text-gray-400' : 'text-accent font-bold'}>
                        {value.included_free ? '✓' : '×'}
                      </div>
                      <div className="text-accent font-bold">✓</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            
            <div className="relative lg:sticky lg:top-24" 
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="w-[280px] h-[580px] mx-auto relative">
                {/* Phone outer frame with 3D effect */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-gray-700 to-gray-900 transform rotate-0 p-[3px]">
                  {/* Inner bezel with metallic effect */}
                  <div className="absolute inset-[1px] rounded-[2.9rem] bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800">
                    {/* Screen content */}
                    <div className="absolute inset-[4px] rounded-[2.7rem] overflow-hidden bg-white">
                      <AnimatePresence initial={false}>
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <img
                            src={screens[index]}
                            alt={t('premium_screen_alt', { index: index + 1 })}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              console.error('Image failed to load:', screens[index]);
                              e.target.style.display = 'none';
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Notch area with camera and sensors */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px]">
                    <div className="absolute inset-0 bg-gray-900 rounded-b-[1.2rem]"></div>
                    {/* Camera dot */}
                    <div className="absolute right-8 top-2.5 w-2 h-2 rounded-full bg-gray-800 ring-1 ring-gray-700"></div>
                    {/* Sensor */}
                    <div className="absolute left-6 top-3 w-4 h-1 rounded-full bg-gray-800"></div>
                  </div>

                  {/* Side buttons with metallic effect */}
                  <div className="absolute -left-0.5 top-[100px] w-1 h-[25px] bg-gradient-to-r from-gray-600 to-gray-700 rounded-l shadow-lg"></div>
                  <div className="absolute -left-0.5 top-[135px] w-1 h-[50px] bg-gradient-to-r from-gray-600 to-gray-700 rounded-l shadow-lg"></div>
                  <div className="absolute -right-0.5 top-[120px] w-1 h-[35px] bg-gradient-to-l from-gray-600 to-gray-700 rounded-r shadow-lg"></div>

                  {/* Subtle reflections */}
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {screens.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === index ? 'bg-accent' : 'bg-gray-400'
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-12">{t('premium_details')}</h2>
            <div className="space-y-4">
              {features.map(feature => (
                <div key={feature.key} 
                  className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <button
                    className="w-full p-6 flex items-center justify-between text-left"
                    onClick={() => setOpenFeature(openFeature === feature.key ? null : feature.key)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{feature.icon}</span>
                      <h3 className="text-xl font-bold">{t(`premium_features.${feature.key}.title`)}</h3>
                    </div>
                    <span className={`transform transition-transform ${openFeature === feature.key ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {openFeature === feature.key && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t">
                          <p className="text-gray-600">{t(`premium_features.${feature.key}.description`)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}