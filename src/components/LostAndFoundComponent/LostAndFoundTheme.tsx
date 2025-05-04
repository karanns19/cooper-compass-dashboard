import { createTheme } from "react-data-table-component";

// Custom theme for Lost and Found Table
export const lostAndFoundTheme = () =>
  createTheme('custom', {
    text: {
      primary: '#432143',
      secondary: '#432143',
    },
    background: {
      default: '#f5f6f7',
    },
    context: {
      background: '#432143',
      text: '#ffffff',
    },
    divider: {
      default: '#e0e0e0',
    },
    button: {
      default: '#432143',
      hover: 'rgba(67, 33, 67, 0.7)',
      focus: 'rgba(67, 33, 67, 0.7)',
      disabled: 'rgba(67, 33, 67, 0.5)',
    },
  }, 'light');
