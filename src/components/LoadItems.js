import { useState, useEffect } from "react";

const LoadItems = () => {
  const itemsCount = 100;
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    retrieveItems();
  }, [count]);

  const retrieveItems = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `https://dummyjson.com/products?limit=8&skip=${count}`
      );
      const parsedData = await data.json();

      if (parsedData.products) {
        setProducts((prevData) => [...prevData, ...parsedData.products]);
        setError("");
      }
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCount(count + 8);
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading data from server! Please wait...</h1>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  } else if (products.length > 0) {
    return (
      <div className="main-container">
        <div className="product-container">
          {products.map((item) => (
            <div className="product" key={item.id}>
              <img src={item.thumbnail} alt={item.description} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <hr /><br />
        <button onClick={handleClick} disabled={products.length >= itemsCount}>
          Load more items
        </button>
        {products.length >= itemsCount && (
            <p>No more items are available at the moment.</p>
        )}
      </div>
    );
  } else {
    return (
        <h1>No items are available at the moment. Please try again later!</h1>
    )
  }
};

export default LoadItems;
