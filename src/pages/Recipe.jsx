import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getRecipeById } from '../data/recipes'
import RecipeDisplay from '../components/RecipeDisplay'
import './Recipe.css'

function Recipe() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [servings, setServings] = useState(1)

  useEffect(() => {
    const foundRecipe = getRecipeById(id)
    if (foundRecipe) {
      setRecipe(foundRecipe)
      setServings(foundRecipe.servings)
    }
  }, [id])

  if (!recipe) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Recipe not found</h2>
          <Link to="/">Return to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="recipe-page">
      <Link to="/" className="back-link">← Back to Recipes</Link>
      <RecipeDisplay recipe={recipe} servings={servings} setServings={setServings} />
    </div>
  )
}

export default Recipe

