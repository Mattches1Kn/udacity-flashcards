import {RECEIVE_DECKS} from '../actions';
import {combineReducers} from "redux";
import {ADD_DECK, RECEIVE_DECK} from "../actions/index";

function deckList (state = {ready:false,decks:[]}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                decks: action.decks,
                ready: true,
            };
        case ADD_DECK :
            let decks = state.decks;
            if (null === decks || "object" !== typeof decks) {
                decks = {};
            }
            decks[action.deckKey] = action.deck;
            return {
                ...state,
                decks: clone(decks)//clone of items,
            };
        default :
            return state
    }
}

function deckView (state = {ready:false,deck:{}}, action) {
    switch (action.type) {
        case RECEIVE_DECK:
        case ADD_DECK:
            return {
                ...state,
                deck: action.deck,
                ready: true,
            };
        default :
            return state
    }
}

function clone(obj) {
    if (null === obj || "object" !== typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export default combineReducers({
    deckList, deckView
});
