import './QuantityCalculator.css'

function QuantityCalculator({ servings, setServings, baseServings }) {
  const handleDecrease = () => {
    if (servings > 1) {
      setServings(servings - 1)
    }
  }

  const handleIncrease = () => {
    setServings(servings + 1)
  }

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 1
    if (value >= 1) {
      setServings(value)
    }
  }

  return (
    <div className="quantity-calculator">
      <button onClick={handleDecrease} className="calc-btn" aria-label="Decrease servings">−</button>
      <input
        type="number"
        value={servings}
        onChange={handleChange}
        min="1"
        className="calc-input"
        aria-label="Number of servings"
      />
      <button onClick={handleIncrease} className="calc-btn" aria-label="Increase servings">+</button>
    </div>
  )
}

export default QuantityCalculator

