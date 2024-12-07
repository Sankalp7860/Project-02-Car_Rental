import React, { useState } from 'react';
import axios from 'axios';

const UploadImage2 = ({imageLink , setImageLink , selectedFile , setSelectedFile}) => {
//   const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  

  return (
      <input type="file" onChange={handleFileChange} className="upload-input" />
  );
};

export default UploadImage2;
