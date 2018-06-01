import React, { Component } from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store/index";
import {BrowserRouter} from "react-router-dom";

import "../style.css";
import Navbar from "./Navbar";
import Main from "./Main";

import {setAuthToken, setCurrentUser} from "../store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch(err) {
        store.dispatch(setCurrentUser());
    }
}

class App extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Navbar />
                    <Main />
                    
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}


export default App;
