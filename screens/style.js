import {
    StyleSheet, Dimensions
} from 'react-native';
import colors from '../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE
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
    }
  });

  export default styles;