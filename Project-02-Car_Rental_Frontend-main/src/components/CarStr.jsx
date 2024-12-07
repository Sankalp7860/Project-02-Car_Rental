import React from 'react'
// import CarDisplay from './carDisplay'
import Car_Card from './Car_Card'
import Car_Rented from './Car_Rented'

const CarStr = ({cars,sec}) => {
  return (
    cars && cars.length > 0 ? (
      cars.map((car, index) => (
        (car.total_cost>0 && sec=="Rented") ? <Car_Rented key={index} car={car} />:<Car_Card key={index} car={car} />
      ))
    ) : (
      <p>No cars available</p>
    )
  )
}

export default CarStr