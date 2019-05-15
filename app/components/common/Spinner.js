import React from 'react';
import { Platform, ActivityIndicator, View } from 'react-native';

import { theme } from '../../utils/constants';

const Spinner = ({ style = {}, size = 50, color = theme.colors.primary }) => (
  <View style={style}>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator size="small" color={color} />
    ) : (
      <ActivityIndicator size={size} color={color} />
    )}
  </View>
);

export default Spinner;
