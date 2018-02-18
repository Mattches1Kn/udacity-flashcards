import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import FlipCard from 'react-native-flip-card';
import {black, green, grey, red, white} from "../utils/colors";
import {fetchDeck} from "../utils/api";
import {connect} from "react-redux";
import {Ionicons} from '@expo/vector-icons';

class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params;
        return {
            title: 'Quiz "' + name + '"'
        }
    };

    state = {
        currentPos : 0,
        showNextButton : false,
        showButtons : true,
        counterCorrect : 0,
        flipCard: false,
        bounceValue: new Animated.Value(1),
    };

    componentDidMount () {
        fetchDeck(this.props.dispatch, this.props.navigation.state.params.key);
    }

    flipCard = () => {
        this.setState( () => ({flipCard : !this.state.flipCard}));
    };

    clickedCorrect = () => {
        this.setState( () => ({counterCorrect : this.state.counterCorrect + 1, showNextButton : true, showButtons : false}));
    };

    clickedIncorrect = () => {
        this.setState( () => ({counterIncorrect : this.state.counterIncorrect + 1, showNextButton : true, showButtons : false}));
    };

    nextCard = () => {
        this.setState( () => ({currentPos : this.state.currentPos + 1, flipCard : false, showNextButton : false, showButtons : true}));
    };

    restart = () => {
        this.setState( () => ({currentPos : 0, flipCard : false, showNextButton : false, showButtons : true, counterCorrect : 0}));
    };

    render () {
        let nextLabel = 'Next';
        const { ready } = this.props;
        if (ready === false) {
            return (
                <View style={styles.quizView}>
                    <Text>Loading Quiz</Text>
                </View>)
        }
        const {currentPos, counterCorrect, bounceValue} = this.state;
        const {deck} = this.props;
        const numberOfCards = deck.cards.length;
        if ((currentPos +1) === numberOfCards) {
            nextLabel = 'Show Score';
        }
        if (currentPos >= numberOfCards) {
            const percent = Math.round((counterCorrect/numberOfCards) * 10000) / 100;
            if (counterCorrect === numberOfCards) {
                Animated.sequence([
                    Animated.timing(bounceValue, { duration: 200, toValue: 0.9}),
                    Animated.timing(bounceValue, { duration: 200, toValue: 1.1}),
                    Animated.timing(bounceValue, { duration: 200, toValue: 0.9}),
                    Animated.timing(bounceValue, { duration: 200, toValue: 1.1}),
                ]).start();
            }

            return (
                <View style={styles.quizView}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>End of Quiz</Text>
                    </View>
                    <Animated.Text
                        style={[styles.headerText, {transform: [{scale: bounceValue}]}]}>
                        Your score: {percent} % &nbsp;&nbsp;
                        {(counterCorrect === numberOfCards) && (<Ionicons name='ios-thumbs-up-outline' size={20} color={red} />)}
                        {(counterCorrect === 0) && (<Ionicons name='ios-thumbs-down-outline' size={20} color={red} />)}
                    </Animated.Text>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => this.restart()}>
                            <Text>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
                            <Text>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
        }
        const currentQuestion = deck.cards[currentPos].question;
        const currentAnswer = deck.cards[currentPos].answer;

        return (
            <View style={styles.quizView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Card {(currentPos + 1)} of {numberOfCards}</Text>
                </View>
                <View style={styles.flipView}>
                    <FlipCard
                        style={styles.card}
                        friction={6}
                        perspective={1000}
                        flipHorizontal={true}
                        flipVertical={false}
                        flip={this.state.flipCard}
                        clickable={true}
                    >
                        {/* Face Side */}
                        <View style={styles.face}>
                            <Text style={styles.faceText}>{currentQuestion}</Text>
                        </View>
                        {/* Back Side */}
                        <View style={styles.back}>
                            <Text style={styles.backText}>{currentAnswer}</Text>
                        </View>
                    </FlipCard>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: grey}]} onPress={() => this.flipCard()}>
                        <Text>{!this.state.flipCard && ('Show answer')}{this.state.flipCard && ('Show question')}</Text>
                    </TouchableOpacity>
                    {this.state.showButtons && (
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={[styles.button, {backgroundColor:green}]} onPress={() => this.clickedCorrect()}>
                                <Text>Correct</Text>
                            </TouchableOpacity>
                            <Text>&nbsp;</Text>
                            <TouchableOpacity style={[styles.button, {backgroundColor:red}]} onPress={() => this.clickedIncorrect()}>
                                <Text>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                        )}
                    {this.state.showNextButton && (
                        <TouchableOpacity style={styles.button} onPress={() => this.nextCard()}>
                            <Text>{nextLabel}</Text>
                        </TouchableOpacity>)}
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    quizView : {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:black
    },
    flipView: {
        backgroundColor: black,
        flex:1,
        margin:30
    },
    card: {
        borderRadius: 15,
        backgroundColor: grey,
        minHeight:100
    },
    face: {
        margin:10,
        borderRadius: 15,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    faceText : {
        color:white,
        fontSize:20
    },
    back: {
        margin:10,
        borderRadius: 15,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    backText : {
        color:white,
        fontSize:20
    },
    header: {
        backgroundColor:black,
        height:40
    },
    headerText : {
        color:white,
        backgroundColor: black,
        fontSize:20,
    },
    buttons : {
        minHeight:100
    },
    button: {
        backgroundColor: white,
        borderRadius: 15,
        minHeight: 50,
        minWidth: 100,
        padding: 10,
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center'
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
)(Quiz);
