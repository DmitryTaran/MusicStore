import './styles/App.css'
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import React from "react";
import Footer from "./components/Footer/Footer";

function App() {
    return (
      <BrowserRouter>
          <div className="App">
              <NavBar/>
              <AppRouter/>
              <Footer/>
          </div>
      </BrowserRouter>
  );
}

export default App;
