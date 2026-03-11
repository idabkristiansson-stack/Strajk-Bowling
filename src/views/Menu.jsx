export default function Menu({ navigate }) {
  return (
    <nav className="menu-overlay">
      <ul className="menu-links">
        <li>
          <button onClick={() => navigate('booking')}>Booking</button>
        </li>
        <li>
          <button onClick={() => navigate('success')}>Confirmation</button>
        </li>
      </ul>
    </nav>
  );
}