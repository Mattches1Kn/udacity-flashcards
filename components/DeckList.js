import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, FlatList, StyleSheet, Animated, ScrollView} from 'react-native';
import { ListItem } from "react-native-elements"
import {fetchDecks} from "../utils/api";
import {black, nearlyBlack, white} from "../utils/colors";
import {NAVIGATION_DECK_VIEW} from "./Navigation";

class DeckList extends Component {

    state = {
        animatedValue: new Animated.Value(1),
    };

    componentDidMount () {
        fetchDecks(this.props.dispatch);
    }

    renderItem = (deck) => {
        return (
            <ListItem
                button
                title={deck.name}
                badge={{ value: (deck.cards.length + ' card(s)'), textStyle: { color: white }, containerStyle: { marginTop: 0 } }}
                onPress={ () => {this.goToDeck(deck)}}
                hideChevron={true}
                titleStyle={styles.listTitle}
                underlayColor={nearlyBlack}
            />
        );
    };

    goToDeck = (deck) => {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 0,
                duration: 500,
            }
        ).start(() => {
            this.props.navigation.navigate(
                NAVIGATION_DECK_VIEW,
                { key: deck.key, name: deck.name }
            );
            Animated.timing(
                this.state.animatedValue,
                {
                    toValue: 1,
                    duration: 1,
                    delay: 500,
                }
            ).start();
        });
    };

    renderSeparator = () => {
        return (<View style={styles.separator}/>);
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={{color: white, fontSize: 25,}}>Available Decks</Text>
            </View>
        );
    };

    render () {
        const { ready } = this.props;
        if (ready === false) {
            return (<View style={styles.noDecks}><Text>Loading decks ....</Text></View>);
        }

        const {decks} = this.props;
        if (decks === null || decks === undefined) {
            return (
                <View style={styles.noDecks}><Text style={styles.noDecksText}>No Decks available</Text></View>
            );
        }

        const {animatedValue} = this.state;
        const keys = Object.keys(decks);
        const data = [];
        keys.map( (key) => ( data.push({key,...decks[key]})) );

        return (
            <ScrollView style={{'backgroundColor' : black}}>
                <Animated.View style={{'opacity': animatedValue}}>
                    <FlatList
                        keyExtractor={item => item.key}
                        data={data}
                        renderItem={({item}) => this.renderItem(item) }
                        ItemSeparatorComponent={this.renderSeparator}
                        removeClippedSubviews={false}
                        ListHeaderComponent={this.renderHeader}
                    />
                </Animated.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 40,
        flex:1,
        alignItems:'center',
        backgroundColor: black
    },
    separator: {
        height: 1,
        backgroundColor: white
    },
    noDecks: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: black

    },
    noDecksText: {
        fontSize: 30,
        color: white,
    },
    listTitle : {
        height:30,
        fontSize:20,
        color: white
    }
});

const mapStateToProps = (state) => {
    return {
        decks: state.deckList.decks,
        ready: state.deckList.ready
    };
};

export default connect(mapStateToProps)(Animated.createAnimatedComponent(DeckList));
