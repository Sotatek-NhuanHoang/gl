import { createStackNavigator } from 'react-navigation';


// LoginSignup
import AppIntroScreen from '@gl/screen/LoginSignup/AppIntroScreen/AppIntroScreen';


const AppNavigator = createStackNavigator({
    AppIntroScreen: AppIntroScreen,
});

  
export default AppNavigator;
