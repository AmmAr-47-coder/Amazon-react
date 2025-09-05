import { productst } from "./App";
import { useContext, useState, useRef } from "react";
import "./home.css";

function Home({ cart, setcart, loading, login }) {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [searchTerm, setSearchTerm] = useState("");
  const il = useRef({});
  const il2 = useRef({});
  const img = useRef({});
  const loadimg = useRef({});
  const pro = useContext(productst);
  const q = cart.reduce((total, item) => total + item.q, 0);

  function add(id) {
    let newCart;
    const find = cart.find((i) => i.id === id);
    const selectedQty = parseInt(il.current[id].value, 10);

    if (find) {
      newCart = cart.map((item) =>
        item.id === id ? { ...item, q: item.q + selectedQty } : item
      );
    } else {
      const npro = pro.find((i) => i.id === id);
      newCart = [...cart, { ...npro, q: selectedQty, dop: 1 }];
    }

    il2.current[id].style.opacity = "1";
    setTimeout(() => {
      il2.current[id].style.opacity = "0";
    }, 1000);

    setcart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return loading ? (
    <div>
      <div className="amazon-header">
        <div className="amazon-header-left-section">
          <a className="header-link" href="/">
            <img
              className="amazon-logo"
              src="images/amazon-logo-white.png"
              alt="Amazon Logo"
            />
            <img
              className="amazon-mobile-logo"
              src="images/amazon-mobile-logo-white.png"
              alt="Amazon Mobile Logo"
            />
          </a>
        </div>

        <div className="amazon-header-middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="search-button">
            <img
              className="search-icon"
              src="images/icons/search-icon.png"
              alt="Search"
            />
          </button>
        </div>

        <div className="amazon-header-right-section">
          <a
            className="orders-link header-link"
            href={login ? "/signin" : "/myaccount"}
          >
            {login ? user.name : "Login"}
          </a>

          <a className="cart-link header-link" href="/Checkout">
            <img
              className="cart-icon"
              src="images/icons/cart-icon.png"
              alt="Cart"
            />
            <div className="cart-quantity js-cart-q">{q}</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>
      <div className="lo">
        <div className="loader"></div>
      </div>
    </div>
  ) : (
    <div>
      <div className="amazon-header">
        <div className="amazon-header-left-section">
          <a className="header-link" href="/">
            <img
              className="amazon-logo"
              src="images/amazon-logo-white.png"
              alt="Amazon Logo"
            />
            <img
              className="amazon-mobile-logo"
              src="images/amazon-mobile-logo-white.png"
              alt="Amazon Mobile Logo"
            />
          </a>
        </div>

        <div className="amazon-header-middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="search-button">
            <img
              className="search-icon"
              src="images/icons/search-icon.png"
              alt="Search"
            />
          </button>
        </div>

        <div className="amazon-header-right-section">
          <a
            className="orders-link header-link"
            href={!login ? "/signin" : "/myaccount"}
          >
            {login ? user.name : "Login"}
          </a>

          <a className="cart-link header-link" href="/Checkout">
            <img
              className="cart-icon"
              src="images/icons/cart-icon.png"
              alt="Cart"
            />
            <div className="cart-quantity js-cart-q">{q}</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>

      <div className="main">
        <div className="products-grid js-products-grid">
          {pro
            .filter((product) =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div className="product-container" key={product.id}>
                <div className="product-image-container">
                  <div
                    className="lo"
                    ref={(el) => (loadimg.current[product.id] = el)}
                  >
                    <div className="loader"></div>
                  </div>
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.title}
                    ref={(el) => (img.current[product.id] = el)}
                    onLoad={() => {
                      loadimg.current[product.id].style.display='none'
                      img.current[product.id].style.display='block'
                    }}
                  />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.title}
                </div>

                <div className="product-rating-container">
                  <h4>{product.rating.rate}</h4>
                  <div className="product-rating-count link-primary">
                    ({product.rating.count})
                  </div>
                </div>

                <div className="product-price">${product.price}</div>

                <div className={`product-quantity-container js-q${product.id}`}>
                  <select ref={(el) => (il.current[product.id] = el)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div
                  ref={(el) => (il2.current[product.id] = el)}
                  className="added-to-cart"
                >
                  <img src="images/icons/checkmark.png" alt="Added" />
                  Added
                </div>

                <button
                  className="add-to-cart-button button-primary js-add-to-cart"
                  onClick={() => add(product.id)}
                  data-product-id={product.id}
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
