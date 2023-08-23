import {Platform, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};

export const captureImage = async type => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    videoQuality: 'low',
    durationLimit: 30, // Video max duration in seconds
    saveToPhotos: true,
    includeBase64: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
    
  if (isCameraPermitted && isStoragePermitted) {
    return new Promise((resolve, reject) => {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          reject('cancelled');
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          reject('unavailable');
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          reject('permission');
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          reject('error');
        } else {
          const base64 = response?.assets[0]?.base64;
          resolve(base64);
        }
      });
    });
  } else {
    return Promise.reject('Permission not granted');
  }
};

export const chooseFile = async type => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    includeBase64: true,
  };

  return new Promise((resolve, reject) => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        reject('cancelled');
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        reject('unavailable');
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        reject('permission');
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        reject('error');
      } else {
        const base64 = response?.assets[0]?.base64;
        resolve(base64);
      }
    });
  });
};

export const chooseMultipleFiles = async (type, selectionLimit) => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    multiple: true,
    selectionLimit: selectionLimit,
    includeBase64: true, // Enable base64 conversion
  };

  return new Promise((resolve, reject) => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled image picker');
        reject('cancelled');
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        reject('unavailable');
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        reject('permission');
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        reject('error');
      } else {
        const base64 = response.assets.map(asset => asset.base64);
        resolve(base64);
      }
    });
  });
};

export const chooseVideo = async type => {
  let options = {
    mediaType: type,
    videoQuality: 'high',
    durationLimit: 60,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  return new Promise((resolve, reject) => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        alert('User cancelled video picker');
        reject('cancelled');
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        reject('unavailable');
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        reject('permission');
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        reject('error');
      } else {
        const videoUri = response.assets[0].uri;
        const fileSize = response?.assets[0]?.fileSize;

        // Check if file size is within the limit (10MB)
        if (fileSize > 5 * 1024 * 1024) {
          alert('Video size exceeds the limit of 10MB');
          reject('exceeded_limit');
        } else {
          try {
            const videoBlob = await fetch(videoUri).then(response =>
              response.blob(),
            );
            const reader = new FileReader();

            reader.onload = () => {
              const base64Video = reader.result;
              resolve(base64Video);
            };

            reader.onerror = () => {
              reject('conversion_error');
            };

            reader.readAsDataURL(videoBlob);
          } catch (error) {
            reject(error);
          }
        }
      }
    });
  });
};
