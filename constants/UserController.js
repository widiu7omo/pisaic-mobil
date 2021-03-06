import query from '../database/query'
import {apiUri} from "./config";
import {checkDataTable} from "./Data_to_update";
import {Alert} from "react-native";
//data always object not array
const createFormData = (body) => {
    // body is array
    const data = new FormData();
    data.append('users', JSON.stringify(body));
    console.log(data);
    return data;
};

async function insert(data, isConnected) {
    //data must be an array
    console.log(`is online? ${isConnected}`);
    let jsonData = [];
    let sqli = '';
    if (isConnected) {
        console.log('im online');
        //online first
        jsonData.push(data);
        let formData = createFormData(jsonData);

        fetch(apiUri + `sync.php?input=users`, {method: "POST", body: formData}).then(res => {
            console.log(res);
            console.log(`users inserted online`);
            let keys = Object.keys(data).join(',');
            jsonData.forEach((user, index) => {
                sqli += `('${user.name}','${user.nrp}','${user.lahir}',1)`;
                if (jsonData.length === index + 1) {
                    return;
                }
                sqli += ','
            });
            query(`INSERT INTO users (${keys},status)
                 VALUES ${sqli};`, []).then(() => console.log('user inserted local status 1'));
        }).catch((err) => {
            console.log(err);
            Alert.alert('Failed', 'Failed insert data')
        });
    } else {
        console.log('im offline');
        //offline
        let keys = Object.keys(data).join(',');
        let sqli = `'${data.name}','${data.nrp}','${data.lahir}',0`;
        query(`INSERT INTO users (${keys},status)
                 VALUES (${sqli});`, []).then(() => console.log('user inserted local status 0'));

    }
}

async function select(data = null, isConnected) {
    if (isConnected) {
        return fetch(apiUri + `sync.php?data=users`, {method: "GET"})
            .then(res => res.json());
    } else {
        return await query(`select *
                            from users`);
    }
}


async function sync() {
    await checkDataTable('users').then(res=>{
        console.log('users synced');
        console.log(res);
        if(typeof res !== "undefined" && res.length === 0){

        }
    })
}

async function matchingWithServer(isConnected){
    if(isConnected){
        await fetch(apiUri+'sync.php?data=users',{method:"GET"})
            .then(res=>res.json())
            .then(async data=>{
                let keys = Object.keys(data).join(',');
                let sqli = `'${data.name}','${data.nrp}','${data.lahir}',0`;
                await query(`DELETE FROM users`);
                await query(`INSERT INTO users (${keys},status)
                 VALUES (${sqli});`, []).then(() => console.log('matching local data with server'));
            })
    }
}

export default {
    insert,
    sync,
    select,
}
//sync
//insert
//update
//delete
