import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonCar({ onViewChange }) {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onViewChange(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      style={{ border: '1px solid whitesmoke', borderRadius: '5px' }} 
    >
      <ToggleButton value="web" style={{ color: alignment === 'web' ? '#1976d2' : 'white', borderRight: '1px solid white',transition: 'background-color 0.3s ease' }} sx={{
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    },
  }}>Profile</ToggleButton>
      <ToggleButton value="android" style={{ color: alignment === 'android' ? '#1976d2' : 'white', borderRight: '1px solid white',transition: 'background-color 0.3s ease' }} sx={{
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    },
  }}>Owned</ToggleButton>
      <ToggleButton value="ios" style={{ color: alignment === 'ios' ? '#1976d2' : 'white',transition: 'background-color 0.3s ease' }} sx={{
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  }}>Rented</ToggleButton>
    </ToggleButtonGroup>
  );
}
