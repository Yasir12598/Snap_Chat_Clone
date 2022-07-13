import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Pressable,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Modal
} from 'react-native';

import RNFS from 'react-native-fs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Colors from '../config/Colors';


export default function CameraRoll({ navigation }) {
    const [imagesArray, setImagesArray] = useState([]);
    const [modalImageOpen, setModalImageOpen]=useState(false);
    const [openImage, setOpenImage]=useState('');
    useEffect(() => {
        var folder = RNFS.DownloadDirectoryPath;
        RNFS.readDir(folder + '/QPics')
            .then((res) => {
                let images = [];
                for (let i = 0; i < res.length; i++) {
                    // console.log(res[i].path);
                    images.push(res[i].path);
                    // setImagesArray(res[i].path);
                }
                console.log("I am called from useEffect ....................................");
                setImagesArray(images);

            })
            .catch((err) => {
                console.log("Error to read Dir:  ", err);
            })
    }, []);
    console.log(imagesArray);
    return (
        <>

            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <MaterialIcons name='close' size={30} color={'black'} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 25,
                    color: 'black',
                    marginVertical: 10
                }}
                >
                    Gallary
                </Text>

                <FlatList
                    data={imagesArray.reverse()}
                    keyExtractor={(item, index) => index}
                    numColumns={3}
                    renderItem={({ item }) => {
                        if (item.includes('.mp4')) {
                            return (
                                <ImageBackground
                                    source={{ uri: 'file://' + item }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        margin: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}
                                    imageStyle={{ borderRadius: 5 }}
                                >
                                    <EvilIcons name='play' size={60} color={Colors.white} />
                                </ImageBackground>
                            )
                        }
                        else {
                            return (
                                <Pressable
                                    onPress={()=>{
                                        setModalImageOpen(!modalImageOpen);
                                        setOpenImage(item);
                                    }}
                                >
                                    <Image
                                        source={{ uri: 'file://' + item }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            margin: 5,
                                            borderRadius: 5,
                                        }}
                                    />
                                </Pressable>
                            )
                        }
                    }}
                />
            </View>
            <Modal
                visible={modalImageOpen}
                onRequestClose={()=> setModalImageOpen(!modalImageOpen)}

            >
            <View style={{
                flex:1,
                // marginHorizontal:13,
                // marginVertical:13,
                
            }}>
                <Image 
                    source={{uri: 'file://'+openImage}}
                    style={{
                        flex:1,
                    }}
                    resizeMode={'center'}
                />
            </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 13,
        marginBottom: 85,
        top: 35,
    }
});