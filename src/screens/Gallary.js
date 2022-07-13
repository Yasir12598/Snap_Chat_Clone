import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';

import CameraRollPicker from '@kebetoo/camera-roll-picker';






export default function Gallary(props) {
  
    
    function getSelectedImages(images, current) {
        console.log(images);
        
    }
    return (
        <View style={styles.container}>
            <CameraRollPicker
                callback={getSelectedImages}
                // assetType={'All'}
                // groupTypes={'Library'}
                assetType='All'
                groupName={'QPics'}
                maximum={10}
                imagesPerRow={3}
                // selected={selected}
            // selected={this.state.selected}
            //selectSingleItem={true}
            // imageMargin={8}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});