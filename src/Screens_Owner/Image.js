import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Import required components
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const PickImage = (props) => {
  const [imge, setimge] = useState('');

  const chooseFile = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 250,
      quality: 1,
    });
    setimge(result.assets[0].uri)
    props.setimage(result.assets[0].uri)
  }
  return (imge == '' ? (
    <TouchableOpacity
      onPress={() => chooseFile()}>
      <Icon name="image" size={50} color={global.color} />
    </TouchableOpacity>
  ) : (<Image source={{ uri: imge }} style={{ width: 70, height: 70, borderRadius: 10, borderWidth: 2 }} />)
  );

}
const MultiPickImage = (props) => {
  const [imge, setimge] = useState([]);
  let data = [];
  const chooseFile = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 250,
      quality: 1,
      selectionLimit: 5
    });

    for (let i = 0; i < result.assets.length; i++) {
      data.push({
        id:i,
        fileName: result.assets[i].fileName,
        type: result.assets[i].type,
        uri: result.assets[i].uri
      })
    }
    setimge(data)
    props.setimage(data)
  }
  return (imge == '' ? (
    <TouchableOpacity
      onPress={() => chooseFile()}>
      <Icon name="image" size={50} color={global.color} />
    </TouchableOpacity>
  ) : (imge.map((m) => (<Image source={{ uri: m.uri }} style={{ width: 100, height: 70, borderRadius: 10, borderWidth: 2, margin: 5 }} key={m.id} />))

  )
  );

}
export { PickImage, MultiPickImage };