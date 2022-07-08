'use strict';
import React, { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid, PermissionsAndroid,  Pressable } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Colors from './src/config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RNFS from 'react-native-fs';
import { Timer, Countdown } from 'react-native-element-timer';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


// import * as Animatable from 'react-native-animatable';
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
  const countdownRef = useRef(null);
  const [isCollapsed, setCollapsed] = useState(true);
  const [flashIcon, setFlashIcon] = useState('flash-off');
  const [flashMode, setFlashMode] = useState('off');
  const [cameraType, setCameraType] = useState('back');
  const [stopWatchIcon, setStopWatchIcon] = useState('flase');
  const [modalVisible, setModalVisible] = useState(false);
  const [documentsFolder, setDocumentsFolder] = useState(RNFS.DownloadDirectoryPath);
  const [timerSec, setTimerSec] = useState(0);
  const [folderName, setFolderName] = useState('/QPics/');
  const [showCircle, setShowCircle] = useState(false);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  })






  // setDocumentsFolder(); //path of mainBundleDir of app
  console.log('Path ( called From UseEffect): ', documentsFolder);
  RNFS.mkdir(documentsFolder + folderName)
    .then((result) => console.log("Folder created Successfully at: ", documentsFolder, 'with name of :', folderName))
    .catch((err) => console.log('Folder do not created : ', err));



  // useEffect(() => {

  // }, []);
  function CaptureButton() {
    return (
      <View
        style={styles.capture}
      >
        <View
          style={{
            // width: 20.31,
            width: showCircle === true ? 57 : 20.31,
            height: showCircle === true ? 57 : 20.31,
            // height: 20.31,
            borderRadius: 50,
            backgroundColor: '#E64C4C'
          }}
        />
      </View>
    )
  }

  function currentDateAsName() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var msec = new Date().getMilliseconds(); //Current Seconds

    return (date + '' + month + '' + year
      + '' + hours + '' + min + '' + sec + '' + msec)

  };
  console.log(currentDateAsName);
  const takePicture = async function (camera) {

    const options = {
      quality: 0.6,
      // base64: true,
      // doNotSave: true,
      path: documentsFolder + folderName + 'image' + currentDateAsName() + '.jpg',
    };
    const data = await camera.takePictureAsync(options)

    console.log('Pic Captured:-----------', data.uri);


    ToastAndroid.showWithGravityAndOffset(
      "Picture Captured",
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      0,
      100
    );



  };

  const takeVideo = async function (video) {
    ToastAndroid.showWithGravityAndOffset(
      "Video Started",
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      0,
      100
    );
    const data = await video.recordAsync({
      quality: RNCamera.Constants.VideoQuality['1080p'],
      path: documentsFolder + folderName + 'video' + currentDateAsName() + '.mp4',

    });

    console.log('video captured:-----------' + data.uri);
    

  };

  const stopRecording = function (video) {
    video.stopRecording();
    ToastAndroid.showWithGravityAndOffset(
      "Video Saved",
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      0,
      100
    );
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
      // androidCameraPermissionOptions={{
      //   title: 'Permission to use camera',
      //   message: 'We need your permission to use your camera',
      //   buttonPositive: 'Ok',
      //   buttonNegative: 'Cancel',


      // }}



      // androidRecordAudioPermissionOptions={{
      //   title: 'Permission to use audio recording',
      //   message: 'We need your permission to use your audio',
      //   buttonPositive: 'Ok',
      //   buttonNegative: 'Cancel',

      // }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          // console.log(camera);
          // if (status !== 'READY') return <PendingView />;
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
                    onPress={() => setShowCircle(!showCircle)}
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

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // PaddingTop:50,
                  }}
                >
                  {
                    timerSec > 0 &&
                    <Countdown
                      ref={countdownRef}
                      // style={{  }}
                      textStyle={{ fontSize: 117, color: Colors.white }}
                      initialSeconds={timerSec}
                      // autoStart={true}
                      onTimes={e => {
                        console.log(e)
                      }}
                      onPause={e => { }}
                      onEnd={(e) => {
                        takePicture(camera);
                        // setTimerSec(timerSec);




                        var check = timerSec;
                        setTimeout(() => {
                          setTimerSec(-1);
                          setTimeout(() => {
                            setTimerSec(check);
                          }, 500);

                        }, 1000);


                        console.log('cheeeeeeeeeeeeeeeeeeeeeeeeek: ', timerSec);

                      }}
                    />
                  }

                  {/* <Button
                    style={styles.button}
                    title={'Start'}
                    onPress={() => {
                      countdownRef.current.start();
                    }}
                  />
                  <Button
                    style={styles.button}
                    title={'Pause'}
                    onPress={() => {
                      countdownRef.current.pause();
                    }}
                  />
                  <Button
                    style={styles.button}
                    title={'Resume'}
                    onPress={() => {
                      countdownRef.current.resume();
                    }}
                  />
                  <Button
                    style={styles.button}
                    title={'Stop'}
                    onPress={() => {
                      countdownRef.current.stop();
                    }}
                  /> */}

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
                    <Pressable
                      onPress={() => {
                        if (timerSec == 0) {
                          takePicture(camera)
                        }
                        else {
                          countdownRef.current.start();
                        }

                      }}
                      onLongPress={
                        ()=>{
                          setShowCircle(!showCircle)
                          takeVideo(camera);
                        }
                      }
                      onPressOut={()=>{
                        setShowCircle(false);
                        stopRecording(camera);
                      }}
                      style={{ bottom: 37 }}
                    >
                      {showCircle ?
                        <CountdownCircleTimer
                          isPlaying={showCircle}
                          duration={5}
                          colors={['#E64C4C']}
                          // colorsTime={[7, 5, 2, 0]}
                          size={80}
                          // strokeWidth={s}
                          strokeLinecap={'square'}
                          onComplete={()=>{
                            setShowCircle(!showCircle);
                            // stopRecording(camera);
                          }}
                        >
                          {({ remainingTime }) =>
                            <>
                              <CaptureButton />
                            </>
                          }
                        </CountdownCircleTimer>
                        : <CaptureButton />
                      }
                    </Pressable>
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
                  backgroundColor: 'rgba(128, 128, 128,0.9)',
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
                      onPress={() => {
                        setTimerSec(0);
                        closeModal();
                      }}
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
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require('./src/asserts/icons/noTime.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTimerSec(2);
                        closeModal();
                      }}
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
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require('./src/asserts/icons/test2.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTimerSec(3);
                        closeModal();
                      }}
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
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require('./src/asserts/icons/3secTime.png')}
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
                      onPress={() => {
                        setTimerSec(10);
                        closeModal();
                      }}
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
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require('./src/asserts/icons/10secTime.png')}
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
    // bottom: 37,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 40,
  },
  timer: {
    marginVertical: 10,
  },
  timerText: {
    fontSize: 20,
  },
  button: {
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 24,
    width: 100,
  },
});

