import React, { useRef } from 'react';
import { Animated, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BalanceCard } from '../BalanceCard';
import { getStyles } from './styles';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

export const CardsCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();
  const { cardAccounts, themeColors } = useApp();
  const styles = getStyles(themeColors);

  if (cardAccounts.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.emptyCard} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddAccount')}
        >
          <Ionicons name="card-outline" size={42} color={themeColors.accent} style={{ marginBottom: 12 }} />
          <Text style={styles.emptyCardTitle}>Add your first card or cash</Text>
          <Text style={styles.emptyCardSubtitle}>Keep track of your money{"\n"}in one place</Text>
        </TouchableOpacity>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { opacity: 1, backgroundColor: themeColors.accent, transform: [{ scaleX: 2.5 }] }]} />
          <View style={[styles.dot, { opacity: 0.3, backgroundColor: themeColors.accent, transform: [{ scaleX: 1 }] }]} />
          <View style={[styles.dot, { opacity: 0.3, backgroundColor: themeColors.accent, transform: [{ scaleX: 1 }] }]} />
          <View style={[styles.dot, { opacity: 0.3, backgroundColor: themeColors.accent, transform: [{ scaleX: 1 }] }]} />
          <View style={[styles.dot, { opacity: 0.3, backgroundColor: themeColors.accent, transform: [{ scaleX: 1 }] }]} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={cardAccounts}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 16}
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
            outputRange: [0.92, 1, 0.92],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                width: CARD_WIDTH,
                marginRight: 16,
                transform: [{ scale }],
                opacity,
              }}
            >
              <BalanceCard account={item} />
            </Animated.View>
          );
        }}
      />

      {/* Indicador de Puntos (Dots) */}
      <View style={styles.dotsContainer}>
        {cardAccounts.map((_: any, index: number) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + 16),
            index * (CARD_WIDTH + 16),
            (index + 1) * (CARD_WIDTH + 16),
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 16, 6],
            extrapolate: 'clamp',
          });

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity: dotOpacity,
                  backgroundColor: themeColors.accent,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};
