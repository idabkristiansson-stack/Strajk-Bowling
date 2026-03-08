export default function Hamburger({ isOpen, toggleMenu }) {
  return (
    <button 
      className={`hamburger ${isOpen ? 'open' : ''}`} 
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <div className="line" />
      <div className="line" />
      <div className="line" />
    </button>
  );
}