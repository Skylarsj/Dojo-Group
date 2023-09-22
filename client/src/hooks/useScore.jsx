import {scoreContext} from '../context/ScoreContext';
import {useContext} from 'react';

export const useScoreContext = () => {
    const context = useContext(scoreContext);

    if (!context) {
        throw new Error("useScoreContext must be used within a scoreContextProvider");
    }

    return context;
}