import {AsyncStorage} from 'react-native';
import {addDeck, receiveDeck, receiveDecks} from "../actions/index";

const DECK_STORAGE_KEY = 'mattches:udacity:decks_v2';

export function fetchDecks(dispatch) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results => JSON.parse(results)))
        .then((decks) => {dispatch(receiveDecks(decks)) } );
}

export function createDeck(dispatch, key, deck) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [key]: deck
    })).then(() => {dispatch(addDeck(key, deck)) } );
}

export function fetchDeck(dispatch, key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results => JSON.parse(results)))
        .then((decks) => {dispatch(receiveDeck(decks,key)) } );
}


