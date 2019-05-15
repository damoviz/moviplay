import React from 'react';
import { View, Text } from 'react-native';
import Image from 'react-native-scalable-image';
import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { width } from '../../../../utils/Metrics';
import { notFound } from '../../../../utils/StaticImages';
import { Icon } from 'expo';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../../utils/constants';

const getImageApi = image =>
    image ? { uri: `https://image.tmdb.org/t/p/w500/${image}` } : notFound;

const convertToDate = date => {
    return(
        <View style={{ flexDirection: 'row' }}>
            <Feather name="calendar" size={width * 0.05} color={theme.colors.primary} />
            <Text style={styles.textSmall}>
                {new Date(date).getFullYear() || ''}
            </Text>
        </View>
    )
};

const renderScore = voteAverage => {
    const color =
        voteAverage < 5
        ? '#e74c3c'
        : voteAverage >= 5 && voteAverage < 7
        ? '#dc7633'
        : '#52be80';

    return (
        <View style={{ flexDirection: 'row' }}>
            <Icon.Ionicons
                name="md-star"
                size={width * 0.06}
                color={'#F5B642'}
                style={styles.star}
            />
            <Text style={[styles.textPercent, {color:color}]}>{voteAverage}</Text>
        </View>
    );
};

export default class MovieHomeRow extends React.PureComponent {
    render() {
        const { item, navigate } = this.props;
        return (
            <TouchableOpacity
                onPress={() => navigate('MovieDetails', { id: item.id })}
            >
                <View style={styles.containerItem}>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={getImageApi(item.poster_path)}
                            style={styles.photo}
                            width={width * 0.33}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text numberOfLines={2} style={styles.textTitle}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={styles.itemFooter}>
                        {convertToDate(item.release_date)}
                        {renderScore(item.vote_average)}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}