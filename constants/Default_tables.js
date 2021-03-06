import query from '../database/query'
import {AsyncStorage, Alert} from "react-native";
import {Updates} from 'expo';
import defaultInput from "./Default_z1inputs";
import {apiUri} from "./config";

let zoneids = [];

function _getZone() {
    return zoneids;
}

function _setZone(zone) {
    zoneids = zone;
}

//#1
export const initMasterTable = async () => {

    const beingUsed = await AsyncStorage.getItem('isUsed');
    console.log(beingUsed);
    if (beingUsed) {
        return;
    }
    //drop table
    await query(`DROP TABLE IF EXISTS units`);
    await query(`DROP TABLE IF EXISTS users`);
    await query(`DROP TABLE IF EXISTS workorders`);

    await query(`DROP TABLE IF EXISTS kinds`);
    await query(`DROP TABLE IF EXISTS zones`);
    await query(`DROP TABLE IF EXISTS groups`);

    await query(`DROP TABLE IF EXISTS camera_inspection`);
    await query(`DROP TABLE IF EXISTS unit_users`);
    await query(`DROP TABLE IF EXISTS kind_units`);
    await query(`DROP TABLE IF EXISTS kind_unit_zones`);
    await query(`DROP TABLE IF EXISTS group_kind_unit_zones`);

    //create table
    await query(`CREATE TABLE IF NOT EXISTS units
                 (
                     id     TEXT PRIMARY KEY NOT NULL,
                     name   TEXT,
                     status INTEGER          NULL DEFAULT 0
                 )`, []).then(() => console.log('unit created'));
    await query(`CREATE TABLE IF NOT EXISTS users
                 (
                     id     TEXT PRIMARY KEY NOT NULL,
                     name   TEXT,
                     nrp    TEXT,
                     lahir  TEXT,
                     level  TEXT,
                     status INTEGER          NULL DEFAULT 0
                 )`, []).then(() => console.log('user created'));
    await query(`CREATE TABLE IF NOT EXISTS unit_users
                 (
                     id      TEXT PRIMARY KEY NOT NULL,
                     user_id TEXT,
                     unit_id TEXT,
                     status DEFAULT 0
                 );`, []).then(() => console.log('unit_users created'));
    await query(`CREATE TABLE kind_units
                 (
                     id           TEXT PRIMARY KEY NOT NULL,
                     kind_id      TEXT,
                     unit_user_id TEXT,
                     status DEFAULT 0

                 );`, []).then(() => console.log('kind_units created'));

    await query(`CREATE TABLE kinds
                 (
                     id     TEXT PRIMARY KEY NOT NULL,
                     name   TEXT,
                     screen TEXT
                 )`, []).then(() => console.log('kind created'));
    await query(`CREATE TABLE zones
                 (
                     id     TEXT PRIMARY KEY NOT NULL,
                     name   TEXT,
                     screen TEXT
                 );`, []).then(() => console.log('zones created'));
    await query(`CREATE TABLE groups
                 (
                     id      TEXT PRIMARY KEY NOT NULL,
                     name    TEXT,
                     screen  TEXT,
                     zone_id TEXT
                 ); `, []).then(() => console.log('groups created'));

    await query(`create table camera_inspection
                 (
                     id          PRIMARY KEY NOT NULL,
                     unit_id     TEXT,
                     input_items TEXT,
                     status DEFAULT 0
                 ); `, []).then(() => console.log('camera inspection created'));
    await query(`CREATE TABLE kind_unit_zones
                 (
                     id           TEXT PRIMARY KEY NOT NULL,
                     kind_unit_id TEXT,
                     zone_id      TEXT,
                     status DEFAULT 0
                 );`, []).then(() => console.log('kind_unit_zones created'));
    await query(`CREATE TABLE group_kind_unit_zones
                 (
                     id                TEXT PRIMARY KEY NOT NULL,
                     kind_unit_zone_id TEXT,
                     group_id          TEXT,
                     input_items       TEXT,
                     status DEFAULT 0
                 );`, []).then(() => console.log('group_kind_unit_zones created'))
    await query(`CREATE TABLE IF NOT EXISTS workorders
                 (
                     id         TEXT PRIMARY KEY NOT NULL,
                     unit_id    TEXT,
                     input_data TEXT,
                     status DEFAULT 0

                 )`, []).then(() => console.log('workorder created'));

};
//#2
export const syncMasterData = async () => {
    //sync user and units
    // await query(`DELETE
    //              FROM units`);
    await fetch(apiUri + "sync.php?data=units", {method: "GET"})
        .then(res => res.json()).then(async res => {
            if (res.length > 0) {
                let sqli = '';
                let keys = Object.keys(res[0]).join(',');
                res.forEach((unit, index) => {
                    sqli += `('${unit.id}','${unit.name}',1)`;
                    if (res.length === index + 1) {
                        return;
                    }
                    sqli += ','
                });
                const sqlquery = `INSERT OR REPLACE INTO units (${keys},status) VALUES ${sqli};`;
                await query(sqlquery, []).then(() => console.log('unit inserted'));
            }
        }).catch(() => Alert.alert('Failed', 'Failed retrive data, can\'t connect to server...', [{
            text: "Retry",
            onPress: () => Updates.reload()
        }]));

    // await query(`DELETE
    //              FROM users`);
    //fetch from server, and initialize data
    await fetch(apiUri + "sync.php?data=users", {method: "GET"})
        .then(res => res.json()).then(async res => {
            if (res.length > 0) {
                let sqli = '';
                let keys = Object.keys(res[0]).join(',');
                res.forEach((user, index) => {
                    sqli += `('${user.id}','${user.name}','${user.nrp}','${user.lahir}','${user.level}',1)`;
                    if (res.length === index + 1) {
                        return;
                    }
                    sqli += ','
                });
                //add status = 1 cz data synced with server
                await query(`INSERT OR REPLACE INTO users (${keys},status) VALUES ${sqli};`, []).then(() => {
                    console.log('account inserted');
                });
            }
        }).catch(() => Alert.alert('Failed', 'Failed retrive data, can\'t connect to server...', [{
            text: "Retry",
            onPress: () => Updates.reload()
        }]));

    await fetch(apiUri + "sync.php?data=unit_users", {method: "GET"})
        .then(res => res.json()).then(async res => {
            if (res.length > 0) {
                let sqli = '';

                res.forEach((unit_user, index) => {
                    sqli += `('${unit_user.id}','${unit_user.unit_id}','${unit_user.user_id}',1)`;
                    if (res.length === index + 1) {
                        return;
                    }
                    sqli += ','
                });
                //add status = 1 cz data synced with server
                await query(`INSERT OR REPLACE INTO unit_users (id,unit_id,user_id,status) VALUES ${sqli};`, []).then(() => {
                    console.log('unit_user inserted');
                });
            }
        }).catch(() => Alert.alert('Failed', 'Failed retrive data, can\'t connect to server...', [{
            text: "Retry",
            onPress: () => Updates.reload()
        }]));
    await fetch(apiUri + "sync.php?data=kind_units", {method: "GET"})
        .then(res => res.json()).then(async res => {
            if (res.length > 0) {
                let sqli = '';
                let keys = Object.keys(res[0]).join(',');
                // console.log(keys);
                res.forEach((kind_units, index) => {
                    sqli += `('${kind_units.id}','${kind_units.kind_id}','${kind_units.unit_user_id}',1)`;
                    if (res.length === index + 1) {
                        return;
                    }
                    sqli += ','
                });
                //add status = 1 cz data synced with server
                await query(`INSERT OR REPLACE INTO kind_units (${keys},status) VALUES ${sqli};`, []).then(() => {
                    console.log('kind_units inserted');
                });
            }
        }).catch(() => Alert.alert('Failed', 'Failed retrive data, can\'t connect to server...', [{
            text: "Retry",
            onPress: () => Updates.reload()
        }]));
    await fetch(apiUri + "sync.php?data=kind_unit_zones", {method: "GET"})
        .then(res => res.json()).then(async res => {
            if (res.length > 0) {
                let sqli = '';
                let keys = Object.keys(res[0]).join(',');
                // console.log(keys);
                res.forEach((kind_unit_zones, index) => {
                    sqli += `('${kind_unit_zones.id}','${kind_unit_zones.kind_unit_id}','${kind_unit_zones.zone_id}',1)`;
                    if (res.length === index + 1) {
                        return;
                    }
                    sqli += ','
                });
                //add status = 1 cz data synced with server
                await query(`INSERT OR REPLACE INTO kind_unit_zones (${keys},status) VALUES ${sqli};`, []).then(() => {
                    console.log('kind_unit_zones inserted');
                });
            }
        }).catch(() => Alert.alert('Failed', 'Failed retrive data, can\'t connect to server...', [{
            text: "Retry",
            onPress: () => Updates.reload()
        }]));
    await fetch(apiUri + "sync.php?data=group_kind_unit_zones", {method: "GET"})
        .then(res => res.json()).then(async res => {
            if (res.length > 0) {
                let sqli = '';
                let keys = Object.keys(res[0]).join(',');
                // console.log(keys);
                res.forEach((group_kind_unit_zones, index) => {
                    sqli += `('${group_kind_unit_zones.id}','${group_kind_unit_zones.kind_unit_zone_id}','${group_kind_unit_zones.group_id}','${group_kind_unit_zones.input_items}',1)`;
                    if (res.length === index + 1) {
                        return;
                    }
                    sqli += ','
                });
                //add status = 1 cz data synced with server
                await query(`INSERT OR REPLACE INTO group_kind_unit_zones (${keys},status) VALUES ${sqli};`, []).then(() => {
                    console.log('group_kind_unit_zones inserted');
                });
            }
        }).catch(() => Alert.alert('Failed', 'Failed retrive data, can\'t connect to server...', [{
            text: "Retry",
            onPress: () => Updates.reload()
        }]));
    await fetch(apiUri + "sync.php?data=workorders", {method: "GET"})
        .then(res => res.json()).then(async res => {
            if (res.length > 0) {
                let sqli = '';
                let keys = Object.keys(res[0]).join(',');
                res.forEach((wo, index) => {
                    sqli += `('${wo.id}','${wo.unit_id}','${wo.input_data}',1)`;
                    if (res.length === index + 1) {
                        return;
                    }
                    sqli += ','
                });
                const sqlquery = `INSERT OR REPLACE INTO workorders (${keys},status) VALUES ${sqli};`;
                await query(sqlquery, []).then(() => console.log('workorders inserted'));
            }
        }).catch(() => Alert.alert('Failed', 'Failed retrive data, can\'t connect to server...', [{
            text: "Retry",
            onPress: () => Updates.reload()
        }]));
    await fetch(apiUri + "sync.php?data=camera_inspection", {method: "GET"})
        .then(res => res.json()).then(async res => {
            if (res.length > 0) {
                let sqli = '';
                let keys = Object.keys(res[0]).join(',');
                res.forEach((ci, index) => {
                    sqli += `('${ci.id}','${ci.unit_id}','${ci.input_items}',1)`;
                    if (res.length === index + 1) {
                        return;
                    }
                    sqli += ','
                });
                const sqlquery = `INSERT OR REPLACE INTO camera_inspection (${keys},status) VALUES ${sqli};`;
                await query(sqlquery, []).then(() => console.log('camera inspection inserted'));
            }
        }).catch(() => Alert.alert('Failed', 'Failed retrive data, can\'t connect to server...', [{
            text: "Retry",
            onPress: () => Updates.reload()
        }]));

};
//#3
export const createTableOffline = async () => {

    //no longer needed to update when app already used
    const beingUsed = await AsyncStorage.getItem('isUsed');
    console.log(beingUsed);
    if (beingUsed) {
        return;
    }
    //set initial fotoQueue as array
    let fotoQueue = JSON.stringify([]);
    await AsyncStorage.setItem('fotoQueue', fotoQueue);
    await query(`DELETE
                 FROM kinds`);
    await fetch(apiUri + "sync.php?data=kinds", {method: "GET"})
        .then(res => res.json()).then(async kinds => {
            let valueKind = '';
            kinds.map((kind, index) => {
                valueKind += `("${kind.id}","${kind.name}","${kind.screen}")`;
                if (index === kinds.length - 1) {
                    return
                }
                valueKind += ','
            });
            await query(`INSERT INTO kinds
            VALUES ` + valueKind, []).then(() => console.log('kinds inserted'));
        });


    await query(`DELETE
                 FROM zones`);
    await fetch(apiUri + "sync.php?data=zones", {method: "GET"})
        .then(res => res.json()).then(async zones => {
            let valueZone = '';
            zones.map((zone, index) => {
                valueZone += `("${zone.id}","${zone.name}","${zone.screen}")`;
                if (index === zones.length - 1) {
                    return
                }
                valueZone += ','
            });
            await query(`INSERT INTO zones
            VALUES ` + valueZone, []).then(() => console.log('zones inserted'));
        })
};
//#4
export const secondPartTableOffline = async () => {

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
            await fetch(`${apiUri}sync.php?data=groups&where=zone_id,"${zone.id}"`, {method: "GET"})
                .then(res => res.json()).then(async groups => {
                    let valueGroup = '';
                    groups.forEach((group, j) => {
                        valueGroup += `("${group.id}","${group.name}","${group.screen}","${zone.id}")`;
                        if (j === groups.length - 1) {
                            return
                        }
                        valueGroup += ','
                    });
                    await query(`INSERT INTO groups
                    VALUES ` + valueGroup, []).then(() => console.log(`groups zone id ${zone.id} inserted`));
                    groupIndex++;
                })
        }
    })
};

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
                     FROM pisheets`).then(() => console.log('delete pisheets'));
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

};