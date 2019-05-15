import { StyleSheet } from 'react-native';

import {
  darkBlue,
  blue,
  white,
  lightRed,
  lightYellow,
  lightGreen,
  black
} from '../../../../styles/Colors';
import { fontSizeResponsive,width } from '../../../../utils/Metrics';

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    backgroundColor: black,
    flexDirection: 'column',
    marginRight: 5,
    borderRadius: 8,
    width: width * 0.33,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  containerTwoItem: {
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%'
  },
  photo: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8 
  },
  item: {
    flex: 2,
    flexDirection: 'column',
  },
  itemFooter: {
    flex:2,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 5,
  },
  textTitle: {
    fontSize: fontSizeResponsive(2),
    color: white,
    fontWeight: 'bold',
    paddingRight: 20,
    paddingLeft: 20,
  },
  textTwoTitle: {
    textAlign: 'center',
    fontSize: fontSizeResponsive(2),
    color: darkBlue,
    fontWeight: 'bold',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20
  },
  textRow: {
    flexDirection: 'row'
  },
  containerSubTitle: {
    marginTop: 3,
    marginBottom: 3
  },
  containerReview: {
    justifyContent: 'space-between',
    marginRight: 20
  },
  textSmall: {
    fontSize: fontSizeResponsive(2.1),
    color: white
  },
  trace: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: fontSizeResponsive(2.1),
    color: blue
  },
  score: {
    minWidth: '25%',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 100
  },
  low: {
    backgroundColor: lightRed
  },
  mid: {
    backgroundColor: lightYellow
  },
  high: {
    backgroundColor: lightGreen
  },
  textPercent: {
    fontSize: fontSizeResponsive(2.1),
    fontWeight: '500',
    color: white,
    textAlign: 'center'
  },
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  containerError: {
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingMore: {
    marginTop: 20,
    marginBottom: 30
  },
  star: {
    marginRight: 5
  }
});

export default styles;
