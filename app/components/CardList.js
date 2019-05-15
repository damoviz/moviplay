import React from 'react';
import { StyleSheet, ScrollView, View, Text,TouchableOpacity } from 'react-native';
import { theme } from '../utils/constants';

const CardList = ({
  title = '',
  navigate,
  children = null
}) => (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {navigate &&
          <TouchableOpacity
            onPress={() => navigate('MovieList',{genero: title })}
          >
            <Text style={styles.titleAll}>Ver todos</Text>
          </TouchableOpacity>}
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {children}
          </View>
        </ScrollView>
      </View>
    </View>
  );

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    marginTop: 5,
    marginBottom: 5,
  },
  titleContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.white
  },
  titleAll: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.primary
  },
  scrollViewContainer: {
    marginBottom: 15
  },
  listContainer: {
    flexDirection: 'row',
    marginHorizontal: 20
  }
})

export default CardList;
