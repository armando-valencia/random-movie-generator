import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StreamingService from './pages/StreamingService';

function App() {
    return (
        <div className="flex justify-center items-center h-screen text-[#00ffff] bg-black/70">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/netflix"
                    element={<StreamingService name="Netflix" />}
                />
                <Route
                    path="/hulu"
                    element={<StreamingService name="Hulu" />}
                />
                <Route path="/hbo" element={<StreamingService name="HBO" />} />
            </Routes>
        </div>
    );
}

export default App;
