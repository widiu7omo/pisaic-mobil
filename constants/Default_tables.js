import query from '../database/query'
import {kinds} from './Default_kinds'
export const createTableMaster = async () => {
    await query(`DROP TABLE IF EXISTS units`);
    await query(`DROP TABLE IF EXISTS users`);
    await query(`DROP TABLE IF EXISTS kinds`);
    await query(`CREATE TABLE units
                 (
                     id   INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     name TEXT
                 )`, []).then(() => console.log('unit created'));
    await query(`CREATE TABLE users
                 (
                     id    INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     name  TEXT,
                     nrp   TEXT,
                     lahir TEXT
                 )`, []).then(() => console.log('user created'));
    await query(`CREATE TABLE kinds
                 (
                     id   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                     name TEXT,
                     screen TEXT
                 )`, []).then(() => console.log('kind created'));
    //users insert
    await query(`DELETE
                 FROM users`);
    await query(`INSERT INTO users
                 VALUES (NULL, "AHMAD FIRLI", "80112116", "14031990"),
                        (NULL, "BAKHTIAR RIFAI", "82102014", "12061982"),
                        (NULL, "DWI HINDHARYA P", "82107126", "29091986"),
                        (NULL, "FERIANUS", "82107080", "15061985"),
                        (NULL, "GUNAIDY", "80112121", "15011991"),
                        (NULL, "MUH. AGUS ROMI", "80107179", "14061983"),
                        (NULL, "MUH. YASIN", "80107232", "07031987"),
                        (NULL, "RUSWANTO", "80107138", "17061984"),
                        (NULL, "WAHYUDI", "80110206", "16041988"),
                        (NULL, "YUDHA PRAWIRA ", "80110207", "20111989"),
                        (NULL, "ZAINURI", "80110259", "08061990");
    `, []).then(() => console.log('account inserted'));
    //units insert
    await query(`DELETE
                 FROM units`);
    await query(`INSERT INTO units
                 VALUES (NULL, 'SE 3001'),
                        (NULL, 'SE 3002'),
                        (NULL, 'SE 3003'),
                        (NULL, 'SE 3004'),
                        (NULL, 'SE 3005'),
                        (NULL, 'SE 3006'),
                        (NULL, 'SE 3007');`, []).then(() => console.log('unit inserted'));

    //kinds insert
    await query(`DELETE FROM kinds`);
    let valueKind = '';
    kinds.map((kind,index)=>{
        valueKind += `(NULL,"${kind.name}","${kind.screen}")`;
        if(index === kinds.length-1){
            return
        }
        valueKind +=','
    });
    await query(`INSERT INTO kinds VALUES `+valueKind,[]).then(()=>console.log('kinds inserted'));
};

