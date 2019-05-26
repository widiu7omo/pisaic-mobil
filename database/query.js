import db from './connection'

const executeSql = async (sql, params = [],error = null,success = null) => {
    return new Promise((resolve, reject) => db().transaction(tx => {
        tx.executeSql(sql, params, (_, {rows}) => resolve(rows._array), (t,error)=>reject(error))
    },error,success));
};
export default executeSql