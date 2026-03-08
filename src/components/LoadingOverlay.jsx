
export default function LoadingOverlay({ text = "Laddar...", visible = false }) {
  if (!visible) return null;

  return (
    <div
      className="loading-overlay"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={text}
    >
      <div className="spinner" />
      <p className="loading-text">{text}</p>
    </div>
  );
}
