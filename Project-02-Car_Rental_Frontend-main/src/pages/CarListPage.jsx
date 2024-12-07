import React from 'react';
import CarList from '../components/CarList';
function CarListPage() {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    
    }}>
      <h1 style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginTop:"10px"
          }}>Available Cars</h1>
      <CarList />
    </div>
  );
}

export default CarListPage;