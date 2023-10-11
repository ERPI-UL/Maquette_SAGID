import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import UserRegistrationForm from './form/UserRegistrationForm'
import ChoixPlan from './form/ChoixPlan'
import ChoixPlanEntretien from './form/ChoixPlanEntretien'
import ChoixTerritoire from './form/ChoixTerritoire'
import ChoixBord from './form/ChoixBord'
import Blank from './pages/Blank'
import jsonData from "./data/data.json";
import React, { useState } from "react";
import Services from "./services/services.js"


function App() {
    // For storing and updating data
    const [currentData, setCurrentData] = useState(jsonData);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<MainLayout />}>
                    <Route index element={<ChoixTerritoire currentData={currentData}
                        setCurrentData={setCurrentData} redirect={"/plan-entretien"} /> } />
                    <Route path="plan-entretien" element={<ChoixPlanEntretien currentData={currentData}
                        setCurrentData={setCurrentData} redirect={"/dashboard"}/>} />
                    <Route path="dashboard" element={<Dashboard currentData={currentData}
                        setCurrentData={setCurrentData} />} action={() => {
                            console.log(currentData)
                            setCurrentData(Services.compute_kpi(currentData))
                            }}/>

                    <Route path="bord" element={<ChoixBord />} />
                    <Route path="user" element={<UserRegistrationForm />} />
                    <Route path="blank" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
