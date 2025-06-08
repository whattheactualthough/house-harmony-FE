import { Platform } from 'react-native';
import colors from './colors';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
});

const typography = {
  heading: {
    fontSize: 22,
    fontWeight: '750',
    fontFamily,
    color: colors.textDark,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily,
    color: colors.textDark,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily,
    color: colors.textDark,
  },
  caption: {
    fontSize: 12,
    fontWeight: '300',
    fontFamily,
    color: colors.textDark,
  },
  inverse: {
    color: colors.textLight,
  }
};

export default typography;