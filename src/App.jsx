import { useState, useEffect } from 'react'
import Recipe from "./Recipe"
import Menu from './Menu'

function App() {
  
  const [allRecipes, setAllRecipes] = useState([])
  const [displayedRecipes, setDisplayedRecipes] = useState([])

  const filterAndSort = (filterFn, sortFn) => {
    const copy = [...allRecipes].filter(filterFn)
    copy.sort(sortFn)
    setDisplayedRecipes(copy)
  }

  // on mount
  useEffect(()=>{

    // This is an "IIFE" (immediately invoked function expression)
    (async () => {
      const res = await fetch(`https://dummyjson.com/recipes?limit=100`)
      const data = await res.json()
      setAllRecipes([...data.recipes])
      setDisplayedRecipes([...data.recipes])
    })();

  }, [])

  return (
    <>
      <Menu allRecipes={allRecipes} filterAndSort={filterAndSort} />
      <div id="recipes">
        {displayedRecipes.map(r => <Recipe key={r.id} recipe={r} />)}
      </div>
    </>
  )
}

export default App
