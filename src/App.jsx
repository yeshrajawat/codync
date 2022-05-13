import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import EditorPage from './pages/Editor/EditorPage';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <div>
      <Toaster
      position='top-right'
      toastOptions={{success:{
        theme:{
          primary:"#4aed88"
        }
      }}}></Toaster>
    </div>
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
