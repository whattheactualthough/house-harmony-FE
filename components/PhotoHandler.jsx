import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


const PhotoHandler = ({ taskId, onPhotoTaken, onClose }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'web') {
      console.log('Web platform - skipping permissions');
      return true;
    }
    
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    
    if (cameraPermission.status !== 'granted') {
      showAlert('Permission needed', 'Camera permission is required to take photos.');
      return false;
    }
    
    if (mediaLibraryPermission.status !== 'granted') {
      showAlert('Permission needed', 'Media library permission is required to save photos.');
      return false;
    }
    
    return true;
  };

  const takePhoto = async () => {
    if (Platform.OS === 'web') {
      showAlert('Not supported', 'Camera is not available on web. Please use "Select from Gallery" instead.');
      return;
    }

    try {
      console.log('Take photo button pressed');
      setIsLoading(true);
      
      const hasPermissions = await requestPermissions();
      console.log('Permissions granted:', hasPermissions);
      
      if (!hasPermissions) {
        setIsLoading(false);
        return;
      }

      console.log('Launching camera...');
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('Camera result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('Image captured:', imageUri);
        setCapturedImage(imageUri);
        
        // Save to media library (only on mobile)
        if (Platform.OS !== 'web') {
          await MediaLibrary.saveToLibraryAsync(imageUri);
          console.log('Image saved to library');
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      showAlert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectFromGallery = async () => {
    try {
      console.log('Select from gallery button pressed');
      setIsLoading(true);
      
      if (Platform.OS !== 'web') {
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        console.log('Media library permission:', mediaLibraryPermission.status);
        
        if (mediaLibraryPermission.status !== 'granted') {
          showAlert('Permission needed', 'Media library permission is required to select photos.');
          setIsLoading(false);
          return;
        }
      }

      console.log('Launching image library...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('Gallery result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('Image selected:', imageUri);
        setCapturedImage(imageUri);
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
      showAlert('Error', 'Failed to select photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPhoto = () => {
    if (capturedImage && onPhotoTaken) {
      onPhotoTaken(taskId, capturedImage);
    }
    if (onClose) {
      onClose();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Verification Photo</Text>
      
      {!capturedImage ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={takePhoto}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Take Photo'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={selectFromGallery}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Select from Gallery'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={confirmPhoto}>
              <Text style={styles.buttonText}>Confirm & Complete Task</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={retakePhoto}>
              <Text style={styles.secondaryButtonText}>Retake Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#65CCB8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  previewContainer: {
    flex: 1,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 30,
  },
});

export default PhotoHandler;

