import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigationbar from './components/Navigationbar';
import ItemPage from './components/ItemPage';
import CardContainer from './components/CardContainer';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {
  const isLogged = useSelector(state => state.login)
  return (
    <Router>
      <div className="App">
        <Navigationbar/>
        {!isLogged && <h1 className='d-flex justify-content-center mt-4'>Welcome, please register if you haven't and log in.</h1>}
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/buy" element={
          <ProtectedRoute>
            <CardContainer/>
          </ProtectedRoute>
          }/>
          <Route exact path="/buy/:id" element={
          <ProtectedRoute>
            <ItemPage/>
          </ProtectedRoute>
          }/>
          <Route exact path="/cart" element={
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
          }/>
          <Route exact path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
