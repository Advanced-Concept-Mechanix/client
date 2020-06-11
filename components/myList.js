import React from 'react';
import { 
    View, 
    TextInput, 
    Text, 
    StyleSheet, 
    FlatList 
} from 'react-native';
import colors from '../config/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListViewItemSeparator = () => {
    return (
        <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    );
};

const Item = ({ contents }) => {
    for(const property in contents){
        return(
            <TouchableOpacity style={styles.item}>
                <Text>{`${property}: ${contents[property]}`}</Text>
            </TouchableOpacity>
        );
    }
}

const MyList = (props) => {
    return(
        <View
        style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10,
            borderWidth: 2,
          }}
        >
            <FlatList 
                data={props.data}
                ItemSeparatorComponent={ListViewItemSeparator}
                renderItem={props.renderItem}
                keyExtractor={props.keyExtractor}
                ListEmptyComponent={props.ListEmptyComponent}
                ListFooterComponent={props.ListFooterComponent}
                ListHeaderComponent={props.ListHeaderComponent}
                onRefresh={props.onRefresh}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.SILVER,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default MyList;