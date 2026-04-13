import './App.css';
import Footer from './components/footer';
import Particles from './components/landing/Particles';

function App() {
  return (
    <div className="mainContainer">
      <Particles />
      <div className="mainContent">
        <h1>K2 Gameworks</h1>
        <p>Something incredible is coming...</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
