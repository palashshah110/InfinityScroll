import { StackScreenProps } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Button, Linking } from 'react-native';

interface propsTypes {
  navigation: {
    goBack: () => void;
  };
  route: {
    params: {
      post: {  
        title: string;
        author: string;
        created_at: string;
        _tags: string[];
        url: string;
      };
    };
  };
};

export default class PostDetailsClass extends Component<propsTypes> {
  render() {
    console.log("I am here")
    const { navigation, route } = this.props;
    const { post } = route.params;
    const {title,author,created_at,_tags,url} = post;
    return (
    <ImageBackground
    source={{
      uri: 'https://st.depositphotos.com/10325396/57836/i/950/depositphotos_578365998-stock-photo-abstract-gradient-fluid-shape-background.jpg',
    }}
    resizeMode="cover"
    style={styles.backgroundImg}>
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
          <Text style={styles.text}>
        Title: {title}
      </Text>
      <Text style={styles.text}>
      Author: {author}
      </Text>
      <Text style={styles.text}>
      Created At: {new Date(created_at).toLocaleString()}
      </Text>
      <Text style={styles.text}>
        Tags: {_tags?.join(', ')}
      </Text>
      <Text style={styles.text} onPress={() => Linking.openURL(url)}>
        Link: {url}
      </Text>
        <Button title='Go Back' onPress={()=>navigation.goBack()}></Button>
          </View>
        </View>
      </View>
    </View>
  </ImageBackground>  
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {flex: 1, width: '100%', display: 'flex'},
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    marginVertical: 10,
  },
  text: {
    marginBottom: 10,
    color: '#000',
  },
  Goback: {
    color: '#000',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});