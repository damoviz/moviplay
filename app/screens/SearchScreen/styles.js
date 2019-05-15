import { StyleSheet } from 'react-native';

import { white } from '../../styles/Colors';
import { fontSizeResponsive } from '../../utils/Metrics';
import { theme } from '../../utils/constants';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: theme.colors.black
  },
  containerList: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  item: {
    width: 150,
    height: 100,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 25,
    borderRadius: 20,
    backgroundColor:theme.colors.primary,
  },
  itemText: {
    fontSize: fontSizeResponsive(2.5),
    color: 'white',
    textAlign: 'center'
  }
});

export default styles;
