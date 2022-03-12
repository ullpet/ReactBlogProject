import React from "react";
import "./appheader.css";

const AppHeader = ({like, all}) => {
    return (
        <div className="app-header d-flex">
            <h1>Petrova Juilie</h1>
            <h2>{all} записей, из них понравилось {like}</h2>
        </div>
    )
}

export default AppHeader;