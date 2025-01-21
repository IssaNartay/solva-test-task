import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom"
import { useSelector } from "react-redux"
import LoginForm from "./components/LoginForm/LoginForm"
import Home from "./pages/Home/Home"
import People from "./pages/People/People"
import Planets from "./pages/Planets/Planets"
import Starships from "./pages/Starships/Starships"
import EntityDetails from "./pages/EntityDetails/EntityDetails"

function App() {
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	)

	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
				/>
				<Route
					path="/"
					element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
				/>
				<Route
					path="/people"
					element={isAuthenticated ? <People /> : <Navigate to="/login" />}
				/>
				<Route
					path="/planets"
					element={isAuthenticated ? <Planets /> : <Navigate to="/login" />}
				/>
				<Route
					path="/starships"
					element={isAuthenticated ? <Starships /> : <Navigate to="/login" />}
				/>
				<Route path="*" element={<Navigate to="/" />} />
				<Route path="/:entityType/:id" element={<EntityDetails />} />
			</Routes>
		</Router>
	)
}

export default App
