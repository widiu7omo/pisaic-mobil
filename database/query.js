import db from './connection'

const executeSql = async (sql, params = [],error = null,success = null) => {
    return new Promise((resolve, reject) => db().transaction(tx => {
        tx.executeSql(sql, params, (_, {insertId,rows}) => resolve(rows._array,insertId), (t,error)=>reject(error))
    },error,success));
};
export default executeSql