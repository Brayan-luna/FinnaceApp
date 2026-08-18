import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useScreenLoading } from '../../hooks/useScreenLoading';
import { AppSkeleton, layouts } from '../../components/AppSkeleton';

export const SettingsScreen = () => {
  const isLoading = useScreenLoading();

  return (
    <View style={styles.container}>
      <AppSkeleton isLoading={isLoading} layout={layouts.settingsSkeletonLayout}>
        <Text style={styles.text}>Settings Screen</Text>
      </AppSkeleton>
    </View>
  );
};
