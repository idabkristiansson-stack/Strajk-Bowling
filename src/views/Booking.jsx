import { useState, useEffect } from 'react';
import { fetchApiKey, submitBooking } from '../assets/api.jsx';

function Booking({ onBookingSuccess, showLoading, hideLoading }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lanes, setLanes] = useState(1);
  const [players, setPlayers] = useState(1);
  const [shoes, setShoes] = useState(['']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newShoes = [...shoes];
    if (players > newShoes.length) {
      for (let i = newShoes.length; i < players; i++) {
        newShoes.push('');
      }
    } else if (players < newShoes.length) {
      newShoes.length = players;
    }
    setShoes(newShoes);
  }, [players]);

  const handleShoeChange = (index, value) => {
    const newShoes = [...shoes];
    newShoes[index] = value;
    setShoes(newShoes);
  };

  const addPlayer = () => {
    setPlayers(prev => prev + 1);
  };

  const removePlayer = (indexToRemove) => {
    if (players <= 1) return; 
    const updatedShoes = shoes.filter((_, index) => index !== indexToRemove);
    setShoes(updatedShoes);
    setPlayers(players - 1); 
  };

  const handleStrike = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const when = `${date}T${time}`;
      
      const payload = {
        when: when,
        lanes: parseInt(lanes),
        people: parseInt(players), 
        shoes: shoes.map(s => parseInt(s))
      };

      const apiKey = await fetchApiKey();
      
      const confirmationResponse = await submitBooking(payload, apiKey);
      
      const totalPrice = (parseInt(players) * 120) + (parseInt(lanes) * 100);
      
      onBookingSuccess({
        ...payload,
        ...confirmationResponse,
        totalPrice: confirmationResponse.price || totalPrice
      });

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
        
        <div className="input-row">
          {/* DATUM */}
          <div className="input-group">
            <input 
              type="date" 
              required 
              placeholder=" " 
              value={date} 
              onChange={e => setDate(e.target.value)} 
            />
            <label>DATE</label>
          </div>
          
          {/* TID */}
          <div className="input-group">
            <input 
              type="time" 
              required 
              placeholder=" " 
              value={time} 
              onChange={e => setTime(e.target.value)} 
            />
            <label>TIME</label>
          </div>
        </div>

        {/* SPELARE  */}
        <div className="input-group">
          <input 
            type="number" 
            min="1" 
            placeholder=" " 
            value={players} 
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0) {
                setPlayers(val);
              }
            }} 
          />
          <label>NUMBER OF AWESOME BOWLERS</label>
        </div>

        {/* BANOR */}
        <div className="input-group">
          <input 
            type="number" 
            min="1" 
            required 
            placeholder=" " 
            value={lanes} 
            onChange={e => setLanes(e.target.value)} 
          />
          <label>NUMBERS OF LANES</label>
        </div>

        {/* SKOR */}
        <div className="shoes-section">
          <h4>SHOES</h4>
          {shoes.map((shoe, index) => (
            <div key={`shoe-${index}`} className="shoe-row">
              <div className="input-group">
                <input 
                  type="number" 
                  min="20" max="50" 
                  required 
                  placeholder=" " 
                  value={shoe} 
                  onChange={e => handleShoeChange(index, e.target.value)} 
                />
                <label>SHOES SIZE / PERSON {index + 1}</label>
              </div>
              
              <button 
                type="button" 
                className="remove-btn" 
                onClick={() => removePlayer(index)}
                disabled={players <= 1} 
              >
                -
              </button>
            </div>
          ))}
        </div>

        <button type="button" className="add-btn" onClick={addPlayer}>
          +
        </button>
  
        {error && <p className="error-message">⚠️ {error}</p>}

        <button type="submit" disabled={isLoading} className="strike-btn">
          {isLoading ? 'Booking...' : 'STRIIIIIIKE!'}
        </button>
      </form>
    </section>
  );
}

export default Booking;