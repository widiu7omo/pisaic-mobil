//
// import {executeQuery} from './connection'
// let db = {};
// executeQuery().then(resuls => {
//     // console.log(resuls)
//     db = resuls
// });
// console.log(db);
//
// // executeQuery(`select * from groups`,[],(_,{rows})=>console.log(rows));
// // const executeSql = async (sql, params = [],error = null,success = null) => {
// //     return new Promise((resolve, reject) => db().transaction(tx => {
// //         tx.executeSql(sql, params, (_, {rows}) => resolve(rows._array), reject)
// //     },error,success));
// // };
// export default executeQuery