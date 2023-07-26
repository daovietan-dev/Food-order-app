import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import useHttp from '../../hooks/use-http'

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ]

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])

  function mealDataHandle(data) {
    const loadedMeals = []

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
    }

    setMeals(loadedMeals)
  }

  const { sendRequest: fetchMeal, isLoading, error } = useHttp()

  useEffect(() => {
    fetchMeal(
      {
        url: `https://food-order-c9446-default-rtdb.firebaseio.com/meals.json`,
      },
      mealDataHandle
    )
  }, [])

  // nên tạo một biến helper để tránh làm JSX code trở nên khó nhìn
  const mealList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  if (isLoading) {
    return <section className={classes.isLoading}>Loading...</section>
  }

  if (error) {
    return <section className={classes.error}>{error}</section>
  }

  return (
    <section className={classes.meals}>
      {/* chúng ta sẽ sử dụng MealsArray để render thành một danh sách. */}
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
