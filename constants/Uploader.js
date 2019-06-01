import {apiUri} from "../constants/config";

export const Uploader = async (photoData) => {
    let formData = new FormData();
    if(Array.isArray(photoData) && photoData.length !== 0){
        await photoData.forEach(photo=>{
            formData.append('photo[]', {
                uri:photo.uri,
                name: 'photo',
                type: 'image/jpg'
            });
        });
    }

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data;'
        },
        method:"POST",
        body:formData
    };
    await fetch(`${apiUri}upload.php?image=groups`,options).then(res=>{
        console.log(res)
    });
};
