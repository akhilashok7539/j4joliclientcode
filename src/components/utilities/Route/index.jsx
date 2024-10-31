import { Route as DefaultRoute, Redirect } from 'react-router-dom';
import { useRhinoState } from '../../context';

const Route = ({ children, ...rest }) => {
  const [user] = useRhinoState('user');

  return (
    <DefaultRoute
      {...rest}
      render={() => {
        return !user.is_user_logged_in ? (
          children
        ) : (
          <Redirect to={`/${user.user_type}/dashboard`} />
        );
      }}
    />
  );
};

export default Route;
