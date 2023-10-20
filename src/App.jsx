// CSS
import './App.css'
// REACT-ROUTER-DOM
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
// HOOKS
import { useAuthentication } from "./hooks/useAuthentication";
import { useState, useEffect } from "react";
// PAGES
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/Createpost';
import Dashboard from './pages/Dashboard/Dashboard';
// COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// CONTEXT
import { AuthProvider } from "./context/AuthContext";

// const firebaseConfig = {
//   apiKey: "AIzaSyArOJY24NOJXr2U0a1kQliX2ln3N-3luuQ",
//   authDomain: "miniblog-59f42.firebaseapp.com",
//   projectId: "miniblog-59f42",
//   storageBucket: "miniblog-59f42.appspot.com",
//   messagingSenderId: "290674308879",
//   appId: "1:290674308879:web:61c9adaebb6a59483f307a"
// };



 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const auth = getAuth(app);


function App() {
  const [user, setUser] = useState(undefined);

  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App;
