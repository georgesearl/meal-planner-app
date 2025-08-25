import { useState } from 'react'

const placeholderRecipes = [
  {
    name: 'Overnight Espresso Oats',
    ingredients: ['45g oats', '125g coconut yoghurt', '60ml espresso'],
    instructions: ['Mix ingredients', 'Refrigerate overnight', 'Top with cacao nibs'],
    macros: { calories: 415, protein: 38, carbs: 41, fat: 11, fiber: 6 },
  },
  {
    name: 'Lemon Garlic Chicken Bowl',
    ingredients: ['200g chicken breast', '100g rice', '100g broccoli'],
    instructions: ['Marinate chicken', 'Grill chicken', 'Boil rice & steam broccoli'],
    macros: { calories: 520, protein: 45, carbs: 50, fat: 15, fiber: 8 },
  },
  {
    name: 'Salmon Nicoise',
    ingredients: ['180g salmon', '150g potatoes', '100g spinach'],
    instructions: ['Bake salmon', 'Boil potatoes', 'Mix with spinach'],
    macros: { calories: 560, protein: 42, carbs: 55, fat: 18, fiber: 7 },
  }
]

export default function MealPlanner() {
  const [calories, setCalories] = useState(2200)
  const [protein, setProtein] = useState(180)
  const [carbs, setCarbs] = useState(220)
  const [fat, setFat] = useState(70)
  const [fiber, setFiber] = useState(30)
  const [mealsPerDay, setMealsPerDay] = useState(4)
  const [plan, setPlan] = useState([])

  const generateMealPlan = () => {
    let chosen = []
    for (let i = 0; i < mealsPerDay; i++) {
      const r = placeholderRecipes[Math.floor(Math.random() * placeholderRecipes.length)]
      chosen.push(r)
    }

    const totals = chosen.reduce(
      (acc, meal) => {
        acc.calories += meal.macros.calories
        acc.protein += meal.macros.protein
        acc.carbs += meal.macros.carbs
        acc.fat += meal.macros.fat
        acc.fiber += meal.macros.fiber
        return acc
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    )

    setPlan([{ meals: chosen, totals }])
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-3xl font-bold mb-6'>Meal Planner</h1>

      <div className='grid grid-cols-2 gap-4 mb-6'>
        <input type='number' value={calories} onChange={e => setCalories(+e.target.value)} className='border p-2 rounded' placeholder='Calories' />
        <input type='number' value={protein} onChange={e => setProtein(+e.target.value)} className='border p-2 rounded' placeholder='Protein (g)' />
        <input type='number' value={carbs} onChange={e => setCarbs(+e.target.value)} className='border p-2 rounded' placeholder='Carbs (g)' />
        <input type='number' value={fat} onChange={e => setFat(+e.target.value)} className='border p-2 rounded' placeholder='Fat (g)' />
        <input type='number' value={fiber} onChange={e => setFiber(+e.target.value)} className='border p-2 rounded' placeholder='Fiber (g)' />
        <input type='number' value={mealsPerDay} onChange={e => setMealsPerDay(+e.target.value)} className='border p-2 rounded' placeholder='Meals per day' />
      </div>

      <button onClick={generateMealPlan} className='bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800'>Generate Plan</button>

      {plan.map((p, idx) => (
        <div key={idx} className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>Daily Meal Plan</h2>

          {p.meals.map((meal, i) => (
            <div key={i} className='bg-white p-4 rounded shadow mb-4'>
              <h3 className='text-lg font-semibold'>Meal {i + 1}: {meal.name}</h3>
              <p><strong>Ingredients:</strong> {meal.ingredients.join(', ')}</p>
              <p><strong>Instructions:</strong> {meal.instructions.join(' → ')}</p>
              <p><strong>Macros:</strong> {meal.macros.protein}P / {meal.macros.carbs}C / {meal.macros.fat}F / {meal.macros.fiber} Fiber ({meal.macros.calories} kcal)</p>
            </div>
          ))}

          <div className='bg-gray-200 p-4 rounded'>
            <h3 className='text-lg font-bold'>Totals</h3>
            <p>{p.totals.protein}P / {p.totals.carbs}C / {p.totals.fat}F / {p.totals.fiber} Fiber ({p.totals.calories} kcal)</p>
          </div>
        </div>
      ))}
    </div>
  )
}
