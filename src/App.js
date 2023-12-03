import { Route, HashRouter, Routes, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useState, useCallback } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { NavBar } from "./components/navbar";
import { Home } from "./components/home";
import { CreateAccount } from "./components/createaccount";
import { Login } from "./components/login";
import { Deposit } from "./components/deposit";
import { Withdraw } from "./components/withdraw";
import { Balance } from "./components/balance";
import { AllData } from "./components/alldata";

//import { UserContext } from "./components/context";

const firebaseConfig = {
    apiKey: "AIzaSyB-aeGcCrVm4RQyUCW9hpwAVA6HlelCCR0",
    authDomain: "mybadbank-69f4e.firebaseapp.com",
    projectId: "mybadbank-69f4e",
    storageBucket: "mybadbank-69f4e.appspot.com",
    messagingSenderId: "206687617212",
    appId: "1:206687617212:web:9d4fdc81ece15e481050b9"
  };
  

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const nullUser = { balance: 0 };

function App() {
    const baseUrl = process.env.REACT_APP_PORT || 'http://localhost:3500';

    const [status, setStatus] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    // balance is initialized temporarily to prevent user.balance from breaking routes using it.
    const [user, setUser] = useState(nullUser);

    let initializeUser = async (email, password) => {
        try {
            const res = await fetch(`${baseUrl}/account/login/${email}/${password}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            
            const tempUser = await res.json();
            console.log("tempUser", tempUser);
            setUser(tempUser);
            setLoggedIn(true);
        } catch (err) {
            console.log(err);
            return "login failed";
        }
    }

    let adjustBalance = (amount) => {
        fetch(`${baseUrl}/account/adjust/${user.email}/${Number(amount)}`)
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const newBalance = await res.json();
                setUser({ ...user, balance: newBalance })
                if (amount === null) {
                    setStatus('Balance error, Please contact support')
                }
            })
            .catch((err) => {
                console.log(err);
            })
        if (user.balance != typeof Number) {
            setStatus('Balance error, Please contact support')
            return status
        }
        return (user.balance, status)
    };

    function logIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                initializeUser(email, password)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    function createWithFirebase(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return
                // ..
            })
    }

    const logOut = useCallback(() => {
        const user = auth.currentUser;
        if (user) {
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    setLoggedIn(false);
                    setUser(nullUser);
                    // window.location.href = '/';
                    console.log('User signed out');
                })
                .catch((error) => {
                    console.error('Sign-out error:', error);
                });
        } else {
            console.log('No users');
        }
    }, []);

    return (
        <HashRouter basename="/">
            <NavBar user={user} isLoggedIn={loggedIn} signOut={logOut} />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/CreateAccount/" element={<CreateAccount initializeUser={initializeUser} createWithFirebase={createWithFirebase} />} />
                <Route path="/login" element={!loggedIn ? <Login logIn={logIn} /> : <Navigate to="/" />} />
                <Route path="/deposit" element={loggedIn ? <Deposit balance={user.balance} adjustBalance={adjustBalance} /> : <Navigate to="/login" />} />
                <Route path="/withdraw" element={loggedIn ? <Withdraw balance={user.balance} adjustBalance={adjustBalance} /> : <Navigate to="/login" />} />
                <Route path="/balance" element={loggedIn ? <Balance balance={user.balance} /> : <Navigate to="/login" />} />
                <Route path="/alldata" element={loggedIn ? <AllData /> : <Navigate to="/login" />} />
            </Routes>
        </HashRouter >
    );
}

export default App;