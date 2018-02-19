import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import AddDeck from "./../components/AddDeck";
import DeckList from "./../components/DeckList";
import DeckView from "./../components/DeckView";
import AddCard from "./../components/AddCard";
import Quiz from "./../components/Quiz";
import { Ionicons } from '@expo/vector-icons';
import {black, red, white} from "../utils/colors";

export const NAVIGATION_HOME = 'Home';
export const NAVIGATION_QUIZ = 'Quiz';
export const NAVIGATION_ADD_DECK = 'AddDeck';
export const NAVIGATION_ADD_CARD = 'AddCard';
export const NAVIGATION_DECK_VIEW = 'DeckView';

const HomeTabs = TabNavigator({
    NAVIGATION_DECK_LIST: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums-outline' size={30} color={tintColor} />
        },
        tabBarOptions : {
            headerTitle: 'Decks',
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
        },
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: red,
        style: {
            height: 56,
            backgroundColor: black,
            shadowColor: 'rgba(255, 255, 255, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

const MainNavigator = StackNavigator({
    Home: {
        screen: HomeTabs,
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black,
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black,
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black,
            }
        }
    }
});

export default MainNavigator;
