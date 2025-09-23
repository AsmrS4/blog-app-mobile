import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native'; // Исправляем импорт
import { fetchPosts } from './api';
import PostCard from './components/PostCard';
import { PostProps } from './types/Post';

const Home = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const handleFetchPosts = async () => {
    const fetchedPosts = await fetchPosts();
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    handleFetchPosts();
  }, []);

  return (
    <View style={{flex:1, alignItems:'center'}}>
      <FlatList
	  	keyExtractor={(item) => item.id.toString()}
        data={posts}
        renderItem={({ item }) => <PostCard key={item.id} {...item} />}
        contentContainerStyle={{
          padding: 16,
        }}
      />
    </View>
  );
};

export default Home;