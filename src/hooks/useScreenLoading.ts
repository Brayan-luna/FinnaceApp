import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * Custom hook to handle smooth screen loading states without flickering.
 * Ensures the screen is ALREADY in loading mode (true) before and during navigation,
 * resetting state on blur so content never flashes before the skeleton displays.
 * @param durationMs Duration of loading state in milliseconds (default: 600ms)
 */
export const useScreenLoading = (durationMs: number = 600) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Trigger loading timer
    const startTimer = () => {
      setIsLoading(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsLoading(false);
      }, durationMs);
    };

    // Initial load
    startTimer();

    // Reset loading state on focus
    const unsubscribeFocus = navigation.addListener('focus', () => {
      startTimer();
    });

    // IMMEDIATELY set to true on blur so next time it receives focus, it's ALREADY loading!
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsLoading(true);
      clearTimeout(timer);
    });

    return () => {
      clearTimeout(timer);
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation, durationMs]);

  return isLoading;
};
