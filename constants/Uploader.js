import {apiUri} from "../constants/config";
import {Alert} from "react-native"

export const Uploader = async (photoData) => {
    let formData = new FormData();
    console.log('get param photo data');
    console.log(photoData);
    if (Array.isArray(photoData) && photoData.length !== 0) {
        photoData.forEach(photo => {
            console.log(photo);
            let getFotoName = photo.uri.split('/');
            let fotoName = getFotoName[getFotoName.length-1];
            formData.append('photo[]', {
                uri: photo.uri,
                name: photo.name,
                type: 'image/jpg',
            });
            // formData.append('note[]', {
            //     note: photo.note
            // })
        });
    }

    let options = {
        // headers: {
        //     'Accept': 'application/json',
        //     // 'Content-Type':'multipart/form-data'
        // },
        method: "POST",
        body: formData
    };
    // console.log(formData);
    await fetch(apiUri + `upload.php?image=groups`, options)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })

        .catch(e => {
            Alert.alert('Error Upload Photo', JSON.stringify(e));
        })
};
