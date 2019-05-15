import React from 'react';
import { FlatList } from 'react-native';

const MovieListRow = ({
  data,
  orientation,
  type,
  isSearch,
  keyGrid,
  numColumns,
  refreshing,
  onRefresh,
  ListFooterComponent,
  ListEmptyComponent,
  navigate,
  renderItem
}) => (
  <FlatList
    horizontal={orientation}
    data={data}
    key={keyGrid}
    numColumns={numColumns}
    removeClippedSubviews
    keyExtractor={item => item.id.toString()}
    refreshing={refreshing}
    onRefresh={onRefresh}
    ListFooterComponent={ListFooterComponent}
    ListEmptyComponent={ListEmptyComponent}
    renderItem={({ item }) =>
      renderItem(item, type, isSearch, numColumns, navigate)
    }
  />
);

export default MovieListRow;
