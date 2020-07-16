import {
    StyleSheet, Dimensions
} from 'react-native';
import colors from '../config/colors';
import metrics from '../config/metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE
    },
    containerDark: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BLACK
    },
    logo: {
        flex: 1,
        width: "100%",
        resizeMode: "contain",
        alignSelf: "center"
    },
    logoTitle: {
        flex: 1,
        width: "50%",
        height: "100%",
        resizeMode: "contain",
        alignSelf: "center"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%"
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    imageStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    item: {
        backgroundColor: colors.SILVER,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    loadingBackgroundStyle: {
        backgroundColor: 'rgba(125, 125, 255, 1)',
    },
    root: {
        flex: 1,
    },
    lottie: {
        width: metrics.DEVICE_WIDTH * 0.5,
        height: metrics.DEVICE_HEIGHT * 0.5,
        backgroundColor: "rgba(0,0,0,1)"
    },
    slider:{
        padding: 10
    }
  });

  export default styles;