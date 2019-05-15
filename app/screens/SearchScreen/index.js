import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Search from '../../components/common/Search';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import genre from '../../assets/genre/ids.json';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { theme } from '../../utils/constants';

export default class SearchScreen extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Search typeRequest="search" navigate={navigate} />
        <ScrollView>
          <View style={styles.containerList}>
            {Object.keys(genre).map(id => (
              <TouchableOpacity
                style={styles.item}
                key={id}
                onPress={() =>
                  navigate('SearchResults', {
                    typeRequest: 'discover',
                    name: genre[id].name,
                    id
                  })
                }
              >
                  <Feather name={genre[id].icon} size={23} color='white' />
                  <Text style={styles.itemText}>{genre[id].name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
