import React from 'react'
import {FlatList, View, StyleSheet, ScrollView, Text, Picker, ActivityIndicator,Alert} from 'react-native'
import {Card, Button, TextInput, RadioButton} from 'react-native-paper'
import CustomHeader from '../../../../components/CustomHeader'
import KeyboardShift from '../../../../components/KeyboardShift'
import {normalize} from "../../../../constants/FontSize";
import query from "../../../../database/query"
import Colors from "../../../../constants/Colors";
import input from "../../../../constants/Default_z1inputs";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    inputField: {
        flexDirection: 'column',
        padding: 10,
        paddingBottom: 20
    },
    subContainer: {
        flexDirection: 'row'
    },
    colFlexStart: {flexDirection: "column", justifyContent: "flex-start"},
    rowFlexStart: {flexDirection: "row", justifyContent: "flex-start"},
    beforePicker: {
        marginBottom: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    viewFoto: {
        marginBottom: 10,
        fontSize: normalize(15),
        fontWeight: "600"
    },
    pickerBold: {
        fontSize: normalize(15),
        fontWeight: "600"
    }
});
export default class z1aScreen extends React.Component {
    componentDidMount() {
        this.fetchInput().then(() => this.setState({loading: false}))
    }

    saveInput = async () => {
        let group_id = this.props.navigation.getParam('group_id');
        let kind_unit_zone_id = this.props.navigation.getParam('kind_unit_zone_id');
        let input_items = JSON.stringify(this.state.inputItems);
        console.log(input_items);
        await query(`INSERT OR
                     REPLACE
                     INTO group_kind_unit_zones (id, kind_unit_zone_id, group_id, input_items)
                     VALUES ((SELECT id FROM group_kind_unit_zones WHERE kind_unit_zone_id = ? AND group_id = ?), ?, ?,
                             ?);`,
            [kind_unit_zone_id, group_id, kind_unit_zone_id, group_id,input_items]);
        await query(`select seq as group_kind_unit_zone_id
                     from sqlite_sequence
                     where name = "group_kind_unit_zones"`).then(res => {
            console.log(res);
            Alert.alert('Success','Data berhasil tersimpan');
        })
    };
    fetchInput = async () => {
        let group_id = this.props.navigation.getParam('group_id');
        let kind_unit_zone_id = this.props.navigation.getParam('kind_unit_zone_id');
        this.setState({loading: true});
        await query(`select *
                     from group_kind_unit_zones
                     where group_id = ?
                       and kind_unit_zone_id = ?`, [group_id, kind_unit_zone_id])
            .then(result => {
                let res = input.z1d;
                console.log(result);
                if (result.length === 1) {
                    res = result[0].input_items;
                }
                const parsedRes = JSON.parse(res);
                this.setState({inputItems: parsedRes});
            })
    };
    state = {
        loading: false,
        //ganti kata2 yang ada disini
        inputItems: []
    };
    static navigationOptions = {
        headerTitle: <CustomHeader headerName="zone"/>,
        headerStyle: {backgroundColor: "#FEDA01"},
        headerIcon: null,
    };

    constructor(props) {
        super(props);

        this.groupProps = {
            condition: '',
            note: ["None", "Leak", "Broken", "Missing", "Loosen ", "Worn", "Crack", "Other"],
            priority: ["None", "Now", "Chng. Shift", "Next PS", "Backlog"],
            foto: {name: '', catatan: ''},
            remark: ''
        }
    }

    ImagePicker = title => {
        this.props.navigation.navigate('ImagePicker', {
            zonekind: title,
            unit: this.props.navigation.getParam('unit')
        });
    };

    PickerOption = (option, index, OptionSelect, kind) => (
        <Picker
            enabled={option.condition !== 'Good'}
            style={{color:option.condition !== 'Good'?Colors.pureDark:Colors.disable}}
            selectedValue={option[kind]}
            onValueChange={value => {
                const inputItems = [...this.state.inputItems];
                inputItems[index] = {
                    ...inputItems[index],
                    [kind]: value
                };
                this.setState({inputItems})
            }
            }>
            {
                OptionSelect.map((note, key) => (
                    <Picker.Item key={key} label={note}
                                 value={note}/>
                ))
            }
        </Picker>
    );

    InputList = inputItems => (
        <FlatList data={inputItems}
                  renderItem={({item, index}) => {
                      return (
                          <View key={index} style={{padding: 10}}>
                              <Card>
                                  <Card.Content>
                                      <View style={styles.colFlexStart}>
                                          <View style={{marginBottom: 10}}>
                                              <Text style={{
                                                  fontSize: normalize(18),
                                                  fontWeight: "500"
                                              }}>{(index + 1) + ". " + item.name}</Text>
                                              <Text
                                                  style={{fontSize: normalize(13)}}>{item.subname}</Text>
                                          </View>
                                          <View style={styles.beforePicker}>
                                              <View>
                                                  <Text style={styles.pickerBold}>Condition</Text>
                                                  <RadioButton.Group
                                                      onValueChange={condition => {
                                                          const inputItems = [...this.state.inputItems];
                                                          inputItems[index] = {
                                                              ...inputItems[index],
                                                              condition: condition
                                                          };
                                                          this.setState({inputItems})
                                                      }} value={item.condition}>
                                                      <View style={styles.rowFlexStart}>
                                                          <Text
                                                              style={{fontSize: normalize(12)}}>Good </Text>
                                                          <Text
                                                              style={{fontSize: normalize(12)}}> Bad </Text>
                                                          <Text
                                                              style={{fontSize: normalize(12)}}> Uncheck</Text>
                                                      </View>
                                                      <View style={styles.rowFlexStart}>
                                                          <RadioButton value="Good"/>
                                                          <RadioButton value="Bad"/>
                                                          <RadioButton value="Uncheck"/>
                                                      </View>
                                                  </RadioButton.Group>
                                              </View>
                                              <View>
                                                  <Text style={styles.viewFoto}>Foto</Text>
                                                  <Button icon="add-a-photo" dark={true}
                                                          mode="contained"
                                                          onPress={() => this.ImagePicker(item.name)}>Foto</Button>
                                              </View>
                                          </View>
                                      </View>
                                      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                          <View style={{flex: 1}}>
                                              <Text style={styles.pickerBold}>Note</Text>
                                              {/*Picker Note*/}
                                              {this.PickerOption(item, index, this.groupProps.note, 'note')}
                                          </View>
                                          <View style={{flex: 1}}>
                                              <Text style={styles.pickerBold}>Priority</Text>
                                              {/*Picker Priority*/}
                                              {this.PickerOption(item, index, this.groupProps.priority, 'priority')}
                                          </View>
                                      </View>

                                      <View style={{flexDirection: "column"}}>
                                          <TextInput mode="flat" label="Remark (Detail Temuan)"
                                                     value={item.remark}
                                                     onChangeText={(remark) => {
                                                         const inputItems = [...this.state.inputItems];
                                                         inputItems[index] = {
                                                             ...inputItems[index],
                                                             remark: remark
                                                         };
                                                         this.setState({inputItems})
                                                     }}
                                          />
                                      </View>

                                  </Card.Content>
                              </Card>
                          </View>)
                  }}
                  extraData={this.state}
                  keyExtractor={(item) => item.name}>
        </FlatList>);

    render() {
        const {inputItems, loading} = this.state;
        return (
            <KeyboardShift>
                {() => (
                    <View style={styles.container}>
                        {
                            loading ? <ActivityIndicator size="large" color={Colors.darkColor}/> :
                                <ScrollView style={styles.inputField}>
                                    {this.InputList(inputItems)}
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        marginVertical: 10,
                                        padding: 10
                                    }}>
                                        <Button icon="keyboard-arrow-left" mode="contained"
                                                style={{marginHorizontal: 10}}
                                                onPress={() => this.props.navigation.goBack()}>Kembali</Button>
                                        <Button icon="save" mode="contained"
                                                onPress={() => this.saveInput()}>Simpan</Button>
                                    </View>


                                </ScrollView>
                        }
                    </View>
                )}
            </KeyboardShift>
        )
    }
}
