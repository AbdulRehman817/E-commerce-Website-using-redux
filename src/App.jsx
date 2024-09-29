import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCartItem } from "../config/redux/reducers/cartSlice";
const App = () => {
  const [products, setProducts] = useState(null);
  const store = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        console.log(res.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (item) => {
    dispatch(
      addCartItem({
        item,
      })
    );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {products ? (
        products.map((item) => {
          return (
            <div
              style={{
                border: "1px solid black",
                borderRadius: "20px",
                padding: "20px",
                margin: "10px",
              }}
              key={item.id}
            >
              <img width="200" src={item.thumbnail} alt="productImg" />
              <h2>{item.title.slice(0, 10) + "..."}</h2>
              <h1>{item.price}</h1>
              <button onClick={() => addToCart(item)}>add To cart</button>
            </div>
          );
        })
      ) : (
        <p>Item not found</p>
      )}
    </div>
  );
};

export default App;
