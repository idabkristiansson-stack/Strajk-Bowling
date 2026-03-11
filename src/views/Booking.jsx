import { useState, useEffect } from 'react';
import { fetchApiKey, submitBooking } from '../assets/api.jsx';
// Du behöver inte importera Link eller useNavigate eftersom du hanterar detta via App.jsx nu!

function Booking({ onBookingSuccess, showLoading, hideLoading }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lanes, setLanes] = useState(1);
  const [players, setPlayers] = useState(1);
  const [shoes, setShoes] = useState(['']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Uppdatera antal skofält dynamiskt när antal spelare ändras
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

  // 2. Hantera ändringar i skofälten
  const handleShoeChange = (index, value) => {
    const newShoes = [...shoes];
    newShoes[index] = value;
    setShoes(newShoes);
  };

  // 3. Funktion för att lägga till en spelare (NU PÅ RÄTT STÄLLE!)
  const addPlayer = () => {
    setPlayers(prev => prev + 1);
  };

  // 4. Funktion för att ta bort en specifik spelare (NU PÅ RÄTT STÄLLE!)
  const removePlayer = (indexToRemove) => {
    if (players <= 1) return; 
    const updatedShoes = shoes.filter((_, index) => index !== indexToRemove);
    setShoes(updatedShoes);
    setPlayers(players - 1); 
  };

  // 5. Hantera själva bokningen (Skicka formuläret)
  const handleStrike = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const when = `${date}T${time}`;
      
      const payload = {
        when: when,
        lanes: parseInt(lanes),
        people: parseInt(players), // <--- Ändrad från players till people enligt API specen
        shoes: shoes.map(s => parseInt(s))
      };

      const apiKey = await fetchApiKey();
      
      // Fixad submitBooking anrop (du skickade för många parametrar förut)
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

{/* SPELARE (Nu öppen för både skrivande och knappar!) */}
        <div className="input-group">
          <input 
            type="number" 
            min="1" 
            placeholder=" " 
            value={players} 
            onChange={(e) => {
              // Gör om texten till en siffra
              const val = parseInt(e.target.value);
              // Se till att det inte går att skriva 0 eller minus-siffror
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