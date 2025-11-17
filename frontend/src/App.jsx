import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx"
import ExpansionsPage from "./pages/ExpansionsPage.jsx"
import CollectionPage from "./pages/CollectionPage.jsx"
import CardsPage from "./pages/CardsPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx";
import NavBar from "./components/NavBar.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import SignIn from "./pages/SignInPage.jsx";
import PhantasmalPage from "./pages/expansionPages/PhantasmalFlames.jsx";
import ScarletPage from "./pages/expansionPages/Scarlet.jsx";
import MegaEvolutionPage from "./pages/expansionPages/MegaEvolution.jsx";

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/phantasmal" element={<PhantasmalPage/>}/>
        <Route path="/scarlet" element={<ScarletPage/>}/>
        <Route path="/mega" element={<MegaEvolutionPage/>}/>
        <Route path="/cards" element={<CardsPage/>} />
        <Route path="/collection" element={<CollectionPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  )
}

export default App
