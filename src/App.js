import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/darkly/bootstrap.min.css";
import SignUp from './screens/SignUp';
import { CartProvider } from './components/Contextreducer';
import MyOrders from './screens/MyOrders';
function App() {
  return (
    <CartProvider>
      <Router> 
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/createuser' element={<SignUp/>}/>
          <Route exact path='/myorder' element={<MyOrders/>}/>
        </Routes> 
        </div>
      </Router>
    </CartProvider>
    
  );
}

export default App;
