import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    Image,
    FlatList,
    View,
} from 'react-native';
import { ImageSlider } from 'react-native-image-slider-banner';


function MultipleImage({ id }) {

    const [images, setimages] = useState([])

    useEffect(() => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            };
            fetch(global.dataapi + "property/getImagesofproperty?id=" + id, requestOptions)
                .then(response => response.json())
                .then(result => {setimages(result)})
                .catch(error => console.log('error', error));
        }
        catch (e) { alert(e) }
    }, [])
    return (
        <SafeAreaView style={{borderRadius:20}}>
            {images!=null?(
                <View style={{padding:10,}}>
                <ImageSlider
                    data={images}
                    autoPlay={false}
                    caroselImageStyle={{height: 200}}
                    key={id}
                />
                </View>
            ):(
                <Image
                style={{width:400,height:200}}
                source={ require("../Pictures/main.jpeg")}
                />
            )
            
            }
            
        </SafeAreaView>
    )
}
export default MultipleImage;