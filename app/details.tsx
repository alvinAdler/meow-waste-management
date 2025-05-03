import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

const Details = () => {

  const { fileUri } = useLocalSearchParams();
  const [isProcessingImage, setIsProcessingImage] = useState(false)
  const [result, setResult] = useState({
    type: "",
    recycleSuggestion: ""
  })
  const [processedImage, setProcessedImage] = useState("")

  useEffect(() => {
    const sendImageToBeProcessed = async () => {
      setIsProcessingImage(true)
      console.log(fileUri)
      setTimeout(() => {
        setIsProcessingImage(false)
        setResult({
          type: "Organic",
          recycleSuggestion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        })
        setProcessedImage(Array.isArray(fileUri) ? fileUri[0] : fileUri)
      }, 1500)
    }

    sendImageToBeProcessed()
  }, [])

  return (
    <View style={{display: "flex", flexDirection: "column", paddingBlock: 20, paddingInline: 10, width:"100%"}}>
      {isProcessingImage ?
        <ActivityIndicator size="large" color="#508D4E" />
      :
        <>
          <View style={{marginBottom: 40}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Scan Result</Text>
            <Text style={{}}>Below are the result of the processed image</Text>
          </View>
          <Image style={{width: "100%", height: 300, objectFit: "contain"}} source={{uri: processedImage}} alt='Unable to find image'/>
        </>
      }
    </View>
  )
}

export default Details