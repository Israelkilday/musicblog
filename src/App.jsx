// CSS
import './App.css'
// REACT-ROUTER-DOM
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// FIREBASE
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
// import { FirebaseProvider } from "./context/FirebaseContext";
import { AuthProvider } from "./context/AuthContext";

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
      {/* <FirebaseProvider> */}
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
      {/* </FirebaseProvider> */}
    </>
  )
}

export default App;
