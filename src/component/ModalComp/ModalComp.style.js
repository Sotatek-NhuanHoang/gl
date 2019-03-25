import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, FontSizes, Sizes } from '@gl/style/variables';


const { width, height } = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
