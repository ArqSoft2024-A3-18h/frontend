import React, { useEffect, useState } from "react"
import { Route, Routes, useLocation} from 'react-router-dom';
import Forms from "../pages/Forms";
import NewForms from "../pages/NewForms";
import GameContainer from "../pages/GameContainer";
import CreateGame from "../pages/CreateGame";
import Leaderboard from "../pages/Leaderboard";
import AdminGamePreviewPage from "../pages/AdminGamePreviewPage";

const Router = () => {
    
    return(
        <>
        <Routes>
            <Route path='forms' element={<Forms/>}/>
            <Route path='forms/new' element={<NewForms/>}/>
            <Route path='games/new' element={<CreateGame/>}/>
            <Route path="/game/preview/:pin" element={<AdminGamePreviewPage/>}/>
            <Route path="leaderboard" element={<Leaderboard/>}/>
        </Routes>
        </>
    )
}

export default Router;