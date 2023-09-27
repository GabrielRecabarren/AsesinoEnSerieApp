import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../../components/LoginForm/LoginForm';

const HomeScreen = () => {
  
  return (
    <View style={styles.container}>
      <LoginForm  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
