import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import DashboardPage from "./pages/DashboardPage";



//code chnaged by ap
import NewsAnalysis from "./pages/NewsAnalysis";
import GlobalNews from "./pages/GlobalNews";
import Settings from "./pages/Settings";



function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes> */}


{/* routes made by ap */}

      <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/questionnaire" element={<QuestionnairePage />} />

  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/news-analysis" element={<NewsAnalysis />} />
  <Route path="/global-news" element={<GlobalNews />} />
  <Route path="/settings" element={<Settings />} />

  <Route path="*" element={<LandingPage />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
