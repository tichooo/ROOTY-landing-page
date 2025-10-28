import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import DemoRail from "./components/DemoRail";
import Premium from "./pages/Premium";
import Auth from "./pages/Auth";
import FAQ from "./pages/FAQ";
import ComingSoon from "./pages/ComingSoon";
import Admin from "./pages/Admin";
import { AuthProvider } from "./context/AuthContext";

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <HowItWorks />
      <DemoRail />
      <Features />
      <CTA />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
