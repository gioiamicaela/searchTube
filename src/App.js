import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./render/LoginPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import SearchPage from "./render/SearchPage";

const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children;
  }
  return <Navigate to="/" />;
};

function App() {
  const user = useSelector((state) => {
    return state.user.email;
  });
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/search"
          element={
            <ProtectedRoute user={user}>
              <SearchPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <div className="pb-3" style={{ position: "relative" }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
