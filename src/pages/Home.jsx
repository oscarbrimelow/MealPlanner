import { Link } from 'react-router-dom'
import { recipes } from '../data/recipes'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Weekly Meal Planner</h1>
        <p className="subtitle">Delicious, batch-cooked meals for the week</p>
        <Link to="/shopping-list" className="btn-shopping-list">
          View Shopping List
        </Link>
      </header>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card">
            <div className="recipe-card-header">
              <span className="recipe-day">{recipe.day}</span>
              <span className="recipe-calories">{recipe.calories} cal</span>
            </div>
            <h2 className="recipe-name">{recipe.name}</h2>
            <div className="recipe-info">
              <span className="recipe-servings">{recipe.servings} serving</span>
              {recipe.batch && <span className="recipe-batch">{recipe.batch}</span>}
            </div>
          </Link>
        ))}
      </div>

      <div className="home-footer">
        <h2>Batch Cooking Tips</h2>
        <ul>
          <li>Cook all proteins first → cool.</li>
          <li>Bake sides (potatoes, pasta, tortillas) → cool.</li>
          <li>Assemble all meals in airtight containers → freeze flat.</li>
          <li>Thaw overnight in fridge before eating.</li>
          <li>Add 1 tsp milk or water to cheesy meals while reheating if needed for creaminess.</li>
        </ul>
      </div>
    </div>
  )
}

export default Home

