import React from 'react';
import { View, Text } from 'react-native';
import { getStyles } from './styles';
import { useScreenLoading } from '../../hooks/useScreenLoading';
import { AppSkeleton, layouts } from '../../components/AppSkeleton';
import { useApp } from '../../context/AppContext';

export const ChatScreen = () => {
  const isLoading = useScreenLoading();
  const { themeColors, isDarkMode } = useApp();
  const styles = getStyles(themeColors);

  return (
    <View style={styles.container}>
      <AppSkeleton 
        isLoading={isLoading} 
        layout={layouts.chatSkeletonLayout}
        boneColor={isDarkMode ? '#1E1F25' : '#E5E7EB'}
        highlightColor={isDarkMode ? '#2E3039' : '#F3F4F6'}
      >
        <Text style={styles.text}>Chat Screen</Text>
      </AppSkeleton>
    </View>
  );
};
