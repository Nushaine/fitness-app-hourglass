import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';


const TensorCamera = cameraWithTensors(Camera);

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);

  const [tfReady, setTfReady] = useState(false);
  const [poseNet, setPoseNet] = useState(null);

  const [poseDetection, setPoseDetection] = useState(null)


  useEffect(() => {
    if(!tfReady) {
      (async () => {

        //check permissions
        /* let { status } = await Camera.requestPermissionsAsync();
        console.log(`permissions status: ${status}`);
        setHasPermission(status === "granted"); */


        //wait for tensorflow to be ready
        await tf.ready();


        //load the model 
        //setPoseNet(await posenet.load());


        setTfReady(true);
      })();
    }
  }, []);

/*   async function estimatePoseOnImage(imageElement: any) {
    if (poseNet){
      const pose = await poseNet.estimateSinglePose(imageElement, {
      flipHorizontal: false,
      });
      setPoseDetection(pose);
      return pose;
    } else {
      console.log("posenet is null")
    }
  }

  function handleCameraStream( images: any ) {
    const loop = async () => {
      const nextImageTensor = await images.next().value;
      await estimatePoseOnImage(nextImageTensor);
      requestAnimationFrame(loop);
    };
    loop();
  } */

    return (
      <View>
        <Text>tfjs ready?: {tfReady}</Text>
        {/* <TensorCamera
          type={Camera.Constants.Type.front}
          style={styles.camera}
          onReady={handleCameraStream}
          autorender={true}
          // Tensor related props
          cameraTextureHeight={1200}
          cameraTextureWidth={1600}
          resizeHeight={200}
          resizeWidth={152}
          resizeDepth={3}
        /> */}
      </View>
    );
  }




const styles = StyleSheet.create({
  camera: {
    position: "absolute",
    left: 50,
    top: 100,
    width: 600 / 2,
    height: 800 / 2,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 0
  },
});