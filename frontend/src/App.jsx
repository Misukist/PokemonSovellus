import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import LoadingSpinner from "./loadingSpinner.jsx";

function App() {

	const { data: authUser, isLoading } = useQuery({
			// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("http://localhost:3000/api/auth/me", {
					credentials: "include"
				});
				
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				console.log("authUser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
		});

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}


  return (
    <>
      <NavBar authUser={authUser} />
      <Routes>
        {/* Expansion pages */}
        <Route path="/phantasmal" element={<PhantasmalPage />} />
        <Route path="/scarlet" element={<ScarletPage />} />
        <Route path="/mega" element={<MegaEvolutionPage />} />

		<Route path="/" element={<HomePage/>} />

        {/* Protected pages */}
        <Route path="/cards" element={authUser ? <CardsPage /> : <Navigate to="/signin" />} />
        <Route path="/collection" element={authUser ? <CollectionPage /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin" />} />

        {/* Auth pages */}
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App
