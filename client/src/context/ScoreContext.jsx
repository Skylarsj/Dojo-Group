import React, { createContext, useState} from 'react';


export const scoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [isScoreZero, setIsZero] = useState(true);

  return <scoreContext.Provider value={{ score, setScore, isScoreZero }}>{children}</scoreContext.Provider>;
};

export default scoreContext;
