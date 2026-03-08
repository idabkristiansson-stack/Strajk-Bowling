import './App.css'
import Favorites from './components/Favorites'
import InfoBox from './components/infoBox'
import LikeButton from './components/LikeButton'
import Username from './components/Username'

function App() {

  return (
    <>
<h1>useState Code Along</h1>
<LikeButton />
<br />
<InfoBox />
<br />
<Username />
<Favorites />
    </>
  )
}

export default App
