import React, { useState, useEffect, FC } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../lib/FBConfig';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage';
import { convertUriToBlob } from '../module/ConvertUriToBlob';

export const DemoScreen: FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [downloadImageUrl, setDownloadImageUrl] = useState<string | null>(null);

  const storageRef = ref(storage, 'some-child');

  const pickImage = async (): Promise<void> => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2, //0 343バイト 0.2 392バイト 0.5 837バイト
      base64: true, //base64 0.2 1743バイト
    });

    console.log(result);

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      const blob = await convertUriToBlob(result.assets[0].uri);
      //   console.log(blob);
      const base64 = result.assets[0].base64;
      try {
        const uploadResult = await uploadBytes(storageRef, blob);
        // if (!base64) return;
        // const uploadResult = await uploadString(storageRef, base64);
        console.log(uploadResult.metadata);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const download = async () => {
    const downloadURL = await getDownloadURL(storageRef);
    setDownloadImageUrl(downloadURL);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="download" onPress={download} />
      {downloadImageUrl && (
        <Image
          source={{ uri: downloadImageUrl }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
};
