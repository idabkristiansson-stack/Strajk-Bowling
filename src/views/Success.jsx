export default function Success({ details }) {
  // Om användaren navigerar hit utan en aktiv bokning
  if (!details) return <p className="error-message">No active booking was found.</p>;

  console.log('Booking details received in Success view:', details);

  return (
    <section className="success-view">
      <img src="src/assets/logo.seeYouSoon!.png" alt="See you soon!" />
      
      <div className="receipt">
        <h2>Booking details</h2>
        <div className="receipt-item">
          <span>When: </span>
          <span>{details.when ? details.when.replace('T', ' ') : 'Unknown date and time'}</span>
        </div>
        <div className="receipt-item">
          <span>Who: </span>
          <span>{details.players} pers</span>
        </div>
        <div className="receipt-item">
          <span>Lanes: </span>
          <span>{details.lanes} lane/lanes</span>
        </div>
        <div className="receipt-item">
          <span>Booking number: </span>
          <span>{details.id || 'STR812744'}</span>
        </div>
      </div>

      <div className="total-price">
        <span>Total price: </span>
        <span>{details.totalPrice} SEK</span>
      </div>

      <button className="back-btn" onClick={() => window.location.reload()}>
        SWEET, LET´S GO!
      </button>
    </section>
  );
}