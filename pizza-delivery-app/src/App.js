import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {BrowserRouter , Route ,Link , Switch, Routes} from 'react-router-dom'
import Navbar from './components/navbar';
import Home from './screens/Home';
import Cartscreen from './screens/Cartscreen';
import Registrationscreen from './screens/Registrationscreen';
import Loginscreen from './screens/Loginscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cartscreen />} />
          <Route path="/register" element={<Registrationscreen />} />
          <Route path="/login" element={<Loginscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
