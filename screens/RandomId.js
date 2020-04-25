import React from 'react';
import { View, Text } from 'react-native';
import { Spinner } from 'native-base';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class RandomId extends React.Component {
    state = {
        Id: '',
        url: '',
        name: '',
        is_potentially_hazardous_asteroid: false,
        isloading: true
    };

    componentDidMount() {

        this.state.Id = this.props.navigation.getParam('ID')
        console.log(this.state.Id);
        const url = `https://api.nasa.gov/neo/rest/v1/neo/${this.state.Id}?api_key=q2jJacxcXHm0MG3iRtHeH37r0c7129GjE2Ipqf2f`;

        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);

                this.setState({
                    is_potentially_hazardous_asteroid: res.is_potentially_hazardous_asteroid,
                    url: res.nasa_jpl_url,
                    name: res.name,
                    isloading: false

                })
                console.log(this.state.is_potentially_hazardous_asteroid);


            })
            .catch(error => {
                this.setState({ error, loading: false });
            });

    }
    render() {
        let { isloading } = this.state;
        if (isloading) {
            return <Spinner />
        } else {
            return (<View style={{ padding: moderateScale(20) }}>
                <Text>Name : {this.state.name}</Text>
                <Text>Nasa jpl url : {this.state.url}</Text>
                <Text>Is potentially hazardous asteroid : {this.state.is_potentially_hazardous_asteroid + ''}</Text>
            </View>)
        }

    }
}

