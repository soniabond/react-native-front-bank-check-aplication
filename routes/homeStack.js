import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/home'
import Login from '../screens/login'
import CategorySelect from '../screens/categorySelect';
import CategoryScreen from '../screens/categoryScreen';
import CategoryAnalitics from '../screens/categoryAnalitis';
import HorizontalPagedFlatList from '../screens/paginationGraph';
import AddNewCard from '../screens/addNewCartView';
import AddMonobankCard from '../screens/addMonoBankView';
import AddPrivatbankCard from '../screens/addPrivatView';
import ChangeLimit from '../screens/addLimitScreen';
import RegisterScreen from '../screens/registerView';
import 'react-native-gesture-handler';




const screens = {
  
    Login:{
        screen: Login,
        navigationOptions: {
          title: '',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
            
          }
    },
    RegisterScreen:{
      screen: RegisterScreen,
      navigationOptions: {
        title: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerMode: 'none',
        //header: null,
          headerShown: false,
          
        }
  },
    Home:{
        screen: Home, 
        navigationOptions: {
            headerShown: false,
            //gesturesEnabled: false
          }
          
    },

    AddNewCard: {
      screen: AddNewCard,
      navigationOptions: {
        title: '',
        headerStyle: {
         elevation: 0,
         shadowOpacity: 0,
         borderBottomWidth: 0,
       }
      }
    },
    AddMonobankCard: {
      screen: AddMonobankCard,
      navigationOptions: {
       title: '',
       headerStyle: {
         elevation: 0,
         shadowOpacity: 0,
         borderBottomWidth: 0,
       }
     }
    },
    AddPrivatbankCard: {
     screen: AddPrivatbankCard,
     navigationOptions: {
      title: '',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }
    }
   },

    HorizontalPagedFlatList : {
      screen: HorizontalPagedFlatList,
      navigationOptions: {
        title: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerMode: 'none',
        //header: null,
          headerShown: false,
          
        }
    },

    CategorySelect:{
        screen: CategorySelect, 
        header: '',
        navigationOptions: {
            title: '',
            headerStyle: {
            backgroundColor: '#F6F7F9',
            
          },

          headerMode: 'none',
          //header: null,
            headerShown: false,
            
            //gesturesEnabled: false
         
          }
    },

    CategoryAnalitics : {
      screen: CategoryAnalitics,
    },
    

    CategoryScreen:{
      screen: CategoryScreen,
      navigationOptions: {
      title: '',
      
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }}
      
    },

    ChangeLimit: {
      screen: ChangeLimit,
      navigationOptions: {
        title: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }

    }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);