import React from 'react'; // Import the React library
import './box.scss'; // Import the CSS styles for the Box component

const Box = props => {

    // Define an object to hold CSS class names based on props
    const className = {
        box: 'box', // Default class, always present
        purple: props.purple && 'box-purple', // Add 'box-purple' class if 'purple' prop is true
        fullheight: props.fullheight && 'box-fullheight', // Add 'box-fullheight' class if 'fullheight' prop is true
        small: props.small && 'box-small', // Add 'box-small' class if 'small' prop is true
    }

    return (
        <div className={Object.values(className).join(' ')}> {/* Render a div with combined class names */}
            {props.children} {/* Render the child elements passed to the Box component */}
        </div>
    )
}

export default Box; // Export the Box component as the default export
