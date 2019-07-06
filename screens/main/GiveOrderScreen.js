import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Picker,
    Dimensions,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import {Button, Card} from "react-native-paper";
import query from '../../database/query';
import CustomHeader from "../../components/CustomHeader";
import {ID} from "../../constants/Unique";
import {checkDataTable} from "../../constants/Data_to_update";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    containerPicker: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
})
export default class GiveOrderScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <CustomHeader headerName="headerTitle"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            units: [],
            users: [],
            orders: [],
            order: {
                unit_id: '',
                user_id: ''
            },
            loading: false,
            refreshing: false
        }
    }

    componentDidMount = async () => {
        this.setState({loading: true});
        const units = await query('SELECT * FROM units');
        const users = await query('SELECT * FROM users');
        const orders = await query('SELECT unit_id,user_id FROM unit_users');
        this.setState({units: units, users: users, orders: orders, loading: false});
    };

    appendCard = async (initOrder) => {
        let orders = [...this.state.orders];
        orders.push(initOrder);
        this.setState({orders});
        console.log(orders);
        let copyUsers = [...this.state.users];
        orders.map((order, index) => {
            this.state.users.forEach((user, index) => {
                if (order.user_id === user.id) {
                    copyUsers.splice(index, 1);
                }
            })
        });
        console.log(copyUsers);
        // this.setState({users:copyUsers});

    };
    PickerData = (datas, order, key, index) => (
        <Picker
            style={{width: Dimensions.get('window').width / 2.5}}
            selectedValue={order[key]}
            onValueChange={value => {
                const orders = [...this.state.orders];
                orders[index] = {...orders[index], [key]: value};
                this.checking(order);
                this.setState({orders: orders});
            }
            }>
            {
                datas.map((data, key) => (
                    <Picker.Item key={key} label={data.name}
                                 value={data.id}/>
                ))
            }
        </Picker>);

    removeOrders = (index) => {
        const copyOrders = [...this.state.orders];
        copyOrders.splice(index, 1);
        this.setState({orders: copyOrders});

    };
    checking = (order) => {
        const {users, units} = this.state;
        let isUserExist = [];
        let isUnitExist = [];
        users.forEach((user) => {
            user.id === order.user_id ? isUserExist.push(user) : null;
        });
        units.forEach(unit => {
            unit.id === order.unit_id ? isUnitExist.push(unit) : null;
        });
        console.log(isUserExist);
        return {isUserExist, isUnitExist};
    };
    refresh = async () => {
        this.setState({loading: true});
        let isConnected = this.props.screenProps.isConnected;
        this.setState({refreshing: true});
        if (isConnected) {
            await checkDataTable('unit_users')
                .then( async res => {
                    await query('DELETE FROM unit_users');
                    await query('SELECT user_id,unit_id from unit_users')
                        .then(orders=>{
                            console.log(orders)
                            this.setState({refreshing: false,loading:false})
                        })

                    // let keys = await Object.keys(orders[0]);
                    // let joinedKeys = keys.join(',');
                    // let values = '';
                    // orders.forEach((order,index)=>{
                    //     values += `('${order.id}','${order.user_id}','${order.unit_id}',1)`;
                    //     if(orders.length === index+1){
                    //         return;
                    //     }
                    //     values +=',';
                    // })
                    // let sql = `INSERT OR REPLACE INTO unit_users (${joinedKeys},status) VALUES ${values}`;
                    // query(sql);
                    // this.setState({orders});
                    // this.setState({refreshing: false,loading:false})
                })
                .catch(err => console.log(err));
        }

    };

    sendOrder = async (orders) => {
        if (orders.length > 0) {

            let values = '';

            await orders.forEach((order, index) => {
                query('SELECT id from unit_users where user_id=? and unit_id=?', [order.user_id, order.unit_id])
                    .then(res => {
                        let id = ID();
                        if (res.length > 0) {
                            id = res[0].id;
                        }
                        values = `('${id}','${order.unit_id}','${order.user_id}',0)`;
                        console.log(values);
                        let sql = `INSERT OR REPLACE INTO unit_users (id,unit_id,user_id,status) VALUES ${values}`;
                        query(sql);
                    });

            });

            await Alert.alert('Success', 'Data berhasil disimpan', [{
                text: 'OK', onPress: async () => {
                    if (this.props.screenProps.isConnected) {
                        await checkDataTable('unit_users').then(console.log('synced unit_users'));
                    }
                }
            }]);
        }
    }

    render() {
        let {units, users, orders, loading} = this.state;
        users = users.filter(user => {
            return (user.name !== 'spv' && user.name !== 'admin' && user.name !== 'mekanik') ? user : null;
        });
        return (
            <ScrollView style={{flex: 1, margin: 10}}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh}
                        />
                        }>
                {
                    loading ? <ActivityIndicator size="large" color={Colors.darkColor}/> :
                        orders.length === 0 ?
                            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                                <Text style={{fontSize: 18, fontWeight: '400'}}>Masih kosong</Text>
                            </View>
                            :
                            orders.map((order, index) =>
                                (
                                    <View key={index} style={{padding: 10}}>
                                        <Card>
                                            <View style={{
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                alignItems: 'space-between'
                                            }}>
                                                <Text style={{padding: 10, fontWeight: '500', fontSize: 18}}>{index + 1}.
                                                    Give Order</Text>
                                                <Button style={{margin: 10}} icon="delete" mode="contained"
                                                        onPress={() => Alert.alert('Alert', 'Are you sure to delete?', [{
                                                            text: 'Delete',
                                                            onPress: () => this.removeOrders(index)
                                                        }, {text: 'Cancel'}], {cancelable: false})}>Delete</Button>
                                            </View>
                                            <Card.Content style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'space-between'
                                            }}>

                                                <View style={styles.containerPicker}>
                                                    <Text>Pilih Pegawai</Text>
                                                    {this.PickerData(users, order, 'user_id', index)}
                                                </View>
                                                <View style={styles.containerPicker}>
                                                    <Text>Pilih Unit</Text>
                                                    {this.PickerData(units, order, 'unit_id', index)}
                                                </View>
                                            </Card.Content>
                                        </Card>

                                    </View>
                                )
                            )
                }
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end', padding: 10}}>
                    <Button onPress={() => this.sendOrder(this.state.orders)} style={{marginRight: 10}}
                            mode="contained">Send</Button>
                    <Button onPress={() => this.appendCard(this.state.order)} mode='contained'>Tambah Give
                        Order</Button>
                </View>

            </ScrollView>
        )
    }
}
