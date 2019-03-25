import React from 'react';
import PureComponent from 'pure-component';
import { View, Text } from 'react-native';

import styles from './AppIntroScreen.style';

import LocComp from '@gl/component/LocComp';
import GlobalService from '@gl/service/GlobalService';


export class AppIntroScreen extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        GlobalService.showModal(
            <View>
                <Text>Honag Duc Nhuan</Text>
            </View>
        );

        setTimeout(() => {
            GlobalService.showModal(
                <View>
                    <Text>Meo meo</Text>
                </View>
            );
        }, 2000);
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
