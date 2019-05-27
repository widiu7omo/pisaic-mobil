import query from '../database/query';
import {apiUri} from "./config";

const createFormData = (body) => {
    const data = new FormData();
    body.forEach(user => {
        Object.keys(user).forEach(key => {
            data.append(key, user[key]);
        });
    });


    return data;
};

export const checkUsers = async () => {
    await query(`select *
                 from users
                 where status = 0`).then(res => {
        if (res.length > 0) {
            fetch(apiUri + "sync.php?input=users", {
                method: "POST",
                body: createFormData(res)
            }).then(res =>
                res.json())
                .then(res => console.log(res));
        }
    });
}