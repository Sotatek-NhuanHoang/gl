import React from 'react';
import PureComponent from 'pure-component';
import { View, Text } from 'react-native';

import styles from './AppIntroScreen.style';

import LocComp from '@gl/component/LocComp';


export class AppIntroScreen extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { style } = this.props;
        
        return (
            <View style={[styles.container, style]}>
                <Text>
                    <LocComp locKey="no_connection" />
                </Text>
            </View>
        );
    }
}


export default AppIntroScreen;
