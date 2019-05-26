import {Asset, FileSystem} from "expo";

export const dataDB = FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/db/pisaic.db')).uri,
        `${FileSystem.documentDirectory}SQLite/pisaic.db`);