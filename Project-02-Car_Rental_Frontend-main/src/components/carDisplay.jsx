import React from 'react'

const CarDisplay = ({cars}) => {
  return (
    cars && cars.length > 0 ? (
      cars.map((car, index) => (
        <div key={car.car_id}>
          <h2>{car.make}</h2>
          <p>{car.model}</p>
          <p>{car.year}</p>
          <p>{car.color}</p>
          <p>{car.daily_rate}</p>
          <p>{car.status}</p>
          <p>{car.provider_id}</p>
          <img src={car.image_url} alt={car.make} />
          {/* Add more properties as needed */}
        </div>
      ))
    ) : (
      <p>No cars available</p>
    )
  )
}

export default CarDisplay