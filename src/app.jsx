import React from "react";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./components/auth/AuthForm"; 
import "./App.css";

function App() {
    const me = useSelector((state) => state.auth.credentials.user);
    const guestRouter = (
        <Routes>
            <Route path="/*" element={<AuthForm/>}/>
        </Routes>
    );
    const loggedIn = me;

    return(
       loggedIn ? <h1>Welcome</h1> : <h1>Can't find user</h1>
    )
}

export default App;
