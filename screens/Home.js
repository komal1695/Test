import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { StyleSheet, ScrollView, View, Text, FlatList } from 'react-native';
import { Item, Input, Label, Button, Container, Form } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class Home extends React.Component {
    state = {
        asteroidId: '',
        isShowList: false,
        errMsg: '',
        doesIdExits: false,
        randomAsteroidArr: [],
        data: [],

    };
    componentDidMount() {
        console.log("componentDidMount");
        setTimeout(() => {
            this.apiCall();
        }, 50);
    }

    apiCall() {
        console.log("apiCall");
        const url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY";

        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log("res", res);
                this.setState({
                    data: res.near_earth_objects,
                    randomAsteroidArr: res.near_earth_objects.map(x => x.id)
                })
                console.log("randomAsteroidArr", this.state.randomAsteroidArr);

                console.log("data", this.state.data)
            })
            .catch(error => {
                console.log("error")
            });
    }
    randomAsteroidClicked() {
        if (this.state.isShowList) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList nestedScrollEnabled={true}
                        contentContainerStyle={{ paddingBottom: moderateScale(20) }}
                        style={{ marginTop: moderateScale(40), padding: moderateScale(40) }}
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ justifyContent: 'center', marginBottom: moderateScale(10) }}
                                onPress={() => this.randomAsteroidSelected(item.id)} >
                                <Text style={{ backgroundColor: '#A9A9A9', color: '#000000', padding: moderateScale(10) }}>
                                    {item.id}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )
        } else {
            return null
        }


    }
    randomAsteroidSelected(ID) {
        console.log("ID", ID);
        this.props.navigation.navigate('RandomId', { ID: ID })
    }

    navigateTo(ID) {

        let doesIdExits = this.state.randomAsteroidArr.includes(ID)
        console.log("ff", doesIdExits);

        if (doesIdExits) {
            console.log("ID", ID);
            this.props.navigation.navigate('EnteredId', { ID: ID })
            this.setState({
                doesIdExits: true
            })
        }
        else {
            this.setState({
                errMsg: "No Match Found"
            })
        }
    }

    render() {
        return (
            <>
                <SafeAreaView >
                    <ScrollView>
                        <Container >
                            <View style={styles.commonView}>

                                <View style={{ marginBottom: moderateScale(30) }}>
                                    <Item floatingLabel>
                                        <Label>Enter Asteroid ID</Label>
                                        <Input value={this.state.asteroidId}
                                            onChangeText={asteroidId => this.setState({ asteroidId, errMsg: '' })}
                                        />
                                    </Item>
                                </View>

                                <View style={styles.commonBtnStyle}>
                                    <View style={{ flex: 0.4 }}>
                                        <Button rounded
                                            disabled={(this.state.asteroidId == '') ? true : false}
                                            onPress={() => this.navigateTo(this.state.asteroidId)} >
                                            <Text style={{ marginLeft: moderateScale(50) }} >Submit</Text>
                                        </Button>
                                    </View>
                                    <View style={{ flex: 0.4 }}>
                                        <Button rounded style={{ backgroundColor: "white" }}
                                            onPress={() => this.setState({ isShowList: true })}
                                        >
                                            <Text style={{ marginLeft: moderateScale(30) }}>Random Asteroid</Text>
                                        </Button>
                                    </View>
                                </View>

                            </View>
                            <View><Text style={{ textAlign: "center" }}>{this.state.errMsg}</Text></View>
                            {this.randomAsteroidClicked()}
                        </Container>

                    </ScrollView>

                </SafeAreaView>
            </>
        );
    };
}
const styles = StyleSheet.create({
    commonView: {
        padding: moderateScale(20),
        justifyContent: "center"
    },
    commonBtnStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    }

})

