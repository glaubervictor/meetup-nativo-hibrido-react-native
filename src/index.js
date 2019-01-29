import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Alert } from "react-native";

import api from "./services/api";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      values: []
    };
  }

  getValues = () => {
    try {
      api.get("/values").then(response => {
        debugger;
        const { values } = response.data;
        this.setState({ values: values });
      });
    } catch (error) {
      this.setState({ errorMessage: "Não foi possível conectar a api." });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {!!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        <Button onPress={() => this.getValues()} title="Get Values" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
