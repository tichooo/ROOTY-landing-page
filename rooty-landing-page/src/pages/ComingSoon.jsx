import FadeIn from "../components/motion/FadeIn";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <section className="min-h-[80vh] flex items-center justify-center bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Merci de votre intérêt !
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              L'application ROOTY est actuellement en développement. 
              Nous travaillons dur pour vous offrir la meilleure expérience possible.
              Restez à l'écoute pour le lancement officiel !
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}