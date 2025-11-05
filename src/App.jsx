
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./app.css"
import Home from "./Home"
import Categories from "./Categories"
import Recipe from "./Recipe"
import Recipes from "./Recipes"
import SavedRecipes from "./SavedRecipes"
import Chatbot from "./Chatbot"
import Navb from "./navb"
function App() {

  return (
    <>
    <BrowserRouter>
    <Navb/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/saved" element={<SavedRecipes />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="*" element={ <h1>Error</h1> } />
          </Routes>
        </BrowserRouter>
    
    </>
  )
}

export default App
