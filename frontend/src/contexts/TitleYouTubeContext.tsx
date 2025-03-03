import React, { createContext, useState, useContext, ReactNode } from "react";

type TitleYouTubeContextType = {
  title: string;
  setTitle: (value: string) => void;
  youTubeUrl: string;
  setYouTubeUrl: (value: string) => void;
};

const TitleYouTubeContext = createContext<TitleYouTubeContextType | undefined>(undefined);

export const TitleYouTubeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [youTubeUrl, setYouTubeUrl] = useState("");

  return (
    <TitleYouTubeContext.Provider value={{ title, setTitle, youTubeUrl, setYouTubeUrl }}>
      {children}
    </TitleYouTubeContext.Provider>
  );
};

export const useTitleYouTubeContext = () => {
  const context = useContext(TitleYouTubeContext);
  if (!context) {
    throw new Error("useTitleYouTubeContext must be used within a TitleYouTubeProvider");
  }
  return context;
};
