import { Routes, Route } from "react-router-dom";
import HBO from "./pages/HBO";
import Home from "./pages/Home";
import Hulu from "./pages/Hulu";
import Netflix from "./pages/Netflix";

function App() {
	return (
		<div className="flex justify-center items-center h-screen text-[#31f610]">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/netflix" element={<Netflix />} />
				<Route path="/hulu" element={<Hulu />} />
				<Route path="/hbo" element={<HBO />} />
			</Routes>
		</div>
	);
}

export default App;
