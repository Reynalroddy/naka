import logo from './logo.svg';
// import './App.css';
import './index.css'
// import { checkWallet } from "./scripts/eth";
import { checkWallet ,selectWallet,connectWallet} from './script/eth';
import Home from './pages/Home';
import Mint from './pages/Mint';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/mint" element={<Mint />} />
   </Routes>
   </Router>
 
  );
}

export default App;
