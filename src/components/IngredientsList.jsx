import './IngredientsList.css'

function IngredientsList({ ingredients, servings, baseServings, onIngredientChange }) {
  const multiplier = servings / baseServings

  const formatQuantity = (quantity, unit) => {
    const adjustedQuantity = (quantity * multiplier).toFixed(2)
    // Remove trailing zeros
    const cleanQuantity = parseFloat(adjustedQuantity)
    return `${cleanQuantity} ${unit}`
  }

  const formatPrice = (price, multiplier) => {
    return (price * multiplier).toFixed(2)
  }

  return (
    <div className="ingredients-list">
      <table className="ingredients-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => {
            const adjustedQuantity = ingredient.quantity * multiplier
            const adjustedPrice = (ingredient.price || 0) * multiplier
            const isOptional = ingredient.optional

            return (
              <tr key={index} className={isOptional ? 'optional' : ''}>
                <td className="ingredient-name">
                  {ingredient.name}
                  {isOptional && <span className="optional-badge">(optional)</span>}
                  {ingredient.note && <span className="ingredient-note">({ingredient.note})</span>}
                </td>
                <td className="ingredient-quantity">
                  <input
                    type="number"
                    value={adjustedQuantity.toFixed(2)}
                    onChange={(e) => {
                      const newQuantity = parseFloat(e.target.value) / multiplier
                      onIngredientChange(index, 'quantity', newQuantity)
                    }}
                    step="0.1"
                    min="0"
                    className="quantity-input"
                  />
                  <span className="unit-display">{ingredient.unit}</span>
                </td>
                <td className="ingredient-price">
                  {ingredient.price ? (
                    <>
                      <span>R{formatPrice(adjustedPrice, 1)}</span>
                      {ingredient.pricePerUnit && (
                        <span className="price-per-unit">
                          (R{ingredient.pricePerUnit}/{ingredient.priceUnit})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="no-price">Price not available</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="ingredients-footer">
        <p className="servings-info">
          Quantities adjusted for <strong>{servings}</strong> serving{servings !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}

export default IngredientsList

