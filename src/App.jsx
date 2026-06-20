import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MenuPage from "./pages/MenuPage";
import BillingPage from "./pages/BillingPage";
import HistoryPage from "./pages/HistoryPage";



function App() {
  const [shop, setShop] = useState(null);

  useEffect(() => {

   fetch("http://localhost:5000/shop")
    .then(res => {
      if (!res.ok) {
        throw new Error("Server error");
      }
      return res.json();
    })
    .then(data => setShop(data))
    .catch(err => {
      console.log(err);
      setShop(null);
    });

  }, []);

  if (shop === null) {
  return <h2 className="text-center mt-5">Loading...</h2>;
}

  return (
    <>
      {/* Navbar */}
      
      <Navbar shop={shop}/>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Dashboard shop={shop} />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
}

export default App;