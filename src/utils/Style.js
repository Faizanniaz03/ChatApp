import {StyleSheet} from 'react-native';
const primaryColor = 'orange';
const secondaryColor = '#BDF6FF';
const RegularFont = 'Outfit-Medium';
const black = 'black';
const white = 'white';
const Bold = 'Outfit-Bold';
const ThemeColor='white'

const Styles = StyleSheet.create({
  FlatlistTO: {
    borderWidth: 2,
    borderColor: primaryColor,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  FlatlistMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ImageView: {
    paddingVertical: 15,
  },
  TextView: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 300,
    padding: 15,
  },
  FlatlistText: {
    color: primaryColor,
    fontFamily: RegularFont,
    fontSize: 18,
  },
  HeaderTitle: {
    color: primaryColor,
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    fontFamily: Bold,
  },
});

export {primaryColor, secondaryColor, RegularFont, black,ThemeColor, white, Bold, Styles};
