import React from 'react'
import './App.css';


import { AuthProvider } from "../context/AuthContext";
import { PrimaryLayout } from "./PrimaryLayout";

// import history from "../history";



const App = () => {







  return (
    <div>
      <AuthProvider >
        <PrimaryLayout />
      </AuthProvider>


    </div>
  )

}

export default App