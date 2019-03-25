import React, { Component } from 'react';
import { View, Dimensions, PanResponder, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import styles from './ModalComp.style';

import GlobalService from '@gl/service/GlobalService';


export class ModalComp extends Component {

    deviceHeight = Dimensions.get('window').height

    state = {
        showModal: false,
        modalContent: null,
    }

    constructor(props) {
        super(props);

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                GlobalService.hideModal();
            },
        });

        this.animationValue = new Animated.Value(0);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.showModal && this.props.showModal) {
            this.setState({
                modalContent: this.props.modalContent
            }, () => {
                this.showModal();
            });
        }

        if (prevProps.showModal && !this.props.showModal) {
            this.hideModal();
        }

        if (prevProps.showModal && (prevProps.modalContent !== this.props.modalContent)) {
            this.setState({ modalContent: this.props.modalContent, });
        }
    }


    async showModal() {
        this.animationValue.setValue(0);
        await this.setState({ showModal: true, });

        Animated.timing(
            this.animationValue,
            {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }
        ).start();
    }

    async hideModal() {
        this.animationValue.setValue(1);

        Animated.timing(
            this.animationValue,
            {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }
        ).start(() => {
            this.setState({
                showModal: false,
                modalContent: null,
            });
        });
    }


    render() {
        const { showModal, modalContent } = this.state;

        const translateY = this.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.deviceHeight, 0]
        });
        const containerOpacity = this.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
        const contentOpacity = this.animationValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        });

        if (!showModal) {
            return null;
        }

        return (
            <Animated.View 
                { ...this._panResponder.panHandlers }
                style={[styles.container, {
                    opacity: containerOpacity,
                }]}    
            >
                <Animated.View
                    style={{
                        transform: [{ translateY: translateY }],
                        opacity: contentOpacity,
                    }}
                >
                    { modalContent }
                </Animated.View>
            </Animated.View>
        );
    }
}


const mapStateToProps = ({ global }) => ({
    showModal: global.showModal,
    modalContent: global.modalContent,
});

export default connect(mapStateToProps)(ModalComp);
