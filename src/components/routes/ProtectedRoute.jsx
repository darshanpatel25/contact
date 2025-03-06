import { usePermissions } from "../../context/PermissionContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredPermissions, children }) => {
  const { permissions } = usePermissions();
  
  if (!permissions) {
    console.error("🚨 Permissions are undefined! Check PermissionContext.");
    return <Navigate to="/unauthorized" />;
  }
  
  const permissionList = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
  const hasPermission = permissionList.some((perm) => permissions.includes(perm));

  return hasPermission ? children : <Navigate to="/unauthorized" />;
};

// ✅ Correct default export
export default ProtectedRoute;
