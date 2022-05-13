import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import EditorPage from './pages/Editor/EditorPage';

function App() {
  return (
    <>
    
      <Router>

        <Routes>

          <Route path='/' element = { <Home/> } />;
          <Route path='/editor/:roomId' element = { <EditorPage/> } />;
        
        </Routes>
      </Router>

    </>
  );
}

export default App;
