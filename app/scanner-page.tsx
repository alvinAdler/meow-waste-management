import CustomButton from '@/components/Button';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const ScannerPage = () => {

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null)
  const [currentImageUri, setcurrentImageUri] = useState("")
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [isProcessingImage, setIsProcessingImage] = useState(false)
  const [hasBeenRequestedToBeProcessed, setHasBeenRequestedToBeProcessed] = useState(false)
  const [result, setResult] = useState({
    type: "",
    recycleSuggestion: "",
    outcome: false
  })

  const takePicture = async () => {
    if(cameraRef.current){
      const photo = await cameraRef.current.takePictureAsync();
      setcurrentImageUri(photo.uri);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
    });

    if (!result.canceled) {
      setcurrentImageUri(result.assets[0].uri);
    }
  };

  const processImage = () => {
    setIsProcessingImage(true)
    setTimeout(() => {
      setResult({
        type: "Organic",
        recycleSuggestion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        outcome: true
      })
      setIsProcessingImage(false)
    }, 1500);
  }

  if(currentImageUri){
    return (
      <View style={{display: "flex", flexDirection: "column", paddingBlock: 20, paddingInline: 10, alignItems: "center"}}>
        <View style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
          <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 10}}>Your Scan Result</Text>
          <Image style={{width: "100%", height: 300, objectFit: "contain"}} source={{uri: currentImageUri}}/>
        </View>
        {isProcessingImage && hasBeenRequestedToBeProcessed ?
          <ActivityIndicator size="large" color="#508D4E" />
        :
          result.outcome &&
          <View style={{marginTop: 20}}>
            <Text><Text style={{fontWeight: "bold"}}>Waste Type:</Text> {result.type}</Text>
            <Text><Text style={{fontWeight: "bold"}}>Recycle suggestion:</Text> {result.recycleSuggestion}</Text>
          </View>
        }
        <View style={{display: "flex", marginTop: 20, flexDirection: "row", gap: 10}}>
          <CustomButton onPress={() => {
            if(isProcessingImage){
              return;
            }
            setcurrentImageUri("")
            setHasBeenRequestedToBeProcessed(false)
            setResult({
              type: "",
              recycleSuggestion: "",
              outcome: false
            })
          }} text='Retake'/>
          {!hasBeenRequestedToBeProcessed &&
            <CustomButton onPress={async () => {
              setHasBeenRequestedToBeProcessed(true)
              processImage()
            }} text='Proceed'/>
          }
        </View>
      </View>
    )
  }

  return (
    <View style={{display: "flex", flexDirection: "column", paddingBlock: 20, paddingInline: 10}}>
      <View style={{marginBottom: 40}}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>Scanner</Text>
        <Text style={{}}>Scan the item using the camera below</Text>
      </View>
      <View style={{width: "100%", height: 300, display: "flex", justifyContent: "center"}}>
        {permission &&
          <>
            <CameraView style={styles.camera} facing={"back"} ref={cameraRef} onCameraReady={() => setIsCameraReady(true)}>
            </CameraView>
            <CustomButton extraStyle={{ width: "100%", marginTop: 10 }} text='Capture' onPress={() => {
              if(!isCameraReady){
                return;
              }
              takePicture()
            }}/>
          </>
        }
      </View>
      {!permission?.granted &&
        <View style={{display: "flex", flexDirection: "column", gap: 4, alignItems: "center"}}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <CustomButton text='Grant Permission' onPress={() => requestPermission()}/>
        </View>
      }
      <View style={{marginTop: 50, display: "flex", alignItems: "center", flexDirection: "row", gap: 5}}>
        <Text>Or you can</Text>
        <CustomButton extraStyle={{padding: 5, width: "100%"}} text='Manually upload an image' onPress={() => {
          pickImage()
        }}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ScannerPage