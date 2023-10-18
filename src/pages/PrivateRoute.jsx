import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0()
  
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/login")
    }
  },[])
  // if (isAuthenticated) {
    return children
  // }

};
export default PrivateRoute;
