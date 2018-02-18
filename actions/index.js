export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const RECEIVE_DECK = 'RECEIVE_DECK';
export const ADD_DECK = 'ADD_DECK';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks: decks,
        ready: true
    };
};

export function receiveDeck(decks, key) {
    let deck = decks[key];
    if (deck === undefined) {
        deck = {}
    }
    return {
        type: RECEIVE_DECK,
        deck: deck,
        ready: true
    };
};

export function addDeck(key, deck) {
    return {
        type: ADD_DECK,
        deck,
        deckKey:key
    }
}

