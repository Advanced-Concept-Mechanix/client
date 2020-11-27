import {
    TouchableOpacity,
    Image,
} from 'react-native';
import React from 'react';

export default function DrawerImage() {

    const toggle = () => {
        props.navigationProps.toggleDrawer();
    }

    return (
        <TouchableOpacity onPress={toggle}>
            <Image
                style={{width: 25, height: 25, marginLeft: 5}}
                source={require('../assets/drawer.png')}
            />
        </TouchableOpacity>
    );
}
