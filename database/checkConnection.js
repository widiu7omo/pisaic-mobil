import {Platform,NetInfo} from 'react-native'


export const checkConnection = async () =>{
    if(Platform.OS === 'android'){
        NetInfo.isConnected.fetch().then(isConnected=>{
            // isConnected?console.log('online'):console.log('offline');
            return isConnected
        })
    }
    else{
        NetInfo.isConnected.addEventListener("connectionChange",_handleFirstConnectivityChange)
    }
};
const _handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
        "connectionChange",
        _handleFirstConnectivityChange
    );
    if (isConnected === false) {
        // console.log('offline')
    } else {
        // console.log('online')
    }
    return isConnected;
};


