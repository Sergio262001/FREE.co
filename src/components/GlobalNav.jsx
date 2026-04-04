import { useNavigate } from "react-router-dom";

export default function GlobalNav() {
  const navigate = useNavigate();

  return (
    <div className="global-nav" style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 20px", display: "flex", gap: "12px", alignItems: "center" }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          background: "transparent", 
          border: "1px solid var(--border-light)", 
          color: "var(--text-primary)", 
          padding: "8px 16px", 
          fontSize: "11px", 
          textTransform: "uppercase", 
          letterSpacing: "1px", 
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "600",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; }}
      >
        <span>&#8592;</span> Volver
      </button>
      <button 
        onClick={() => navigate(1)} 
        style={{ 
          background: "transparent", 
          border: "1px solid var(--border-light)", 
          color: "var(--text-primary)", 
          padding: "8px 16px", 
          fontSize: "11px", 
          textTransform: "uppercase", 
          letterSpacing: "1px", 
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "600",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; }}
      >
        Adelante <span>&#8594;</span>
      </button>
    </div>
  );
}
