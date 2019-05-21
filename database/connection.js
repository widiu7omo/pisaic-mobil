import {SQLite} from 'expo'

export default () =>{
    const db = SQLite.openDatabase('db_pisaic.db');
    return db;
}
