import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Table from '../pages/Table';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    Table,
    SignUp,
  })
);
