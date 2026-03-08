import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { fetchApiKey, submitBooking } from '../assets/api.jsx';
import { useNavigate } from 'react-router-dom';

function Booking({ onBookingSuccess, showLoading, hideLoading }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lanes, setLanes] = useState(1);
  const [players, setPlayers] = useState(1);
  const [shoes, setShoes] = useState(['']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(null);


  // Uppdatera antal skofält dynamiskt när antal spelare ändras
  useEffect(() => {
    const newShoes = [...shoes];
    if (players > newShoes.length) {
      // Lägg till tomma fält för nya spelare
      for (let i = newShoes.length; i < players; i++) {
        newShoes.push('');
      }
    } else if (players < newShoes.length) {
      // Ta bort fält om spelare minskar
      newShoes.length = players;
    }
    setShoes(newShoes);
  }, [players]);

  const handleShoeChange = (index, value) => {
    const newShoes = [...shoes];
    newShoes[index] = value;
    setShoes(newShoes);
  };

  const handleStrike = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Formatera datum och tid (ofta förväntat format i API:er är t.ex. YYYY-MM-DD HH:MM)
      const when = `${date}T${time}`;
      
      const payload = {
        when: when,
        lanes: parseInt(lanes),
        people: parseInt(players),
        shoes: shoes.map(s => parseInt(s))
      };

      const apiKey = await fetchApiKey();
      const confirmationResponse = await submitBooking(payload, apiKey, date, time, lanes, players, shoes);
      
      // Beräkna totalsumman enligt spec (om API:et inte skickar tillbaka den i responset)
      const totalPrice = (parseInt(players) * 120) + (parseInt(lanes) * 100);
      
      onBookingSuccess({
        ...confirmationResponse,
        totalPrice: confirmationResponse.price || totalPrice
      });
      Navigate('/success')

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="booking-view">
     <img src="src/assets/logo.booking.png" alt="" />
      <br />
      <h4>WHEN, WHAT & WHO</h4>
      <form onSubmit={handleStrike}>
        <div className="input-group">
          <label>Date</label>
          <input type="date" required value={date} onChange={e => setDate(e.target.value)} />
        </div>
        
        <div className="input-group">
          <label>Time</label>
          <input type="time" required value={time} onChange={e => setTime(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Number of awesome bowlers</label>
          <input type="number" min="1" required value={players} onChange={e => setPlayers(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Number of Lanes</label>
          <input type="number" min="1" required value={lanes} onChange={e => setLanes(e.target.value)} />
        </div>
        {/* Dynamisk utskrift av skostorlekar */}
        <div className="shoes-section">
          <h4>SHOES</h4>
          {shoes.map((shoe, index) => (
            <div key={`shoe-${index}`} className="input-group">
              <label>Shoe size / person {index + 1}</label>
              <input 
                type="number" 
                min="20" max="50" 
                required 
                value={shoe} 
                onChange={e => handleShoeChange(index, e.target.value)} 
              />
            </div>
          ))}
        </div>
<br />
        {/* Hantering av det instabila API:et */}
        {error && <p className="error-message">⚠️ {error}</p>}

        <button type="submit" disabled={isLoading} className="strike-btn">
          {isLoading ? 'Booking...' : 'STRIIIIKE!'}
        </button>
      </form>
    </section>
  );
}

export default Booking;