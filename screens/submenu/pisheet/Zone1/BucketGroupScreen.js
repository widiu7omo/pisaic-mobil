import React from 'react'
import { FlatList, View, StyleSheet, ScrollView, Text, Picker, ActivityIndicator} from 'react-native'
import {Card, Button, TextInput, RadioButton} from 'react-native-paper'
import CustomHeader from '../../../../components/CustomHeader'
import KeyboardShift from '../../../../components/KeyboardShift'
import {normalize} from "../../../../constants/FontSize";
import query from "../../../../database/query"
import Colors from "../../../../constants/Colors";
export default class BucketGroupScreen extends React.Component {
    componentDidMount() {
        this.fetchInput().then(()=>this.setState({loading:false}))
    }

    fetchInput = async () =>{
        this.setState({loading:true});
        await query(`select * from bucketgroups where zone1_id = ?`,[1])
            .then(result =>{
                const res = result[0].input_items;
                const parsedRes =  JSON.parse(res);
                this.setState({inputItems:parsedRes});
            })
    };
    state = {
        loading:false,
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
        this.props.navigation.navigate('ImagePicker',{
            zonekind:title,
            unit:this.props.navigation.getParam('unit')
        });
    };

    render() {
        const checked = 'first';
        const {inputItems,loading} = this.state;
        return (
            <KeyboardShift>
                {() => (
                    <View style={styles.container}>
                        {
                        loading?<ActivityIndicator size="large" color={Colors.darkColor} />:
                        <ScrollView style={styles.inputField}>

                            <FlatList data={inputItems}
                                      renderItem={({item, index}) => {
                                          return (
                                              <View key={index} style={{padding: 10}}>
                                                  <Card>
                                                      <Card.Content>
                                                          <View style={{
                                                              flexDirection: "column",
                                                              justifyContent: "flex-start"
                                                          }}>
                                                              <View style={{marginBottom: 10}}>
                                                                  <Text style={{
                                                                      fontSize: normalize(18),
                                                                      fontWeight: "500"
                                                                  }}>{(index + 1) + ". " + item.name}</Text>
                                                                  <Text
                                                                      style={{fontSize: normalize(13)}}>{item.subname}</Text>
                                                              </View>
                                                              <View style={{
                                                                  marginBottom: 10,
                                                                  flex: 1,
                                                                  flexDirection: "row",
                                                                  justifyContent: "space-between"
                                                              }}>
                                                                  <View>
                                                                      <Text style={{
                                                                          fontSize: normalize(15),
                                                                          fontWeight: "600"
                                                                      }}>Condition</Text>
                                                                      <RadioButton.Group
                                                                          onValueChange={condition => {
                                                                              const inputItems = [...this.state.inputItems];
                                                                              inputItems[index] = {
                                                                                  ...inputItems[index],
                                                                                  condition: condition
                                                                              };
                                                                              this.setState({inputItems})
                                                                          }} value={item.condition}>
                                                                          <View style={{
                                                                              flexDirection: "row",
                                                                              justifyContent: "flex-start"
                                                                          }}>
                                                                              <Text
                                                                                  style={{fontSize: normalize(12)}}>Good </Text>
                                                                              <Text
                                                                                  style={{fontSize: normalize(12)}}> Bad </Text>
                                                                              <Text
                                                                                  style={{fontSize: normalize(12)}}> Uncheck</Text>
                                                                          </View>
                                                                          <View style={{
                                                                              flexDirection: "row",
                                                                              justifyContent: "flex-start"
                                                                          }}>
                                                                              <RadioButton value="Good"/>
                                                                              <RadioButton value="Bad"/>
                                                                              <RadioButton value="Uncheck"/>
                                                                          </View>
                                                                      </RadioButton.Group>
                                                                  </View>
                                                                  <View>
                                                                      <Text style={{
                                                                          marginBottom: 10,
                                                                          fontSize: normalize(15),
                                                                          fontWeight: "600"
                                                                      }}>Foto</Text>
                                                                      <Button icon="add-a-photo" dark={true}
                                                                              mode="contained"
                                                                              onPress={() =>this.ImagePicker(item.name)}>Foto</Button>
                                                                  </View>
                                                              </View>
                                                          </View>
                                                          <View style={{
                                                              flexDirection: "row",
                                                              justifyContent: "space-between"
                                                          }}>
                                                              <View style={{flex: 1}}>
                                                                  <Text style={{
                                                                      fontSize: normalize(15),
                                                                      fontWeight: "600"
                                                                  }}>Note</Text>
                                                                  <Picker

                                                                      selectedValue={item.note}
                                                                      onValueChange={note => {
                                                                          const inputItems = [...this.state.inputItems];
                                                                          inputItems[index] = {
                                                                              ...inputItems[index],
                                                                              note: note
                                                                          };
                                                                          this.setState({inputItems})
                                                                      }
                                                                      }>
                                                                      {
                                                                          this.groupProps.note.map((note, key) => (
                                                                              <Picker.Item key={key} label={note}
                                                                                           value={note}/>
                                                                          ))
                                                                      }
                                                                  </Picker>
                                                              </View>
                                                              <View style={{flex: 1}}>
                                                                  <Text style={{
                                                                      fontSize: normalize(15),
                                                                      fontWeight: "600"
                                                                  }}>Priority</Text>
                                                                  <Picker
                                                                      selectedValue={item.priority}
                                                                      onValueChange={priority => {
                                                                          const inputItems = [...this.state.inputItems];
                                                                          inputItems[index] = {
                                                                              ...inputItems[index],
                                                                              priority: priority
                                                                          };
                                                                          this.setState({inputItems})
                                                                      }
                                                                      }>
                                                                      {
                                                                          this.groupProps.priority.map((priority, key) => (
                                                                              <Picker.Item key={key} label={priority}
                                                                                           value={priority}/>
                                                                          ))
                                                                      }
                                                                  </Picker>
                                                              </View>
                                                          </View>

                                                          <View style={{flexDirection: "column"}}>
                                                              <TextInput mode="flat" label="Remark (Detail Temuan)"
                                                                         value={item.remark} onChangeText={(remark) => {
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
                            </FlatList>
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
                                        onPress={() => console.log(this.state)}>Simpan</Button>
                            </View>


                        </ScrollView>
                        }
                    </View>
                )}
            </KeyboardShift>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center"
    },
    inputField: {
        flexDirection: 'column',
        padding: 10,
        paddingBottom: 20
    },
    subContainer: {
        flexDirection: 'row'
    }
});