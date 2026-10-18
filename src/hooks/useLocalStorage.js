import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {

  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem(key);

      if (savedData !== null) {
        return JSON.parse(savedData);
      }

      return initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving localStorage:", error);
    }
  }, [key, data]);

  return [data, setData];
}

export default useLocalStorage;