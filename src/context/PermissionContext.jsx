import { createContext, useContext, useState, useEffect } from "react";

const PermissionContext = createContext(null);

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
};

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Fetch permissions from localStorage or an API
    const storedPermissions = JSON.parse(localStorage.getItem("permissions")) || [];
    console.log("PermissionContext → Loaded permissions:", storedPermissions);
    
    setPermissions(storedPermissions);
  }, []);

  return (
    <PermissionContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
};
