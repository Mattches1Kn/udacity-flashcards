import React, { Component } from 'react';
import {View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet} from 'react-native';
import {createDeck} from "../utils/api";
import {FormInput, FormLabel} from "react-native-elements";
import {connect} from "react-redux";
import {black, white} from "../utils/colors";

class AddCard extends Component {

    static navigationOptions = ({ navigation }) => {
        const { key, name } = navigation.state.params;
        return {
            title: 'Add Card'
        }
    };

    state = {
        question : '',
        answer : '',
        errorQuestion: false,
        errorAnswer: false
    };

    submit = () => {
        let {deck} = this.props;
        if (this.state.question.length < 5) {
            this.setState(() => ({...this.state, errorQuestion:true}));
        } else
        if (this.state.answer.length < 3) {
            this.setState(() => ({...this.state, errorAnswer:true}));
        } else {
            deck.cards.push({question:this.state.question, answer:this.state.answer});
            createDeck(this.props.dispatch, this.props.navigation.state.params.key, deck);
            this.props.navigation.goBack();
        }
    };

    changeQuestion = (inputText) => {
        this.setState(() => ({...this.state, question:inputText.text, errorQuestion:false}));
    };

    changeAnswer = (inputText) => {
        this.setState(() => ({...this.state, answer:inputText.text, errorAnswer:false}));
    };

    render () {
        return (
            <KeyboardAvoidingView style={styles.inputForm} behavior="padding">
                <FormLabel>Enter the question of the card</FormLabel>
                <FormInput
                    value={this.state.question}
                    onChangeText={(text) => this.changeQuestion({text})}
                    shake={this.state.errorQuestion}
                />
                <FormLabel>Enter the answer of the card</FormLabel>
                <FormInput
                    value={this.state.answer}
                    onChangeText={(text) => this.changeAnswer({text})}
                    shake={this.state.errorAnswer}
                />
                <View style={{padding:50}}>
                    <TouchableOpacity onPress={() => this.submit()} style={styles.button}>
                        <Text> Submit </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    inputForm: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: black,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        minHeight: 40,
        minWidth: 80,
        borderRadius: 10,
    }
});


function mapStateToProps (state, { navigation }) {
    const { key } = navigation.state.params;
    return {
        deckKey: key,
        deck: state.deckList.decks[key]
    }
}

export default connect(mapStateToProps, null)(AddCard);
