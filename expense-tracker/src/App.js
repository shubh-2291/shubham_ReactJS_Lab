import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Expenses from './components/Expenses';
import AddExpense from './components/AddExpense';

function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Expenses></Expenses>}></Route>
            <Route path='/add' element={<AddExpense></AddExpense>}></Route>
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
