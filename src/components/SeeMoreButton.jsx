export default function SeeMoreButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: "#4f46e5",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          fontSize: "13px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Ver más
      </button>
    );
  }