import query from '../database/query'
import {Asset, FileSystem} from "expo";
import SQLite from "expo/build/SQLite";

// export const initializeDB = () => {
//     FileSystem.downloadAsync(
//         Asset.fromModule(require('../assets/db/pisaic.db')).uri,
//         `${FileSystem.documentDirectory}SQLite/pisaic.db`);
// };

export const initializeData = async () => {
    const db = SQLite.openDatabase('pisaic.db')
    db.transaction(tx=>{
        tx.executeSql(`select * from zones`,[],(_,{rows})=>console.log(rows));
    })
    // await query(`INSERT INTO users
    //              VALUES (NULL, "AHMAD FIRLI", "80112116", "14031990");`, [])
    //     .then(res => console.log(res))
    //     .catch(error=>console.log(error));
    // await query(`SELECT *
    //              FROM groups`, []).then(res => console.log(res)).catch(err => console.log(err));
    // await query(`SELECT *
    //              FROM zones`, []).then(res => console.log(res)).catch(err => console.log(err));
    // await query(`SELECT *
    //              FROM kinds`, []).then(res => console.log(res)).catch(err => console.log(err));

    // await query(`DELETE FROM users`,[]).then(console.log('success delete from users'));
    // await query(`DELETE FROM units`,[]).then(console.log('success delete from units'));

    //@TODO:fetch from firebase

    //@TODO:intialize data
    //insert into db
    // await query(`INSERT INTO users
    //              VALUES (NULL, "AHMAD FIRLI", "80112116", "14031990"),
    //                     (NULL, "BAKHTIAR RIFAI", "82102014", "12061982"),
    //                     (NULL, "DWI HINDHARYA P", "82107126", "29091986"),
    //                     (NULL, "FERIANUS", "82107080", "15061985"),
    //                     (NULL, "GUNAIDY", "80112121", "15011991"),
    //                     (NULL, "MUH. AGUS ROMI", "80107179", "14061983"),
    //                     (NULL, "MUH. YASIN", "80107232", "07031987"),
    //                     (NULL, "RUSWANTO", "80107138", "17061984"),
    //                     (NULL, "WAHYUDI", "80110206", "16041988"),
    //                     (NULL, "YUDHA PRAWIRA ", "80110207", "20111989"),
    //                     (NULL, "ZAINURI", "80110259", "08061990");`, []).then(console.log('insert users'));
    // await query(`SELECT *
    //              FROM users`, []).then(res => console.log(res)).catch(err => console.log(err));
    //
    // query(`INSERT INTO units
    //        VALUES (NULL, 'SE 3001'),
    //               (NULL, 'SE 3002'),
    //               (NULL, 'SE 3003'),
    //               (NULL, 'SE 3004'),
    //               (NULL, 'SE 3005'),
    //               (NULL, 'SE 3006'),
    //               (NULL, 'SE 3007');`, []).then(() => console.log('unit inserted'));
};