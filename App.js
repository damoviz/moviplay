import React from 'react';
import { Platform,Image } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Feather } from '@expo/vector-icons';

import HomeScreen from './app/screens/HomeScreen';
import MovieListScreen from './app/screens/MovieListScreen';
import MovieDetailsScreen from './app/screens/MovieDetailsScreen';
import SearchScreen from './app/screens/SearchScreen';
import SearchResultsScreen from './app/screens/SearchResultsScreen';
import WebViewScreen from './app/screens/WebViewScreen';
import { theme } from './app/utils/constants';

const TitleMovieTab = 'Movies';
const TitleSearchTab = 'Search';
const TitleWebView = 'Trailer';

const MoviesTab = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: (
          <Image 
            style={{marginLeft:20,width: 50, height: 40}}
            source={require('./app/assets/images/tmdb.png')} />        
        ),
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.black
        }
      }
    },
    MovieList: {
      screen: MovieListScreen,
      navigationOptions: {
        title: TitleMovieTab,
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.black
        }
      }
    },
    MovieDetails: {
      screen: MovieDetailsScreen,
      navigationOptions: {
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.black
        }
      }
    },
    WebView: {
      screen: WebViewScreen,
      navigationOptions: {
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.black
        },
        title: TitleWebView
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);

MoviesTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="film" size={20} color={tintColor} />
  )
};

const SearchTab = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: null,
      }
    },
    SearchResults: {
      screen: SearchResultsScreen,
      navigationOptions: {
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.black
        }
      }
    },
    MovieDetails: {
      screen: MovieDetailsScreen,
      navigationOptions: {
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.black
        }
      }
    },
    WebView: {
      screen: WebViewScreen,
      navigationOptions: {
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.black
        },
        title: TitleWebView
      }
    }
  },
  {
    initialRouteName: 'Search'
  }
);

SearchTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="search" size={20} color={tintColor} />
  )
};

const MovieListTabBarVisible = navigation => {
  const { routes } = navigation.state;
  if (routes && routes.length > 0) {
    const route = routes[routes.length - 1];
    if (
      route.routeName === 'MovieDetails' ||
      route.routeName === 'WebView' ||
      route.routeName === 'SearchResults'
    ) {
      return false;
    }
  }
  return true;
};

const MainNavigator =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(
        {
          Movie: {
            screen: MoviesTab,
            navigationOptions: ({ navigation }) => ({
              title: TitleMovieTab,
              tabBarVisible: MovieListTabBarVisible(navigation)
            })
          },
          Search: {
            screen: SearchTab,
            navigationOptions: ({ navigation }) => ({
              title: TitleSearchTab,
              tabBarVisible: MovieListTabBarVisible(navigation)
            })
          }
        },
        {
          tabBarOptions: {
            activeTintColor: '#F95F62',
            inactiveTintColor: '#8190A5',
            showIcon: true,
            labelStyle: {
              margin: 0,
              padding: 2
            },
            style: {
              backgroundColor: '#ffffff'
            }
          },
          animationEnabled: false,
          swipeEnabled: false
        }
      )
    : createMaterialBottomTabNavigator(
        {
          Movie: {
            screen: MoviesTab,
            navigationOptions: ({ navigation }) => ({
              title: TitleMovieTab,
              tabBarVisible: MovieListTabBarVisible(navigation)
            })
          },
          Search: {
            screen: SearchTab,
            navigationOptions: ({ navigation }) => ({
              title: TitleSearchTab,
              tabBarVisible: MovieListTabBarVisible(navigation)
            })
          },
        },
        {
          initialRouteName: 'Movie',
          activeTintColor: theme.colors.primary,
          inactiveTintColor: theme.colors.white,
          shifting: true,
          barStyle: {
            backgroundColor: theme.colors.black,
            paddingTop: 2,
            paddingBottom: 2
          }
        }
      );

const AppNavigator = createSwitchNavigator(
  {
    Main: MainNavigator
  },
  {
    initialRouteName: 'Main'
  }
);

export default createAppContainer(AppNavigator);
