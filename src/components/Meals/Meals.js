import React from 'react'
import MealsSummary from './MealsSummary'
import AvailableMeals from './AvailableMeals'

// Meals component chứa 2 blocks về chịu trách nhiệm hiển thị hiểu thị lời giới thiệu và danh sách Meals có thể order
const Meals = () => {
  const test = `{}`

  return (
    <>
      <MealsSummary test={test} />
      <AvailableMeals />
    </>
  )
}

export default Meals
