import query from '../database/query'
import {ID} from "./Unique";

var data =
            [
                {
                    "id": "1",
                    "name": "Periodic Inspection Sheet",
                    "screen": "PeriodicInspection"
                },
                {
                    "id": "2",
                    "name": "Inspection Camera",
                    "screen": "InspectCamera"
                },
                {
                    "id": "3",
                    "name": "Problem Log",
                    "screen": "ProblemLogScreen"
                },
                {
                    "id": "4",
                    "name": "Backlog Entry Sheet",
                    "screen": "BacklogEntry"
                },
                {
                    "id": "5",
                    "name": "Backlog Monitoring Sheet",
                    "screen": "BacklogMonitor"
                },
                {
                    "id": "6",
                    "name": "Cylinder Daily Check Sheet",
                    "screen": "CylinderDaily"
                }
            ]


export const init = async () => {
    let keys = Object.keys(data[0]).join(',');
    let sqli = ''
    let toServer = [];
    data.forEach((unit,index)=>{
        let id = ID();
        delete unit.id;
        unit.id = id;
        toServer.push(unit);
        sqli += `('${id}',"${unit.name}","${unit.nrp}","${unit.lahir}")`
        if (data.length === index + 1) {
            return;
        }
        sqli += ','
    });
    let form = new FormData();
    form.append('kinds',JSON.stringify(toServer));
    console.log(form);
    await fetch('http://192.168.1.66/sync.php?input=kinds',{method:"POST",body:form}).then(res=>console.log(res));
    //
    // await query(`DROP TABLE IF EXISTS units`);
    // await query(`DROP TABLE IF EXISTS users`);
    //
    // await query(`DROP TABLE IF EXISTS kinds`);
    // await query(`DROP TABLE IF EXISTS zones`);
    // await query(`DROP TABLE IF EXISTS groups`);
    //
    // await query(`DROP TABLE IF EXISTS unit_users`);
    // await query(`DROP TABLE IF EXISTS kind_units`);
    // await query(`DROP TABLE IF EXISTS kind_unit_zones`);
    // await query(`DROP TABLE IF EXISTS group_kind_unit_zones`);
    //
    // await query(`CREATE TABLE IF NOT EXISTS units
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  name   TEXT,
    //                  status INTEGER          NULL DEFAULT 0
    //              )`, []).then(() => console.log('unit created'));
    // await query(`CREATE TABLE IF NOT EXISTS users
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  name   TEXT,
    //                  nrp    TEXT,
    //                  lahir  TEXT,
    //                  status INTEGER          NULL DEFAULT 0
    //              )`, []).then(() => console.log('user created'));
    // await query(`CREATE TABLE IF NOT EXISTS unit_users
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  user_id int,
    //                  unit_id int,
    //                  status DEFAULT 0
    //              );`, []).then(() => console.log('unit_users created'))
    // await query(`CREATE TABLE kind_units
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  kind_id      INTEGER,
    //                  unit_user_id INTEGER,
    //                  status DEFAULT 0
    //
    //              );`, []).then(() => console.log('kind_units created'));
    //
    // await query(`CREATE TABLE kinds
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  name   TEXT,
    //                  screen TEXT
    //              )`, []).then(() => console.log('kind created'));
    // await query(`CREATE TABLE zones
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  name   TEXT,
    //                  screen TEXT
    //              );`, []).then(() => console.log('zones created'))
    // await query(`CREATE TABLE groups
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  name    TEXT,
    //                  screen  TEXT,
    //                  zone_id INTEGER
    //              ); `, []).then(() => console.log('groups created'))
    //
    // await query(`CREATE TABLE kind_unit_zones
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  kind_unit_id INTEGER,
    //                  zone_id      INTEGER,
    //                  status DEFAULT 0
    //              );`, []).then(() => console.log('kind_unit_zones created'))
    // await query(`CREATE TABLE group_kind_unit_zones
    //              (
    //                  id     TEXT PRIMARY KEY NOT NULL,
    //                  kind_unit_zone_id INTEGER,
    //                  group_id          INTEGER,
    //                  input_items       TEXT,
    //                  status DEFAULT 0
    //              );`, []).then(() => console.log('group_kind_unit_zones created'))
    // await query(`delete from users`)
    // await query(`insert into users (id,${keys}) values ${sqli}`).then(console.log('update users'));
}