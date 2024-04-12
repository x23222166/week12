import './App.css';
import UserSearch from './components/UserSearch.js';
import LoadItems from './components/LoadItems.js';
import LoadRecipes from './components/LoadRecipes.js';

function App() {
  return (
    <div className="App">
      <h2>User Search</h2>
      <UserSearch />
      <h2>Items</h2>
      <LoadItems />
      <hr /><br />
      <h2>Recipes</h2>
      <LoadRecipes />
    </div>
  );
}

export default App;
