import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Home from './screens/Home';
import EnteredId from './screens/EnteredId';
import RandomId from './screens/RandomId';
const AppNavigator = createStackNavigator(
  {
    Home: Home,
    EnteredId: EnteredId,
    RandomId: RandomId
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}