import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {Constants} from 'expo';
import {black} from "./utils/colors";
import MainNavigator from "./components/Navigation";
import reducer from './reducers';
import {setLocalNotification} from "./utils/notifications";

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View  style={{flex: 1}}>
                    <View style={{ backgroundColor:black, height: Constants.statusBarHeight }}>
                        <StatusBar barStyle="light-content" translucent />
                    </View>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}
