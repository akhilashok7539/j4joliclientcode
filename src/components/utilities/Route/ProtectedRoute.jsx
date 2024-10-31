import { Route, Redirect } from 'react-router-dom';
import { useRhinoState } from '../../context';

const ProtectedRoute = ({ children, redirect, userType, ...rest }) => {
  const [user] = useRhinoState('user');

  return (
    <Route
      {...rest}
      render={() => {
        return user.is_user_logged_in === true && userType === user.user_type ? (
          children
        ) : (
          <Redirect to={redirect ? `${redirect}` : '/'} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
