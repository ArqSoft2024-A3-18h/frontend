import React from "react";
import { Link } from "react-router-dom";

const Forms = () => {
    return(
        <div>
            <h1>Forms List</h1>
            <Link to="new" className="text-blue-500">Create New Form</Link>
        </div>
    )

}

export default Forms;
