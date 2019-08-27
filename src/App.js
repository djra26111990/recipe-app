import React, {useEffect, useState} from 'react';
import Recipe from "./Recipe";
import "./App.css"

const App = () => {
  
  const APP_ID = "6aaf27fa";
  const APP_KEY = "2bae6eb821dd44a4f3dcbc954fbb16df";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  }

const updateSearch = e => {
  setSearch(e.target.value)
}

const getQuery = e => {
  e.preventDefault()
  setQuery(search)
  setSearch('');
}

  return(
    <div className="App">
        <form onSubmit={getQuery} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">Search</button>
        </form>
        <div className="recipes">
          {recipes.map(recipe => (
            <Recipe 
              key={recipe.recipe.calories}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
    </div>
  )
}

export default App;
