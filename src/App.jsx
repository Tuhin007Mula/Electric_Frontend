import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your form
import NotFound404 from "./components/ErrorPages/NotFound404.jsx";
import SuccessPage from "./components/InputForm/SuccessPage";
import LoginPage from "./pages/LoginPage.jsx";
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          {/*Login Form */}
          <Route path="/" element={<LoginPage />} />

          {/*Error Pages */}
          <Route path="*" element={<NotFound404 />} />

          {/* Submit Page */}
          <Route path = "/success" element={<SuccessPage/>} />
        </Routes>
      </BrowserRouter>    
  );
};

export default App;
