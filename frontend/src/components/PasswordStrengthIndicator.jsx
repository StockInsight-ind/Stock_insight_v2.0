export default function PasswordStrengthIndicator({ password }) {
  const getStrength = () => {
    if (!password) return { level: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    
    const levels = [
      { level: 0, text: "", color: "" },
      { level: 1, text: "Weak", color: "#EF4444" },
      { level: 2, text: "Fair", color: "#F97316" },
      { level: 3, text: "Good", color: "#EAB308" },
      { level: 4, text: "Strong", color: "#84CC16" },
      { level: 5, text: "Very Strong", color: "#22C55E" },
    ];
    
    return levels[Math.min(strength, 5)];
  };
  
  const { level, text, color } = getStrength();
  
  if (!password) return null;
  
  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="strength-bar"
            style={{
              backgroundColor: i <= level ? color : "rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>
      <span className="strength-text" style={{ color }}>
        {text}
      </span>
    </div>
  );
}
