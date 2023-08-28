import HelpScout from '@helpscout/javascript-sdk';
import { useEffect } from 'react';

export const useHelpScoutStyles = async () => {
  useEffect(() => {
    // Get the styles from Help Scout
    HelpScout.getAppStyles().then((styles) => {
      // Create a style element
      const styleElement = document.createElement('style');

      // Set the innerHTML of the style element to the styles
      styleElement.innerHTML = styles;

      // Append the style element to the head of the document
      document.head.appendChild(styleElement);
    });
  }, []);
};
