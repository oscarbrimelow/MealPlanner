import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ShoppingList.css'

function ShoppingList() {
  const [shoppingList, setShoppingList] = useState([])
  const [groupedItems, setGroupedItems] = useState({})

  useEffect(() => {
    loadShoppingList()
  }, [])

  const loadShoppingList = () => {
    const stored = JSON.parse(localStorage.getItem('shoppingList') || '[]')
    setShoppingList(stored)
    groupItems(stored)
  }

  const groupItems = (items) => {
    const grouped = {}
    items.forEach(item => {
      const key = item.name.toLowerCase().trim()
      if (!grouped[key]) {
        grouped[key] = {
          name: item.name,
          totalQuantity: 0,
          unit: item.unit,
          recipes: [],
          price: item.price || 0,
          pricePerUnit: item.pricePerUnit,
          priceUnit: item.priceUnit,
        }
      }
      // Quantity is already adjusted when added to shopping list
      grouped[key].totalQuantity += item.quantity || 0
      if (item.recipeName && !grouped[key].recipes.includes(item.recipeName)) {
        grouped[key].recipes.push(item.recipeName)
      }
    })
    setGroupedItems(grouped)
  }

  const clearShoppingList = () => {
    if (window.confirm('Are you sure you want to clear the entire shopping list?')) {
      localStorage.removeItem('shoppingList')
      setShoppingList([])
      setGroupedItems({})
    }
  }

  const removeItem = (itemName) => {
    const updated = shoppingList.filter(item => item.name.toLowerCase().trim() !== itemName.toLowerCase().trim())
    localStorage.setItem('shoppingList', JSON.stringify(updated))
    loadShoppingList()
  }

  const calculateTotalCost = () => {
    return Object.values(groupedItems).reduce((sum, item) => {
      // Calculate cost based on price per unit if available, otherwise use base price
      if (item.pricePerUnit && item.priceUnit) {
        // Convert to common unit for calculation (simplified)
        // This is approximate - prices are already scaled per ingredient
        const baseQuantity = item.totalQuantity
        // Use the stored price which is already per unit
        return sum + (item.price * baseQuantity)
      } else {
        return sum + (item.price * item.totalQuantity)
      }
    }, 0).toFixed(2)
  }

  return (
    <div className="shopping-list-page">
      <header className="shopping-list-header">
        <Link to="/" className="back-link">← Back to Recipes</Link>
        <h1>Shopping List</h1>
        {Object.keys(groupedItems).length > 0 && (
          <button onClick={clearShoppingList} className="btn-clear">
            Clear All
          </button>
        )}
      </header>

      {Object.keys(groupedItems).length === 0 ? (
        <div className="empty-shopping-list">
          <p>Your shopping list is empty.</p>
          <p>Add recipes to your shopping list from individual recipe pages.</p>
          <Link to="/" className="btn-primary">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <>
          <div className="shopping-list-summary">
            <div className="summary-item">
              <span className="summary-label">Total Items:</span>
              <span className="summary-value">{Object.keys(groupedItems).length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Estimated Cost:</span>
              <span className="summary-value">R{calculateTotalCost()}</span>
            </div>
          </div>

          <div className="shopping-list-items">
            {Object.entries(groupedItems).map(([key, item]) => (
              <div key={key} className="shopping-item">
                <div className="item-header">
                  <div className="item-name-section">
                    <h3 className="item-name">{item.name}</h3>
                    {item.recipes.length > 0 && (
                      <span className="item-recipes">
                        {item.recipes.join(', ')}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="btn-remove"
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
                <div className="item-details">
                  <div className="item-quantity">
                    <span className="quantity-value">
                      {item.totalQuantity.toFixed(2)}
                    </span>
                    <span className="quantity-unit">{item.unit}</span>
                  </div>
                  {item.price > 0 && (
                    <div className="item-price">
                      <span>R{(item.price * item.totalQuantity).toFixed(2)}</span>
                      {item.pricePerUnit && (
                        <span className="price-per-unit">
                          (R{item.pricePerUnit}/{item.priceUnit})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="shopping-list-actions">
            <button onClick={() => window.print()} className="btn-print">
              Print Shopping List
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ShoppingList

