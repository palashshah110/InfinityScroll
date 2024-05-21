import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Linking, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';

interface PropsType {
  navigation:{navigate: (data: string, state: any) => void;}
}

interface StateTypes {
  postsData: any;
  page: number;
  search: string;
  loading: boolean;
}

export default class HomeClass extends Component<PropsType, StateTypes>  {
  intervalId:NodeJS.Timeout | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      postsData: [],
      page: 0,
      search: "",
      loading: false,
    };
  }
  componentDidMount(): void {
    this.getApiData(this.state.page);
  }

  getApiData = async (PN: number) => {
    if(this.state.loading){
      return;
    }
    try {
      console.log("called: ",this.state.page)
      this.setState({ loading: true });
      clearInterval(this.intervalId);
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${PN}`
      );
      const data = await response.json();
      const newPosts = data.hits;
      this.setState({
        postsData: [...this.state.postsData, ...newPosts],
        page: this.state.page + 1,
      });
      this.setIntervalForGetApiData();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  setIntervalForGetApiData = () => {
    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.getApiData(this.state.page);
    }, 10000);
  };

  handleChange = (text:string) => {
    this.setState({ search: text });
  };

render(){
  const myapiData = this.state?.postsData.filter(
    (item:any) =>
      item.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
      item.author.toLowerCase().includes(this.state.search.toLowerCase())
  );

  const renderItem = ({ item }:any) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('PostDetails', { post: item })} style={styles.itemContainer}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>Author: {item.author}</Text>
        <Text style={styles.date}>Created at: {new Date(item.created_at).toLocaleString()}</Text>
        <Text style={styles.tags}>Tags: {item._tags.join(', ')}</Text>
        <Text style={styles.link} onPress={() => Linking.openURL(item.url)}>Read more</Text>
      </View>
    </TouchableOpacity>
);
return (
    <ImageBackground
    source={{
      uri: 'https://st.depositphotos.com/10325396/57836/i/950/depositphotos_578365998-stock-photo-abstract-gradient-fluid-shape-background.jpg',
    }}
    resizeMode="cover"
    style={styles.backgroundImg}>
    <View style={styles.container}>
    <TextInput
        placeholder="Search by title or author"
        value={this.state.search}
        onChangeText={this.handleChange}
        style={styles.searchBar}
      />
      {myapiData.length > 0 ?
      <FlatList
        data={myapiData}
        renderItem={renderItem}
        keyExtractor={(_,index:any) => index}
        onEndReached={()=>this.getApiData(this.state.page)}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          <ActivityIndicator size="small"/>
        }
        testID='checkend'
      /> : <ActivityIndicator size="small"/>}
    </View>
    </ImageBackground>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImg: {flex: 1, width: '100%', display: 'flex'},
  searchBar: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    marginBottom: 5,
    color: 'gray',
  },
  tags: {
    fontSize: 12,
    marginBottom: 5,
    color: 'gray',
  },
  link: {
    color: 'blue',
  },
});