import './App.css';
import Nav from './components/Nav';
import Registration from './components/Registration';
import Login from './components/Login';
import Display from './components/Display';
import Chat from './components/Chat';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { createContext } from 'react'; //creates global state
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
export const MyContext = createContext() //export global state

function App() {

  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const redirect = useNavigate()

  return (
    // {/* //using context provider => value is like props..holds what we want to pass (HAS to be value) */}
    <MyContext.Provider value={{user, setUser, redirect, isLoggedIn, setIsLoggedIn}}> 
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Nav />
        <Routes> 
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Display/>} />
          <Route path='/chat' element={<Chat />}/>
        </Routes>
      </div>
    </DndProvider>
    </MyContext.Provider>
  );
}

export default App;
