import React from 'react'
import {TouchableOpacity, View, ScrollView, Image, Text, RefreshControl} from 'react-native'
import user from '../constants/UserController';
import {DataTable, Button, ActivityIndicator} from 'react-native-paper'

class LogoTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image
                        source={require('../assets/images/iconut.png')}
                        style={{marginHorizontal: 5, width: 40, height: 40}}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>User</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 10, fontWeight: '100',}}>member of </Text>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>ASTRA</Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default class UserScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        // title: "United Tractor",
        return {
            headerTitle: <LogoTitle navigation={navigation}/>,
            headerStyle: {backgroundColor: "#FEDA01"}
        }
    };
    loading = false;

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            users: []
        }
    }

    componentDidMount() {
        this.update()
    }

    update = async () => {
        this.loading = true;
        let isConnected = this.props.screenProps.isConnected;
        this.setState({refreshing: true});
        await user.select(null,isConnected)
            .then(users => {
                console.log(users);
                this.loading = false;

                if(typeof users === 'object'){
                    this.setState({users: users})
                }
                this.setState({refreshing: false})
            })
            .catch(err => console.log(err));

    };

    render() {
        const {users} = this.state;
        const loading = this.loading;
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.update}
                />
            }>
                <DataTable style={{textAlign: 'center'}}>
                    <DataTable.Header>
                        <DataTable.Title style={{maxWidth: 25}}>No</DataTable.Title>
                        <DataTable.Title>Nama</DataTable.Title>
                        <DataTable.Title numeric>NRP</DataTable.Title>
                        <DataTable.Title numeric>Tanggal lahir</DataTable.Title>
                    </DataTable.Header>
                    {
                        loading ? (<ActivityIndicator style={{marginTop: 20}}/>) :
                            users.map((user, key) => {
                                return (
                                    <DataTable.Row key={key}>
                                        <DataTable.Cell style={{maxWidth: 25}}>{key + 1}</DataTable.Cell>
                                        <DataTable.Cell style={{textAlign: 'left'}}>{user.name}</DataTable.Cell>
                                        <DataTable.Cell style={{textAlign: 'left'}} numeric>{user.nrp}</DataTable.Cell>
                                        <DataTable.Cell style={{textAlign: 'left'}}
                                                        numeric>{user.lahir}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                    }
                    <DataTable.Pagination
                        page={0}
                        numberOfPages={2}
                        onPageChange={(page) => {
                            users.slice(0, 5)
                        }}
                        label="1-2 of 6"
                    />
                </DataTable>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button style={{margin: 15}} mode="contained"
                            onPress={() => this.props.navigation.navigate('AddUser')}>Tambah User</Button>
                </View>
            </ScrollView>
        )
    }
}