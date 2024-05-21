import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Linking, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';

const Home = ({ navigation }:any) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
    fetchPosts()
  },[]);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts();
    }, 10000);

    return () => clearInterval(interval);
  }, [page]);

  const fetchPosts = async () => {
    try {
      console.log("called: ",page)
      const responses = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
      const response = await responses.json();
      setPosts((prevPosts):any => [...prevPosts, ...response.hits]);
      setPage(page + 1);
    } catch (error) {
      Alert.alert("API Error");
    }
  };

const filteredPosts = posts.filter((post:any) => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
);
const renderItem = ({ item }:any) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetails', { post: item })} style={styles.itemContainer}>
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
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />
      {filteredPosts.length > 0 ?
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={(_,index:any) => index}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          <ActivityIndicator size="small"/>
        }
        testID='checkend'
      /> : <ActivityIndicator size="small"/>}
    </View>
    </ImageBackground>
  );
};

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

export default Home;