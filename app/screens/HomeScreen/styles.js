import { StyleSheet } from 'react-native';

import { white, lightGray, darkBlue,black } from '../../styles/Colors';
import { fontSizeResponsive } from '../../utils/Metrics';
import { theme } from '../../utils/constants';

const styles = StyleSheet.create({
  buttonFilter: {
    paddingRight: 15,
    paddingLeft: 20
  },
  container: {
    flex: 1,
    backgroundColor: black,
    justifyContent: 'center'
  },
  containerList: {
    justifyContent: 'center',
    flex: 1
  },
  containerMainText: {
    paddingVertical: 25,
    paddingHorizontal: 20
  },
  textMain: {
    fontSize: fontSizeResponsive(3),
    fontWeight: 'bold',
    color: darkBlue,
    width: '80%'
  },
  buttonGrid: {
    position: 'absolute',
    right: 12,
    top: 18,
    padding: 8,
    borderRadius: 100
  },
  buttonGridActive: {
    backgroundColor: lightGray
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingButton: {
    padding: 10,
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary
  },
  loadingText: {
    fontSize: fontSizeResponsive(2.1),
    color: darkBlue,
    textAlign: 'center'
  },
  scrollViewContainer: {
    flex: 1,
  },
});

export default styles;
