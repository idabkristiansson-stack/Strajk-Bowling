import {useState} from 'react'
import './App.css'
import Booking from './views/Booking'
import Menu from './views/Menu'
import Hamburger from './components/HamburgerMenu'
import Success from './views/Success'
import LoadingOverlay from './components/LoadingOverlay'
import { Route, Routes } from 'react-router'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const showLoading = (text = "Loading...") => {
    setLoadingText(text);
    setIsLoading(true);
  };
  const hideLoading = () => setIsLoading(false)


  const handleBookingSuccess = (details) => {
    setBookingDetails(details);
    setCurrentView('success');
  };

  return (
   <> 
 <>
      {/* Global loading overlay */}
      <LoadingOverlay text={loadingText} visible={isLoading} />
      </>

   <div className="app-container">
      <header>
        <Hamburger 
          isOpen={isMenuOpen} 
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        />
      </header>

      {/* Visar menyn (helskärms-overlay) om isMenuOpen är true */}
      {isMenuOpen && (
        <Menu 
          navigate={(view) => {
            setCurrentView(view);
            setIsMenuOpen(false); // Stänger menyn när man gjort ett val
          }} 
        />
      )}

        {/* Startsida */}
        {currentView === 'home' && (
          <div className="home">
            <br />
            <br />
            <img src="src/assets/logo.png" alt="STRAJK Bowling Logo" /> 
            <br />
            <img src="src/assets/logo.text.png" alt="" />
          </div>
        )}


      {/* Resten av din app... */}
      {currentView === 'booking' && (
        <Booking onBookingSuccess={handleBookingSuccess} 
        showLoading={showLoading}   // <-- Skickas till Booking
            hideLoading={hideLoading}
/>
      )}

      {currentView === 'success' && (
        <Success details={bookingDetails} />
      )}
    </div>
    
 </>

)
}

export default App
