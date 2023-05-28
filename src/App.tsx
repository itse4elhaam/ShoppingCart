import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Navbar } from "./components/NavBar";
import { ShoppingCardProvider } from "./context/shoppingCartContext";


// container is a bootstrap class
// Routes wraps all of the routes inside it and is responsible for all the seamless page switching
function App() {
	return (
		<ShoppingCardProvider>
			<Navbar />
			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</Container>
		</ShoppingCardProvider>
	);
}

export default App;
