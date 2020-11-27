import {
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import React, { Component } from 'react';

export default class NavigationDrawerStructure extends Component {
    //Top Navigation Header with Donute Button
    toggleDrawer = () => {
      //Props to open/close the drawer
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <Image
              source={require('../assets/drawer.png')}
              style={{ width: 25, height: 25, marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      );
    }
}