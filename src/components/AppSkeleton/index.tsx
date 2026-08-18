import React from 'react';
import Skeleton from 'react-native-reanimated-skeleton';
import * as layouts from './layouts';

interface AppSkeletonProps {
  isLoading: boolean;
  layout?: any[];
  children: React.ReactNode;
  boneColor?: string;
  highlightColor?: string;
  containerStyle?: any;
}

export const AppSkeleton: React.FC<AppSkeletonProps> = ({
  isLoading,
  layout,
  children,
  boneColor = '#1E1F25',
  highlightColor = '#2E3039',
  containerStyle = { flex: 1 },
}) => {
  return (
    <Skeleton
      isLoading={isLoading}
      containerStyle={containerStyle}
      boneColor={boneColor}
      highlightColor={highlightColor}
      layout={layout}
    >
      {children}
    </Skeleton>
  );
};

export { layouts };
