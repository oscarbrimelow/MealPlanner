import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import ShoppingList from './pages/ShoppingList'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </div>
  )
}

export default App

