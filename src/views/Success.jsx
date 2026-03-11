export default function Success({ details }) {
  if (!details) return <p className="error-message">No active booking was found.</p>;

  console.log('Booking details received in Success view:', details);

  return (
    <section className="success-view">
      <img src="src/assets/logo.seeYouSoon!.png" alt="See you soon!" />
      
      <div className="receipt">
        <h4>BOOKING DETAILS</h4>
      {/* WHEN */}
        <div className="input-group">
          <input 
            type="text" 
            readOnly 
            placeholder=" " 
            value={details.when ? details.when.replace('T', ' ') : 'Unknown date and time'} 
          />
          <label>When</label>
        </div>

        {/* WHO */}
        <div className="input-group">
          <input 
            type="text" 
            readOnly 
            placeholder=" " 
            value={`${details.people} pers`} 
          />
          <label>Who</label>
        </div>

        {/* LANES */}
        <div className="input-group">
          <input 
            type="text" 
            readOnly 
            placeholder=" " 
            value={`${details.lanes} lane${details.lanes > 1 ? 's' : ''}`} 
          />
          <label>Lanes</label>
        </div>

        {/* BOOKING NUMBER */}
        <div className="input-group">
          <input 
            type="text" 
            readOnly 
            placeholder=" " 
            value={details.id || 'STR812744'} 
          />
          <label>Booking number</label>
        </div>
        
 {/* TOTAL PRICE */}
        <div className="total-box">
          <span className="total-label">Total</span>
          <span className="total-amount">{details.totalPrice} SEK</span>
        </div>
      </div>

      <button className="strike-btn" onClick={() => window.location.reload()}>
        SWEET, LET'S GO!
      </button>
    </section>
  );
}