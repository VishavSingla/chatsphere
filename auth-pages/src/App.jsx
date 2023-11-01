
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Home from './Pages/Home'
import RequireUser from './Pages/RequireUser';
import Profile from './components/Profile';
import Fead from './components/Fead';
function App() {
  return (
    <BrowserRouter className='flex items-center justify-center'>
      <div>
      <Routes>
          <Route element={<RequireUser />}>
            <Route element={<Home />} >
              <Route path="/" element={<Fead />} />
              <Route path="/profile/:userId" element={<Profile />} />
            </Route> 
          </Route>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>
        
      </BrowserRouter>
  );
}

export default App;



