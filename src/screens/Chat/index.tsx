import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useScreenLoading } from '../../hooks/useScreenLoading';
import { AppSkeleton, layouts } from '../../components/AppSkeleton';

export const ChatScreen = () => {
  const isLoading = useScreenLoading();

  return (
    <View style={styles.container}>
      <AppSkeleton isLoading={isLoading} layout={layouts.chatSkeletonLayout}>
        <Text style={styles.text}>Chat Screen</Text>
      </AppSkeleton>
    </View>
  );
};
