import query from '../database/query';
import {apiUri} from "./config";
import {Alert} from "react-native";
//sesuaikan dengan data table;
//create form ini hanya untuk single user
const createFormData = (body, table) => {
    const data = new FormData();
    body.forEach(row => {
        delete row.status;
    });
    data.append(table, JSON.stringify(body));
    console.log(JSON.stringify(body));
    return data;
};
//@TODO:add loading screen when synchronising data
//fetch from local db retrieve unsync data users.
//TRIGGER WHEN NETWORK CHANGE
export const checkDataTable = async (table) => {
    const results = await query(`select * from ${table} where status = 0`).then(async res => {
        if (res.length > 0) {
            console.log(res);
            await fetch(apiUri + `sync.php?input=${table}`, {
                method: "POST",
                body: createFormData(res, table)
            }).then(res => {
                console.log(res);
                if (res.ok) {
                    query(`update ${table} set status = 1 where status = 0`).then(console.log('status updated'));
                    console.log(`update ${table} to server`)
                }
                return res;
            }).catch(() => Alert.alert('Problem with server', 'Failed connect to server, get local data...'));

        }
        return res;
    });
    return results;
};

