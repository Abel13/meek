import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Table from '../pages/Table';
import Menu from '../pages/Menu';
import Room from '../pages/Room';
import MatchList from '../pages/MatchList';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
    Menu,
    MatchList,
    Table,
    Room,
  })
);
