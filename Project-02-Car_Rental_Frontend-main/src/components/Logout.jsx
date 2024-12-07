import React, { useEffect } from 'react'
import { removeToken } from '../utils/auth.utils'
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
    navigate("/");
  }, [navigate]);

  return null;
}

export default Logout