import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CollapsibleSection from './CollapsibleSection'
import IngredientsList from './IngredientsList'
import Instructions from './Instructions'
import StorageReheating from './StorageReheating'
import InstagramEmbed from './InstagramEmbed'
import QuantityCalculator from './QuantityCalculator'
import './RecipeDisplay.css'

function RecipeDisplay({ recipe, servings, setServings }) {
  const [ingredients, setIngredients] = useState(recipe.ingredients)
  const [isCollapsed, setIsCollapsed] = useState({
    ingredients: false,
    instructions: false,
    storage: false,
    video: false,
  })

  useEffect(() => {
    // Reset ingredients when recipe changes
    setIngredients(recipe.ingredients)
  }, [recipe.id])

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients]
    if (field === 'quantity') {
      updated[index] = { ...updated[index], quantity: parseFloat(value) || 0 }
    } else if (field === 'unit') {
      updated[index] = { ...updated[index], unit: value }
    } else if (field === 'price') {
      updated[index] = { ...updated[index], price: parseFloat(value) || 0 }
    }
    setIngredients(updated)
  }

  const calculateTotalCost = () => {
    const baseCost = ingredients.reduce((sum, ing) => sum + (ing.price || 0), 0)
    return (baseCost * servings / recipe.servings).toFixed(2)
  }

  const calculateCalories = () => {
    return (recipe.calories * servings / recipe.servings).toFixed(0)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleAddToShoppingList = () => {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList') || '[]')
    const recipeIngredients = ingredients.map(ing => {
      const multiplier = servings / recipe.servings
      return {
        ...ing,
        recipeName: recipe.name,
        servings: servings,
        recipeServings: recipe.servings,
        quantity: ing.quantity * multiplier, // Store adjusted quantity
      }
    })
    shoppingList.push(...recipeIngredients)
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
    alert('Recipe added to shopping list!')
  }

  return (
    <div className="recipe-display">
      <div className="recipe-header">
        <div className="recipe-title-section">
          <span className="recipe-day-badge">{recipe.day}</span>
          <h1 className="recipe-name">{recipe.name}</h1>
          {recipe.batch && <p className="recipe-batch-info">{recipe.batch}</p>}
        </div>
        <div className="recipe-actions">
          <button onClick={handlePrint} className="btn-print">Print Recipe</button>
          <button onClick={handleAddToShoppingList} className="btn-shopping">
            Add to Shopping List
          </button>
        </div>
      </div>

      <div className="recipe-meta">
        <div className="meta-item">
          <span className="meta-label">Servings:</span>
          <QuantityCalculator
            servings={servings}
            setServings={setServings}
            baseServings={recipe.servings}
          />
        </div>
        <div className="meta-item">
          <span className="meta-label">Calories:</span>
          <span className="meta-value">{calculateCalories()} cal</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Total Cost:</span>
          <span className="meta-value">R{calculateTotalCost()}</span>
        </div>
      </div>

      {recipe.instagramUrl && (
        <CollapsibleSection
          title="Video Tutorial"
          isCollapsed={isCollapsed.video}
          onToggle={() => setIsCollapsed({ ...isCollapsed, video: !isCollapsed.video })}
        >
          <InstagramEmbed url={recipe.instagramUrl} />
        </CollapsibleSection>
      )}

      <CollapsibleSection
        title="Ingredients"
        isCollapsed={isCollapsed.ingredients}
        onToggle={() => setIsCollapsed({ ...isCollapsed, ingredients: !isCollapsed.ingredients })}
      >
        <IngredientsList
          ingredients={ingredients}
          servings={servings}
          baseServings={recipe.servings}
          onIngredientChange={handleIngredientChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="Instructions"
        isCollapsed={isCollapsed.instructions}
        onToggle={() => setIsCollapsed({ ...isCollapsed, instructions: !isCollapsed.instructions })}
      >
        <Instructions instructions={recipe.instructions} notes={recipe.notes} />
      </CollapsibleSection>

      <CollapsibleSection
        title="Storage & Reheating"
        isCollapsed={isCollapsed.storage}
        onToggle={() => setIsCollapsed({ ...isCollapsed, storage: !isCollapsed.storage })}
      >
        <StorageReheating storage={recipe.storage} reheating={recipe.reheating} />
      </CollapsibleSection>
    </div>
  )
}

export default RecipeDisplay

