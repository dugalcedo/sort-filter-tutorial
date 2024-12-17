import { useState, useEffect } from "react"

function Menu({ allRecipes, filterAndSort }) {

    const allDifficulties = ["All", ...new Set(allRecipes.map(r => r.difficulty))]
    const allTags = ["All", ...new Set(allRecipes.reduce((tagArr, r) => {
        return [...tagArr, ...r.tags]
    }, []))]

    const [desc, setDesc] = useState(false)
    const [difficulty, setDifficulty] = useState("All")
    const [sort, setSort] = useState("")
    const [tags, setTags] = useState(["All"])

    useEffect(()=>{
        filterAndSort(
            // filter function
            (recipe)=>{
                const isDifficulty = difficulty === "All" || difficulty === recipe.difficulty;
                const hasTags = tags.includes("All") || tags.some(tag => recipe.tags.includes(tag));
                return isDifficulty && hasTags;
            },
            // sort function
            (recipeA, recipeB)=>{
                const a = desc ? recipeB : recipeA;
                const b = desc ? recipeA : recipeB;

                switch (sort) {
                    case "name":
                        return a.name.localeCompare(b.name);
                    case "calories":
                        return a.caloriesPerServing - b.caloriesPerServing;
                    case "time":
                        return (a.cookTimeMinutes + a.prepTimeMinutes) - (b.cookTimeMinutes + b.prepTimeMinutes); 
                }
            }
        )
    }, [desc, difficulty, sort, tags])

    return (
        <div className="menu">
            <label>
                Difficulty:
                <select defaultValue={difficulty} onChange={e => setDifficulty(e.target.value)}>
                    {allDifficulties.map(diff => <option value={diff} key={diff}>{diff}</option>)}
                </select>
            </label>
            <label>
                Tags:
                <select multiple defaultValue={tags} onChange={e => setTags([...e.target.selectedOptions].map(o => o.value))}>
                    {allTags.map(tag => <option value={tag} key={tag}>{tag}</option>)}
                </select>
            </label>
            <label>
                Sort:
                <select onChange={e => setSort(e.target.value)}>
                    <option value="">SELECT A SORT</option>
                    <option value="name">Name</option>
                    <option value="calories">Calories</option>
                    <option value="time">Time</option>
                </select>
            </label>
            <label>
                Descending:
                <input type="checkbox" defaultChecked={desc} onChange={e => setDesc(e.target.checked)} />
            </label>
        </div>
    )
}

export default Menu