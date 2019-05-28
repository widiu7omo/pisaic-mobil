import {Platform, NetInfo} from 'react-native'
import {checkDataTable} from "../constants/Data_to_update";
import {createTableMaster} from "../constants/Default_tables";
import query from '../database/query'


export const syncData = async (table) => {
    //retrive unsync data

    await query(`SELECT COUNT(*) as total from ${table} where status = 0`).then(async res => {
        console.log(res);
        if (res[0].total === 0) {
            // recreate table when local data empty, for fetching new data from server;(keep sync with server)
            await createTableMaster(table,true).then(console.log(`creating master ${table}`))
        }
        await checkDataTable(table).then(console.log(`sync ${table}`));


    });

};

