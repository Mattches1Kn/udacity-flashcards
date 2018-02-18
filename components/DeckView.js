import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NAVIGATION_ADD_CARD, NAVIGATION_QUIZ} from "./Navigation";
import {connect} from "react-redux";
import {fetchDeck} from "../utils/api";
import {black, white} from "../utils/colors";

class DeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params;
        return {
            title: name
        }
    };

    componentDidMount () {
        fetchDeck(this.props.dispatch, this.props.navigation.state.params.key);
    }

    render () {
        const { ready } = this.props;
        if (ready === false) {
            return <View style={styles.deckView}><Text>Loading deck ...</Text></View>
        }
        const {deck} = this.props;
        const numberOfCards = deck.cards.length;
        return (
            <View style={styles.deckView}>
                <Text style={styles.deckViewText}>This deck has {numberOfCards} card(s)</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(NAVIGATION_ADD_CARD, { key: this.props.deckKey } )} >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                {numberOfCards > 0 && (
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(NAVIGATION_QUIZ, {
                        key: this.props.deckKey,
                        name: this.props.deck.name
                    })}>
                        <Text>Start Quiz</Text>
                    </TouchableOpacity>)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    deckView: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: black,
    },
    deckViewText: {
        color: white,
        fontSize: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        borderRadius: 10,
        minHeight: 40,
        minWidth: 80,
        marginTop:40
    }
});

function mapStateToProps (state, { navigation }) {
    const { key } = navigation.state.params;
    return {
        deckKey: key,
        deck: state.deckView.deck,
        ready: state.deckView.ready
    }
}

export default connect(
    mapStateToProps
)(DeckView);
