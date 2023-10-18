import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  if (isAuthenticated) {
    return children
  }
  return navigate({to:"/login"})

};
export default PrivateRoute;
