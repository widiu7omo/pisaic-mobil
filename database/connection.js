import {Asset, FileSystem, SQLite} from 'expo'
import {initialize} from "expo/build/Payments";
import {initializeDB} from "../constants/Default_initialize_db";

export const executeQuery = async (query = null, params = [], success = null, error = null) => {
    return new Promise((resolve, reject) => {
        FileSystem.downloadAsync(Asset.fromModule(require('../assets/db/pisaic.db')).uri,
            `${FileSystem.documentDirectory}SQLite/pisaic.db`)
            .then(function ({uri}) {
                let db = SQLite.openDatabase(`pisaic.db`);
                resolve(db, uri);
                reject('cant connect to database');
                // db.transaction(tx => {
                //     tx.executeSql(query, params, (_, {rows}) => resolve(rows._array), (t, error) => reject(error));
                // })
            })
    })
};

async function downloadDb() {
    return FileSystem.downloadAsync(Asset.fromModule(require('../assets/db/pisaic.db')).uri,
        `${FileSystem.documentDirectory}SQLite/pisaic.db`).then(() => {
        const db = SQLite.openDatabase('SQLite/pisaic.db');
        db.transaction(tx => {
            tx.executeSql(`SELECT name
                           FROM sqlite_master
                           WHERE type = 'table'
                             AND name NOT LIKE 'sqlite_%';`, [], (_, {rows}) => console.log(rows));
        })
    });
}


export default downloadDb
// console.log(uriLocalDB.splice(7,uriLength));
// let db = SQLite.openDatabase(`pisaic.db`);
//                 db.transaction(tx => {
//                     tx.executeSql(query, params, (_, {rows}) => resolve(rows._array),(t,error)=>reject(error));
//                 })

