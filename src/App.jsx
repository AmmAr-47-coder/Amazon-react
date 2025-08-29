import Home from "./home";
import Checkout from "./checkout";
import Login from "./login";
import Signup from "./signup";
import { createContext, useState, useEffect } from "react";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
export const productst = createContext();
function App() {
  const dop = [
    { id: 1, day: 5, p: 0 },
    { id: 2, day: 3, p: 499 },
    { id: 3, day: 1, p: 999 },
  ];
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem('l'))||false );

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((result) => {
        const updated = result.map((item) => ({ ...item, dop: 1 }));
        setProducts(updated);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const [cart, setcart] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setcart(JSON.parse(storedCart));
    }
  }, []);
  return (
    <div>
      <productst.Provider value={products}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home cart={cart} login=
              {login} setcart={setcart} loading={loading} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} setcart={setcart} dop={dop} />}
            />
            <Route path="/signin" element={<Login login={setLogin} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </productst.Provider>
    </div>
  );
}

export default App;
