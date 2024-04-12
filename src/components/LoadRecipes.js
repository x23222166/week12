import { useState, useEffect } from "react";

const LoadRecipes = () => {
  const itemsCount = 100;
  const [count, setCount] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    retrieveItems();
  }, [count]);

  const retrieveItems = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `https://dummyjson.com/recipes?limit=8&skip=${count}`
      );
      const parsedData = await data.json();

      if (parsedData.recipes) {
        setRecipes((prevData) => [...prevData, ...parsedData.recipes]);
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
  } else if (recipes.length > 0) {
    return (
      <div className="main-container">
        <div className="recipe-container">
          {recipes.map((item) => (
            <div className="recipe" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <h3>Ingredients</h3>
              <ul>
                {item.ingredients.map((ingredient, index) => {
                  return (
                  <li key={index}>
                    {ingredient}
                  </li>
                  )
                })}
              </ul>
              <h3>Instructions</h3>
              <ol>
              {item.instructions.map((instruction, index) => {
                  return (
                  <li key={index}>
                    {instruction}
                  </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </div>
        <hr /><br />
        <button onClick={handleClick} disabled={recipes.length >= itemsCount}>
          Load more recipes
        </button>
        {recipes.length >= itemsCount && (
            <p>No more recipes are available at the moment.</p>
        )}
      </div>
    );
  } else {
    return (
        <h1>No recipes are available at the moment. Please try again later!</h1>
    )
  }
};

export default LoadRecipes;
