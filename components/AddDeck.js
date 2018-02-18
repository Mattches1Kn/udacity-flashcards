import React, { Component } from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {createDeck} from "../utils/api";
import {connect} from "react-redux";
import * as uuid from "uuid";
import {FormInput, FormLabel} from "react-native-elements";
import {NAVIGATION_HOME} from "./Navigation";
import {black, white} from "../utils/colors";

class AddDeck extends Component {

    state = {
        text : '',
        error: false
    };

    submit = () => {
        if (this.state.text.length > 2) {
            createDeck(this.props.dispatch, uuid.v1(), {name: this.state.text, cards:[]});
            this.props.navigation.navigate(NAVIGATION_HOME);
        } else {
            this.setState(() => ({error:true}));
        }
    };

    changeText = (inputText) => {
        this.setState(() => ({text:inputText.text, error:false}));
    };

    render () {
        return (
            <KeyboardAvoidingView style={styles.inputForm} behavior="padding">
                <FormLabel>Enter the name of the new deck</FormLabel>
                <FormInput
                    style={styles.button}
                    value={this.state.text}
                    onChangeText={(text) => this.changeText({text})}
                    shake={this.state.error}
                />
                <View style={{padding:50}}>
                    <TouchableOpacity onPress={() => this.submit()} style={styles.button}>
                        <Text> Submit </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.button}>
                        <Text> Cancel </Text>
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
        //marginVertical: 50,
        backgroundColor: black,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        borderRadius: 10,
        minHeight: 40,
        minWidth: 80,
        marginTop:20
    }
});

export default connect(null, null)(AddDeck);
