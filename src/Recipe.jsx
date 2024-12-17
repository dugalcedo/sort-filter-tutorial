import { useState } from "react"

function Recipe({ recipe }) {

    const [shown, setShown] = useState(false)

    return (
        <div className="recipe">
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} />
            <p>Calories per serving: {recipe.caloriesPerServing}</p>
            <p>Time to cook: {recipe.cookTimeMinutes + recipe.prepTimeMinutes} minutes</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <button onClick={() => setShown(!shown)}>
                {shown ? "Hide" : "Show"} Recipe {shown ? "▲" : "▼"}
            </button>
            {shown && (
                <div className="recipe-info">
                    <h4>Ingredients</h4>
                    <ul>
                        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <h4>Instructions</h4>
                    <ol>
                        {recipe.instructions.map(ing => <li key={ing}>{ing}</li>)}
                    </ol>
                </div>
            )}
        </div>
    )
}

export default Recipe