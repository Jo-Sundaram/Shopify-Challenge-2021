import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import Login from "./components/Login/Login";
import Repository from "./components/Repository/Repository";
import Upload from "./components/Upload/Upload";



//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path = "/" component = { Login } />
          <Route exact path = "/Repository" component = { Repository } />
          <Route path = "/Upload" component = { Upload } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
