import React from 'react'
import './dashboard-wrapper.scss'

const DashboardWrapper = props => {
    return (
        <div className='dashboard-wrapper'>
            {props.children}
        </div>
    )
}

export default DashboardWrapper

// Partie gauche de l'écran, contient le Header et le Main

export const DashboardWrapperMain = props => {
    return (
        <div className='dashboard-wrapper__main'>
            {props.children}
        </div>
    )
}

// Partie droite de l'écran, contient la Sidebar

export const DashboardWrapperRight = props => {
    return (
        <div className='dashboard-wrapper__right'>
            {props.children}
        </div>
    )
}