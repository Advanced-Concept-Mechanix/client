import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import allblocks from '../screens/allblocks';
import newBlock from '../screens/newBlock';
import singleBlock from '../screens/singleBlock';

const createBlockStack = createStackNavigator();

function createBlockStackScreen(){
    return(
        <createBlockStack.Navigator initialRouteName="newBlock">
            <createBlockStack.Screen name="newBlock" component={newBlock} options={{ title: 'Create'}}/>
        </createBlockStack.Navigator>
    );
}

const allblockStack = createStackNavigator();

function allblockStackScreen(){
    return(
        <allblockStack.Navigator initialRouteName="allBlocks">
            <allblockStack.Screen name="allBlocks" component={allblocks} options={{ title: 'List'}}/>
            <allblockStack.Screen name="singleBlock" component={singleBlock} options={{ title: 'Single Block'}}/>
        </allblockStack.Navigator>
    );
}

const blockTab = createBottomTabNavigator();

export default function blockNav(){
    return(
        <blockTab.Navigator initialRouteName="allBlocksTab">
            <blockTab.Screen name="allBlocksTab" component={allblockStackScreen} options={{ title: 'List'}}/>
            <blockTab.Screen name="createBlockTab" component={createBlockStackScreen} options={{ title: 'Create'}}/>     
        </blockTab.Navigator>
    );
}