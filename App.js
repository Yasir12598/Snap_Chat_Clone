'use strict';
import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Colors from './src/config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RNFS from 'react-native-fs';


import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);


export default function App(props) {

  const [isCollapsed, setCollapsed] = useState(true);
  const [flashIcon, setFlashIcon] = useState('flash-off');
  const [flashMode, setFlashMode] = useState('off');
  const [cameraType, setCameraType] = useState('back');
  const [stopWatchIcon, setStopWatchIcon] = useState('flase');
  const [modalVisible, setModalVisible] = useState(false);
  const [documentsFolder, setDocumentsFolder] = useState('');






  useEffect(() => {

    setDocumentsFolder(RNFS.DownloadDirectoryPath); //path of mainBundleDir of app
    console.log('hellloooooooo', documentsFolder);
    // var check;
    // check =RNFS.readDir(RNFS.ExternalStorageDirectoryPath);
    // console.log("Checking:::::::::",RNFS.readDir(RNFS.ExternalStorageDirectoryPath));




    // RNFS.readDir(documentsFolder)
    //   .then((result)=>{
    //     console.log("resultssssss: ", result);
    //     return Promise.all([RNFS.stat(result[0].path)]);
    //   })
    // .then((statResult) => {
    //   if (statResult[0].isFile()) {
    //     // if we have a file, read it
    //     return RNFS.readFile(statResult[1], 'utf8');
    //   }

    //   return 'no file';
    // })
    // .then((contents) => {
    //   // log the file contents
    //   console.log("Contents:::::: ",contents);
    // })
    // .catch((err) => {
    //   console.log("Error Message:::::  ", err.message," Error Code:::: ", err.code);
    // });




  }, []);

  const takePicture = async function (camera) {
    const options = {
      quality: 0.5,
      base64: true,
      // doNotSave:true,
      // path:'/storage/emulated/0/Download',
    };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line

    console.log('Pic Captured:-----------' , data.uri);



  };

  const takeVideo = async function (video) {
    // const options = { quality: 0.5, base64: true };
    const data = await video.recordAsync({
      quality: RNCamera.Constants.VideoQuality['1080p'],
  
    });
    //  eslint-disable-next-line
    console.log('video captured:-----------' + data.uri);
    // console.log('video path:-----------' + data.path);
  };
  
  const stopRecording = function (video) {
    video.stopRecording();
  }


  function closeModal() {
    setModalVisible(!modalVisible);
    setStopWatchIcon(!stopWatchIcon);
  }

  return (
    <View style={styles.container}>
      <RNCamera
        // ref={ref => {
        //   this.camera = ref;
        // }}
        style={styles.preview}
        captureAudio={true}
        type={RNCamera.Constants.Type[cameraType]}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        // onTap={() => console.log('Tab tab Tab')}
        // focusDepth={1}
        flashMode={RNCamera.Constants.FlashMode[flashMode]}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',


        }}



        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',

        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          // console.log(camera);
          if (status !== 'READY') return <PendingView />;
          return (
            <>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 26,
                    marginVertical: 20,
                    justifyContent: 'space-between'

                  }}
                >
                  <TouchableOpacity
                  // onPress={}
                  >
                    <MaterialIcons name='close' size={30} color={Colors.white} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => takeVideo(camera)}
                  >
                    <MaterialIcons name='play-arrow' size={30} color={Colors.white} />
                  </TouchableOpacity>



                  <TouchableOpacity
                    onPress={() => stopRecording(camera)}
                  >
                    <MaterialIcons name='stop' size={30} color={Colors.white} />
                  </TouchableOpacity>


                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setCollapsed(!isCollapsed);
                        setStopWatchIcon(!stopWatchIcon);
                      }}
                    >
                      <MaterialIcons style={{ alignSelf: 'center' }} name={flashIcon} size={30} color={Colors.white} />
                    </TouchableOpacity>
                    <Collapsible
                      collapsed={isCollapsed}
                      // align={'bottom'}
                      // collapsedHeight={100}
                      // enablePointerEvents={true}
                      duration={300}
                    // s
                    >
                      <View
                        style={{
                          backgroundColor: Colors.blur,
                          width: 40,
                          borderRadius: 40 / 2,
                          marginVertical: 5,
                          paddingVertical: 10,


                        }}
                      >
                        <TouchableOpacity onPress={() => {
                          setFlashIcon('flash-off');
                          setCollapsed(!isCollapsed);
                          setFlashMode('off');
                          setStopWatchIcon(!stopWatchIcon);
                        }}>

                          <MaterialIcons style={{ alignSelf: 'center', marginVertical: 5 }} name='flash-off' size={25} color={Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          setFlashIcon('flash-on');
                          setCollapsed(!isCollapsed);
                          setFlashMode('on');
                          setStopWatchIcon(!stopWatchIcon);

                        }}>

                          <MaterialIcons style={{ alignSelf: 'center', marginVertical: 5 }} name='flash-on' size={25} color={Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          setFlashIcon('flash-auto');
                          setCollapsed(!isCollapsed);
                          setFlashMode('auto');
                          setStopWatchIcon(!stopWatchIcon);
                        }}>

                          <MaterialIcons style={{ alignSelf: 'center', marginVertical: 5 }} name='flash-auto' size={25} color={Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          setFlashIcon('lightbulb');
                          setCollapsed(!isCollapsed);
                          setFlashMode('torch');
                          setStopWatchIcon(!stopWatchIcon);
                        }}>

                          <MaterialIcons style={{ alignSelf: 'center', marginVertical: 5 }} name='lightbulb' size={25} color={Colors.white} />
                        </TouchableOpacity>
                      </View>
                    </Collapsible>
                    {stopWatchIcon &&

                      <TouchableOpacity
                        style={{ top: 20 }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Fontisto style={{ alignSelf: 'center' }} name='stopwatch' size={30} color={Colors.white} />
                      </TouchableOpacity>
                    }
                  </View>

                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (cameraType == 'back')
                          setCameraType('front');
                        else
                          setCameraType('back');
                      }}
                      style={styles.bottomIcons}
                    >
                      <MaterialIcons name='flip-camera-android' size={45} color={Colors.buttonColor} />

                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={
                        () => takePicture(camera)
                      }

                      style={styles.capture}
                    >
                      <View
                        style={{
                          width: 20.31,
                          height: 20.31,
                          borderRadius: 50,
                          backgroundColor: '#E64C4C'
                        }}
                      >

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.bottomIcons,
                      {
                        width: 45,
                        height: 45,
                        backgroundColor: Colors.buttonColor,
                        borderRadius: 55 / 2
                      }
                      ]}
                    >


                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                // blur={50}
                visible={modalVisible}
                onShow={() => {
                  setStopWatchIcon(!stopWatchIcon)
                }}
                onRequestClose={() => {
                  closeModal();
                }}
              >
                <View style={{
                  flex: 1,
                  backgroundColor: Colors.blur,


                }}>



                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 26,
                      paddingVertical: 20,
                    }}
                    onPress={() => {
                      closeModal();
                    }}
                  >
                    <MaterialIcons name='close' size={30} color={Colors.white} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 30,
                      alignSelf: 'center',
                      color: Colors.white,
                    }}>
                    Timer
                  </Text>
                  <View
                    style={{
                      height: 1,
                      marginHorizontal: 40,
                      backgroundColor: Colors.white,
                      top: 6,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 30,
                      top: 60,
                    }}
                  >

                    <TouchableOpacity
                      style={{
                        width: 81,
                        height: 81,
                        borderRadius: 81 / 2,
                        borderWidth: 1,
                        borderColor: Colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Fontisto
                        name='stopwatch'
                        size={37}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 81,
                        height: 81,
                        borderRadius: 81 / 2,
                        borderWidth: 1,
                        borderColor: Colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Fontisto
                        name='stopwatch'
                        size={37}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 81,
                        height: 81,
                        borderRadius: 81 / 2,
                        borderWidth: 1,
                        borderColor: Colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Fontisto
                        name='stopwatch'
                        size={37}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 30,
                      top: 86,
                    }}
                  >

                    <TouchableOpacity
                      style={{
                        width: 81,
                        height: 81,
                        borderRadius: 81 / 2,
                        borderWidth: 1,
                        borderColor: Colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Fontisto
                        name='stopwatch'
                        size={37}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>

                </View>
              </Modal>

            </>
          );
        }}
      </RNCamera>
    </View>
  );
}



const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  bottomIcons: {
    bottom: 48,
    alignSelf: "flex-end",

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  capture: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    backgroundColor: Colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 37,
  },
});

