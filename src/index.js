import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  AsyncStorage
} from "react-native";

import api from "./services/api";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errorMessage: null,
      pessoas: []
    };
  }

  getPessoas = () => {
    try {
      this.setState({ isLoading: true });

      api.get("/pessoas").then(response => {
        const { pessoas } = response.data;
        this.setState({ pessoas: pessoas, isLoading: false });
      });
    } catch (error) {
      this.setState({
        errorMessage: "Não foi possível conectar a api.",
        isLoading: false
      });
    }
  };

  removerLista = () => {
    this.setState({ pessoas: [] });
  };

  renderPessoas = pessoas => (
    <View>
      {pessoas.map((pessoa, index) => (
        <View key={index}>
          <Text>{pessoa.nome}</Text>
          <Text>{pessoa.idade}</Text>
        </View>
      ))}
      <Text />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.state.isLoading && <Text>Carregando...</Text>}
          {!!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        </View>
        <View style={styles.top}>
          <Button onPress={() => this.getPessoas()} title="Obter Pessoas" />
        </View>
        <View style={styles.top}>
          <Button onPress={() => this.removerLista()} title="Remover Lista" />
        </View>
        <View style={styles.top}>{this.renderPessoas(this.state.pessoas)}</View>
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
  },
  top: {
    marginTop: 20
  }
});
