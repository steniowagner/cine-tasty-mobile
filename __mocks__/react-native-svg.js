jest.mock('react-native-svg', () => {
    const SvgXml = require('react-native/Libraries/Components/View/View');
    return {
      SvgXml,
    };
  });
  