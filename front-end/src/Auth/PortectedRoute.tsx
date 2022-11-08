import {
    Navigate,
    Outlet,
    useLocation,
  } from 'react-router-dom';


  // import { useAuth } from '../utils/auth';
  
  function ProtectedRoute({
    
    children
  }: any) {
    
    const location = useLocation();
    const redirectPath = '/login'
    const token = localStorage.getItem("auth");
    const isTrained = localStorage.getItem("trained");
  
    if (!token && !isTrained) {
      return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }
    if (token && isTrained && isTrained === 'false') {
      return <Navigate to={'/Traine'} replace state={{ from: location }} />;
    }else{

      return children || <Outlet />;
    }
    
  }
  
  export default ProtectedRoute;