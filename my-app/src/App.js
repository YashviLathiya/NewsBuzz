import React from 'react';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Home from './Pages/Home';
import Settings from './Pages/Settings';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element = {<Home/>}></Route>
      <Route path="/Settings" exact element = {<Settings/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
