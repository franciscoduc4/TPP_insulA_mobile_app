import { create } from 'twrnc';

// Create the default instance of twrnc with colors matching react-native-paper theme
const tw = create({
  theme: {
    extend: {
      colors: {
        'apple-green': '#4CAF50',
        'apple-green-light': '#81C784',
        'apple-green-dark': '#388E3C',
        'background-light': '#F5F5F5',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'border': '#E5E5E5',
        'card': '#FFFFFF',
      },
    },
  },
});

export default tw;