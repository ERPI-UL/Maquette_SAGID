import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import UserRegistrationForm from './form/UserRegistrationForm'
import ChoixPlan from './form/ChoixPlan'
import ChoixTerritoire from './form/ChoixTerritoire'
import ChoixBord from './form/ChoixBord'
import Blank from './pages/Blank'
import jsonData from "./data/data.json";
import React, { useState } from "react";
import Services from "./services/services.js"


function App() {
    // For storing and updating data
    const [currentData, setCurrentData] = useState(Services.compute_kpi(jsonData));
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<MainLayout />}>
                    <Route index element={<ChoixTerritoire currentData={currentData}
                        setCurrentData={setCurrentData} redirect={"/plan"} /> } />
                    <Route path="bord" element={<ChoixBord />} />
                    <Route path="user" element={<UserRegistrationForm />} />
                    <Route path="plan" element={<ChoixPlan currentData={currentData}
                        setCurrentData={setCurrentData} />} />
                    <Route path="dashboard" element={<Dashboard currentData={currentData}
                        setCurrentData={setCurrentData} />} />
                    <Route path="blank" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
