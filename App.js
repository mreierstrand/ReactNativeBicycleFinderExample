import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      frameNumber: '',
      kindOfBicycle: '',
      brand: '',
      colors: ''
    }
  }

  
  componentDidMount() {
    return fetch('https://anbo-bicyclefinder.azurewebsites.net/api/bicycles')
      .then ((response) => response.json())
      .then ((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          frameNumber: responseJson.frameNumber,
          kindOfBicycle: responseJson.kindOfBicycle,
          brand: responseJson.brand,
          colors: responseJson.colors
        })
    })
      .catch((error) => {
      console.log(error)
    });
  }

  render() {

     if(this.state.isLoading) {

       return (
         <View style={styles.container}>
          <StatusBar style="dark" />
          <ActivityIndicator />
         </View>
       )
     } else {

    let bicycles = this.state.dataSource.map((val, key) => {
      return <View key={key} style={styles.item}>
              <Text style={{fontSize: 20}}>{val.frameNumber}, {val.kindOfBicycle}, {val.brand}, {val.colors}</Text>
             </View>
      });

    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Bicycle Finder</Text>
        </View>
          {bicycles}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  viewStyle: {
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: width,
    paddingTop: 20,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative',
    
  },
  textStyle: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#eee'
    
  }
})