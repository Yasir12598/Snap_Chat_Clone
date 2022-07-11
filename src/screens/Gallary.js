import React from 'react'
import { View, StyleSheet } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

function getSelectedImages(images){
    
}

export default function Gallary(props) {
    return (
        <View style={styles.container}>
            <CameraRollPicker
                callback={getSelectedImages(images)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});