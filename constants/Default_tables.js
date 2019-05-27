import query from '../database/query'
import {kinds} from './Default_kinds'
import {zones} from "./Default_zones";
import {groups} from "./Default_groups";
import {AsyncStorage, Alert} from "react-native";
import defaultInput from "./Default_z1inputs";
import {apiUri} from "./config";
// import {checkConnection} from '../database/checkConnection'

let zoneids = [];

function _getZone() {
    return zoneids;
}

function _setZone(zone) {
    zoneids = zone;
}

export const createTableMaster = async () => {
    // checkConnection().then(isConnected => {
    //     if (isConnected === false) {
    //         Alert.alert('Gagal', "Anda tidak terkoneksi dengan internet. Pastikan untuk terkoneksi internet untuk membuka pertama kali")
    //         return;
    //     }
    //     console.log('connected');
    // });
    await query(`DROP TABLE IF EXISTS units`);
    await query(`DROP TABLE IF EXISTS users`);

    //TODO:add IF NOT EXIST THEN,if table are fixed
    await query(`CREATE TABLE units
                 (
                     id   INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     name TEXT,
                     status INTEGER NULL DEFAULT 0
                 )`, []).then(() => console.log('unit created'));
    await query(`CREATE TABLE users
                 (
                     id    INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     name  TEXT,
                     nrp   TEXT,
                     lahir TEXT,
                     status INTEGER NULL DEFAULT 0
                 )`, []).then(() => console.log('user created'));

    //users insert
    await query(`DELETE
                 FROM users`);
    //fetch from firebase, and intialize data
    await fetch(apiUri+"sync.php?data=users", {method: "GET"})
        .then(res => res.json()).then(res => {
            let sqli = '';
            let keys = Object.keys(res[0]).join(',');
            res.forEach((user, index) => {
                sqli += `(${user.id},'${user.name}','${user.lahir}','${user.nrp}')`;
                if (res.length === index + 1) {
                    return;
                }
                sqli += ','
            });
            query(`INSERT INTO users (${keys})
                 VALUES ${sqli};`, []).then(() => console.log('account inserted'));
        });

    //units insert
    await query(`DELETE
                 FROM units`);
    await fetch(apiUri+"sync.php?data=units", {method: "GET"})
        .then(res => res.json()).then(res => {
            let sqli = '';
            let keys = Object.keys(res[0]).join(',');
            res.forEach((user, index) => {
                sqli += `(${user.id},'${user.name}')`;
                if (res.length === index + 1) {
                    return;
                }
                sqli += ','
            });
            query(`INSERT INTO units (${keys})
                 VALUES ${sqli};`, []).then(() => console.log('unit inserted'));
        });

    const beingUsed = await AsyncStorage.getItem('isUsed');
    console.log(beingUsed);
    if (beingUsed) {
        return;
    }
    await query(`DROP TABLE IF EXISTS kinds`);
    await query(`DROP TABLE IF EXISTS zones`);
    await query(`DROP TABLE IF EXISTS groups`);

    await query(`CREATE TABLE kinds
                 (
                     id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                     name   TEXT,
                     screen TEXT
                 )`, []).then(() => console.log('kind created'));
    await query(`CREATE TABLE zones
                 (
                     id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                     name   TEXT,
                     screen TEXT
                 );`, []).then(() => console.log('zones created'))
    await query(`CREATE TABLE groups
                 (
                     id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                     name    TEXT,
                     screen  TEXT,
                     zone_id INTEGER
                 ); `, []).then(() => console.log('groups created'))


    await query(`DELETE
                 FROM kinds`);
    let valueKind = '';
    kinds.map((kind, index) => {
        valueKind += `(NULL,"${kind.name}","${kind.screen}")`;
        if (index === kinds.length - 1) {
            return
        }
        valueKind += ','
    });
    await query(`INSERT INTO kinds
    VALUES ` + valueKind, []).then(() => console.log('kinds inserted'));

    await query(`DELETE
                 FROM zones`);
    let valueZone = '';
    zones.map((zone, index) => {
        valueZone += `(NULL,"${zone.name}","${zone.screen}")`;
        if (index === zones.length - 1) {
            return
        }
        valueZone += ','
    });
    await query(`INSERT INTO zones
    VALUES ` + valueZone, []).then(() => console.log('zones inserted'));
};

export const _createSecondMasterTable = async () => {
    const beingUsed = await AsyncStorage.getItem('isUsed');
    // console.log(beingUsed);
    if (beingUsed) {
        return;
    }

    await query(`DROP TABLE IF EXISTS kind_units`);
    await query(`DROP TABLE IF EXISTS kind_unit_zones`);
    await query(`DROP TABLE IF EXISTS group_kind_unit_zones`)

    await query(`CREATE TABLE kind_units
                 (
                     id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                     kind_id INTEGER,
                     unit_id INTEGER,
                     status DEFAULT 0

                 );`, []).then(() => console.log('kind_units created'));

    await query(`CREATE TABLE kind_unit_zones
                 (
                     id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                     kind_unit_id INTEGER,
                     zone_id      INTEGER,
                     status DEFAULT 0
                 );`, []).then(() => console.log('kind_unit_zones created'))
    await query(`CREATE TABLE group_kind_unit_zones
                 (
                     id                INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                     kind_unit_zone_id INTEGER,
                     group_id          INTEGER,
                     input_items       TEXT,
                     status DEFAULT 0
                 );`, []).then(() => console.log('group_kind_unit_zones created'))
}

export const _partSecondTable = async () => {

    const beingUsed = await AsyncStorage.getItem('isUsed');
    // console.log(beingUsed);
    if (beingUsed) {
        return;
    }
    await query(`SELECT id
                 FROM zones`, []).then((rows) => {
        _setZone(rows);
    });

    await query(`DELETE
                 FROM groups`);

    const zoneids = _getZone();
    let groupIndex = 0;
    zoneids.map(async (zone, i) => {
        if (i > 1) {
            let valueGroup = '';
            groups[i - 2].forEach((group, j) => {
                valueGroup += `(NULL,"${group.name}","${group.screen}","${zone.id}")`;
                if (j === groups[i - 2].length - 1) {
                    return
                }
                valueGroup += ','
            });
            await query(`INSERT INTO groups
            VALUES ` + valueGroup, []).then(() => console.log(`groups ${i - 2} inserted`));
            groupIndex++;
        }
    })
}

export const _createMasterData = async () => {
    const beingUsed = await AsyncStorage.getItem('isUsed');
    console.log(beingUsed);
    if (beingUsed) {
        return;
    }
    await query(`CREATE TABLE IF NOT EXISTS pisheets
                 (
                     id      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     unit_id INTEGER
                 );`, []).then(() => console.log('pisheets created'));
    await query(`CREATE TABLE IF NOT EXISTS zone1s
                 (
                     id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     pisheet_id INTEGER
                 );`, []).then(() => console.log('zone 1 created'));
    await query(`CREATE TABLE IF NOT EXISTS zone2s
                 (
                     id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     pisheet_id INTEGER
                 );`, []).then(() => console.log('zone 2 created'));
    await query(`CREATE TABLE IF NOT EXISTS zone3s
                 (
                     id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     pisheet_id INTEGER
                 );`, []).then(() => console.log('zone 3 created'));
    await query(`SELECT *
                 FROM units`, []).then(async results => {
        let param = [];
        await query(`DELETE
                     FROM pisheets`).then(() => console.log('delete pisheets'))
        await results.forEach(result => {
            const q = "INSERT INTO pisheets VALUES (null,?)";
            param.push(result.id);
            query(q, param);
            param = [];
        })
    }).then(() => console.log('insert batch to pisheets'));
    await query(`CREATE TABLE IF NOT EXISTS z1a
                 (
                     id          INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     input_items TEXT,
                     zone1_id    INTEGER
                 );`, []).then(() => console.log('zone1a created'));
    await query(`CREATE TABLE IF NOT EXISTS z1b
                 (
                     id          INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                     input_items TEXT,
                     zone1_id    INTEGER
                 );`, []).then(() => console.log('zone1b created'));

    await query(`DELETE
                 FROM z1a`);
    await query(`INSERT INTO z1a
                 VALUES (null, ?, ?)`, [defaultInput.z1a, 1]).then(() => console.log('z1a inserted'));
    await query(`DELETE
                 FROM z1b`);
    await query(`INSERT INTO z1b
                 VALUES (null, ?, ?)`, [defaultInput.z1b, 1]).then(() => console.log('z1b inserted'));

}