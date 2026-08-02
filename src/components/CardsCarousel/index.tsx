import React, { useRef } from 'react';
import { Animated, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BalanceCard } from '../BalanceCard';
import { styles } from './styles';
import { useFinanceStore } from '../../store/useFinanceStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

export const CardsCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();
  const accounts = useFinanceStore((state) => state.accounts);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 16} // CARD_WIDTH + gap
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + 16),
            index * (CARD_WIDTH + 16),
            (index + 1) * (CARD_WIDTH + 16),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          // Parallax effect
          const parallaxTranslateX = scrollX.interpolate({
            inputRange,
            outputRange: [-CARD_WIDTH * 0.25, 0, CARD_WIDTH * 0.25],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={{ width: CARD_WIDTH, marginRight: 16, transform: [{ scale }] }}>
              <BalanceCard
                balance={item.balance}
                type={item.type}
                cardType={item.cardType}
                name={item.name}
                color={item.color}
                parallaxTranslateX={parallaxTranslateX}
                onPressAdd={() => navigation.navigate('AddAccount')}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
