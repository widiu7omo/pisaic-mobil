import {SQLite} from 'expo-sqlite'

export default () => {
    const db = SQLite.openDatabase('db_pisaic.db');
    return db;
}
