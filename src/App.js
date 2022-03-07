import './App.css';
import LoginPageComp from './components/LoginPageComp'
import CreateAccountComp from './components/CreateAccountComp'
import MainPageComp from './components/MainPageComp'
import ManageUsersPageComp from './components/ManageUsersPageComp'
import UsersPageComp from './components/UserPageComp'
import EditUserPageComp from './components/EditUserPageComp'
import WelcomePageComp from './components/WelcomePageComp'
import AppBarComp from './components/AppBarComp'
import { Link, Route, Switch, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBarComp />
        <br />
        <Routes>
          <Route path='/' element={<WelcomePageComp />} />
          <Route path='/home' element={<WelcomePageComp />} />
          <Route path='/login' element={<LoginPageComp />} />
          <Route path='/signup' element={<CreateAccountComp />} />
          <Route path='/main' element={<MainPageComp />} />
          <Route path='/users' element={<UsersPageComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
