import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import UserRegistrationForm from './form/UserRegistrationForm'
import ChoixPlan from './form/ChoixPlan'
import ChoixTerri from './form/ChoixTerri'
import ChoixBord from './form/ChoixBord'
import Blank from './pages/Blank'
import jsonData from "./constants/data.json";
import React, { useState } from "react";

function App() {
    const [currentData, setCurrentData] = useState(jsonData); // For storing and updating data
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<MainLayout />}>
                    <Route index element={<Dashboard currentData={currentData}
                        setCurrentData={setCurrentData} />} />
                    <Route path="bord" element={<ChoixBord />} />
                    <Route path="territoire" element={<ChoixTerri />} />
                    <Route path="user" element={<UserRegistrationForm />} />
                    <Route path="plan" element={<ChoixPlan currentData={currentData}
                        setCurrentData={setCurrentData} />} />
                    
                    <Route path="blank" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
