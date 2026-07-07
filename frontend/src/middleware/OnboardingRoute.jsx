import { Navigate } from "react-router-dom";

export default function OnboardingRoute({ children }) {
  const onboardingCompleted = localStorage.getItem("onboarding_completed");
  const token = localStorage.getItem("token");

if(!token) {
    return <Navigate to="/login" replace />;
 }

  if (onboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }



  return children;
}