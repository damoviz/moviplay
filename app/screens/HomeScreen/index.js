import React, { Component } from 'react';
import { Asset } from 'expo';
import { View, Text,ScrollView } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Assets as StackAssets } from 'react-navigation-stack';

import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import FilterModal from '../../components/modals/FilterModal';
import MovieListRow from '../../components/cards/rows/MovieListRow';
import MovieHomeRow from '../../components/cards/rows/MovieHomeRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import request from '../../services/Api';

import { getItem } from '../../utils/AsyncStorage';
import { darkBlue,white } from '../../styles/Colors';
import styles from './styles';
import CardList from '../../components/CardList';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerRight: (
        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={null}
        >
          <Feather name="user" size={23} color={white} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    isVisible: false,
    isLoading: false,
    isRefresh: false,
    isLoadingMore: false,
    isError: false,
    hasAdultContent: false,
    filterType: 'popularity.desc',
    filterName: 'Most popular',
    resultsPopular: [],
    resultsTopRated: [],
    resultsUpcoming: [],
    page: 1,
    numColumns: 1,
    keyGrid: 1
  };

  async componentDidMount() {
    try {
      Asset.loadAsync(StackAssets);
      this.props.navigation.setParams({ actionFilter: this.actionFilter });

      const hasAdultContent = await getItem('@ConfigKey', 'hasAdultContent');

      this.setState({ hasAdultContent }, () => {
        this.requestMoviesList();
      });
    } catch (error) {
      this.requestMoviesList();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      resultsPopular,
      resultsTopRated,
      resultsUpcoming,
      isVisible,
      isLoading,
      isRefresh,
      isLoadingMore,
      isError,
      keyGrid
    } = this.state;

    if (
      resultsPopular !== nextState.resultsPopular ||
      resultsTopRated !== nextState.resultsTopRated ||
      resultsUpcoming !== nextState.resultsUpcoming ||
      isVisible !== nextState.isVisible ||
      isLoading !== nextState.isLoading ||
      isRefresh !== nextState.isRefresh ||
      isLoadingMore !== nextState.isLoadingMore ||
      isError !== nextState.isError ||
      keyGrid !== nextState.keyGrid
    ) {
      return true;
    }
    return false;
  }

  requestMoviesList = async () => {
    try {
      this.setState({ isLoading: true });

      const { page, filterType, hasAdultContent } = this.state;
      const dateRelease = new Date().toISOString().slice(0, 10);

      const dataPopular = await request('movie/popular', {
        page,
        'release_date.lte': dateRelease,
        sort_by: filterType,
        with_release_type: '1|2|3|4|5|6|7',
        include_adult: hasAdultContent
      });

      const dataTopRated = await request('movie/top_rated', {
        page,
        'release_date.lte': dateRelease,
        sort_by: filterType,
        with_release_type: '1|2|3|4|5|6|7',
        include_adult: hasAdultContent
      });

      const dataUpcoming = await request('movie/upcoming', {
        page,
        'release_date.lte': dateRelease,
        sort_by: filterType,
        with_release_type: '1|2|3|4|5|6|7',
        include_adult: hasAdultContent
      });

      this.setState(({ isRefresh, resultsPopular,resultsTopRated,resultsUpcoming }) => ({
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: false,
        totalPagesPopular: dataPopular.total_pages,
        resultsPopular: isRefresh ? dataPopular.results : [...resultsPopular, ...dataPopular.results],
        totalPagesTopRated: dataTopRated.total_pages,
        resultsTopRated: isRefresh ? dataTopRated.results : [...resultsTopRated, ...dataTopRated.results],
        totalPagesUpcoming: dataUpcoming.total_pages,
        resultsUpcoming: isRefresh ? dataUpcoming.results : [...resultsUpcoming, ...dataUpcoming.results]
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: true
      });
    }
  };

  renderItem = (item, type, isSearch, numColumns, navigate) => (
    <MovieHomeRow
      item={item}
      type={type}
      isSearch={isSearch}
      numColumns={numColumns}
      navigate={navigate}
    />
  );

  renderFooter = () => {
    const { isLoadingMore, totalPages, page, resultsPopular,resultsTopRated,resultsUpcoming } = this.state;

    if (isLoadingMore) return <Spinner size="small" />;

    if (totalPages !== page && resultsPopular.length > 0 && resultsTopRated.length > 0 && resultsUpcoming.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            onPress={this.actionLoadMore}
          >
            <Feather name="plus-circle" size={30} color={white} />
          </TouchableOpacity>
        </View>
      );
    }

    if (resultsPopular.length > 0 && resultsTopRated.length > 0 && resultsUpcoming.length > 0) return <View style={styles.loadingMore} />;

    return null;
  };

  actionRefresh = () => {
    this.setState(
      {
        isRefresh: true,
        page: 1
      },
      () => {
        this.requestMoviesList();
      }
    );
  };

  actionLoadMore = () => {
    this.setState(
      ({ page }) => ({
        isLoadingMore: true,
        page: page + 1
      }),
      () => {
        this.requestMoviesList();
      }
    );
  };

  actionGrid = () => {
    this.setState(({ numColumns, keyGrid }) => {
      return { numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1 };
    });
  };

  actionFilter = () => {
    this.setState(({ isVisible }) => {
      return { isVisible: !isVisible };
    });
  };

  actionSwitchMovie = (filterType, filterName, isVisible) => {
    if (this.state.filterType !== filterType) {
      this.setState(
        { filterType, filterName, isVisible, page: 1, results: [] },
        () => {
          this.requestMoviesList();
        }
      );
    } else {
      this.setState({ isVisible });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      isLoading,
      isRefresh,
      isLoadingMore,
      isError,
      resultsPopular,
      resultsTopRated,
      resultsUpcoming,
      filterName,
      isVisible,
      filterType,
      numColumns,
      keyGrid
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && !isRefresh && !isLoadingMore ? (
          <Spinner />
        ) : isError ? (
          <NotificationCard
            icon="alert-octagon"
            action={this.requestMoviesList}
          />
        ) : resultsPopular.length === 0 && resultsTopRated.length === 0 && resultsUpcoming.length === 0 ? (
          <NotificationCard
            icon="thumbs-down"
            textError="No hay resultados disponibles."
          />
        ) : (
          <View style={styles.containerList}>
          <ScrollView style={styles.scrollViewContainer}>
            <CardList title="Popular" navigate={navigate}>
                <MovieListRow
                    data={resultsPopular}
                    orientation={true}
                    type="normal"
                    isSearch={false}
                    keyGrid={keyGrid}
                    numColumns={numColumns}
                    refreshing={isRefresh}
                    onRefresh={this.actionRefresh}
                    ListFooterComponent={this.renderFooter}
                    navigate={navigate}
                    renderItem={this.renderItem}
                />
            </CardList>
            <CardList title="Upcoming" navigate={navigate}>
                <MovieListRow
                    data={resultsUpcoming}
                    orientation={true}
                    type="normal"
                    isSearch={false}
                    keyGrid={keyGrid}
                    numColumns={numColumns}
                    refreshing={isRefresh}
                    onRefresh={this.actionRefresh}
                    ListFooterComponent={this.renderFooter}
                    navigate={navigate}
                    renderItem={this.renderItem}
                />
            </CardList>
            <CardList title="Top_rated" navigate={navigate}>
                <MovieListRow
                    data={resultsTopRated}
                    orientation={true}
                    type="normal"
                    isSearch={false}
                    keyGrid={keyGrid}
                    numColumns={numColumns}
                    refreshing={isRefresh}
                    onRefresh={this.actionRefresh}
                    ListFooterComponent={this.renderFooter}
                    navigate={navigate}
                    renderItem={this.renderItem}
                />
            </CardList>
            </ScrollView>
          </View>
        )}
        <FilterModal
          isVisible={isVisible}
          filterType={filterType}
          filterName={filterName}
          actionFilter={this.actionFilter}
          actionSwitchMovie={this.actionSwitchMovie}
          style={styles.bottomModal}
        />
      </View>
    );
  }
}