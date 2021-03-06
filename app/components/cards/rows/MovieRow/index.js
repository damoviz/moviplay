import React from 'react';
import { View, Text } from 'react-native';
import Image from 'react-native-scalable-image';
import language from '../../../../assets/language/iso.json';
import genre from '../../../../assets/genre/ids.json';
import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { width } from '../../../../utils/Metrics';
import { notFound } from '../../../../utils/StaticImages';
import styles from './styles';
import ProgressCircle from 'react-native-progress-circle';
import { Feather } from '@expo/vector-icons';

const getImageApi = image =>
  image ? { uri: `https://image.tmdb.org/t/p/w500/${image}` } : notFound;

const convertToDate = date => new Date(date).getFullYear() || '';

const convertToUpperCaseFirstLetter = value => {
  const str = language[value] || '';
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

const convertGenre = (arr, type, isSearch) => {
  if (type === 'normal' || isSearch) {
    if (arr.length > 1) return `${genre[arr[0]].name}, ${genre[arr[1]].name}`;
    return arr.length !== 0 ? `${genre[arr[0]].name}` : '';
  }
  return arr.length !== 0 && type !== genre[arr[0]].name
    ? `${type}, ${genre[arr[0]].name}`
    : type;
};

const renderDivider = (releaseDate, originalLanguage) =>
  releaseDate && originalLanguage !== 'xx' ? (
    <Text style={styles.trace}>|</Text>
  ) : null;

const renderScore = voteAverage => {
  const color =
    voteAverage < 5
      ? '#e74c3c'
      : voteAverage >= 5 && voteAverage < 7
      ? '#dc7633'
      : '#52be80';

  return (
        <ProgressCircle
            percent={voteAverage*10}
            radius={25}
            borderWidth={8}
            color={color}
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18,color: color}}>{voteAverage}</Text>
        </ProgressCircle>
  );
};

const renderVoteCount = voteCount => {
  return (
        <View style={{flexDirection: 'row',margin:10,alignItems:'center'}}>
            <Text style={{ fontSize: 10,color: 'white'}}>{voteCount}</Text>
            <Feather name="users" size={10} color='white' />
        </View>
  );
};

export default class MovieRow extends React.PureComponent {
  render() {
    const { numColumns, item, type, isSearch, navigate } = this.props;

    if (numColumns === 1) {
      return (
        <TouchableOpacity
          onPress={() => navigate('MovieDetails', { id: item.id })}
        >
          <View style={styles.containerItem}>
            <Image
              source={getImageApi(item.poster_path)}
              style={styles.photo}
              width={width * 0.3}
            />
            <View style={styles.item}>
              <View>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {item.title}
                </Text>
                <View style={[styles.textRow, styles.containerSubTitle]}>
                  <Text style={styles.textSmall}>
                    {convertToDate(item.release_date)}
                  </Text>
                  {renderDivider(item.release_date, item.original_language)}
                  <Text numberOfLines={1} style={styles.textSmall}>
                    {convertToUpperCaseFirstLetter(item.original_language)}
                  </Text>
                </View>
                <Text numberOfLines={1} style={styles.textSmall}>
                  {convertGenre(item.genre_ids, type, isSearch)}
                </Text>
              </View>
              <View style={[styles.textRow, styles.containerReview]}>
                {renderScore(item.vote_average)}
                {renderVoteCount(item.vote_count)}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.containerTwoItem}
        onPress={() => navigate('MovieDetails', { id: item.id })}
      >
        <View>
          <Image
            source={getImageApi(item.poster_path)}
            style={styles.photo}
            width={width * 0.33}
          />
        </View>
        <Text numberOfLines={2} style={styles.textTwoTitle}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
