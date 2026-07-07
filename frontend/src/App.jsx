
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import DashboardPage from "./pages/DashboardPage";
import OnboardingRoute from "./middleware/OnboardingRoute";



//code chnaged by ap
import NewsAnalysis from "./pages/NewsAnalysis";
import GlobalNews from "./pages/GlobalNews";
import Settings from "./pages/Settings";
import ProtectedRoute from "./middleware/ProtectedRoute";

 

function App() {
  return (
   <BrowserRouter>
  <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/questionnaire" element={
      <OnboardingRoute>
        <QuestionnairePage />
      </OnboardingRoute>
    } />

  <Route path="/dashboard" element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    } />
  <Route path="/news-analysis" element={
      <ProtectedRoute>
        <NewsAnalysis />
      </ProtectedRoute>
    } />
  <Route path="/global-news" element={
      <ProtectedRoute>
        <GlobalNews />
      </ProtectedRoute>
    } />
  <Route path="/settings" element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    } />

  <Route path="*" element={<LandingPage />} />
  </Routes>
    </BrowserRouter>
  );
}

export default App;
