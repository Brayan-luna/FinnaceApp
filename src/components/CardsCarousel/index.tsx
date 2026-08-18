import React, { useRef } from 'react';
import { Animated, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BalanceCard } from '../BalanceCard';
import { styles } from './styles';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

export const CardsCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();
  const { cardAccounts } = useApp();

  if (cardAccounts.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.emptyCard} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddAccount')}
        >
          <Ionicons name="card-outline" size={42} color="#7F56D9" style={{ marginBottom: 12 }} />
          <Text style={styles.emptyCardTitle}>Add your first card or cash</Text>
          <Text style={styles.emptyCardSubtitle}>Keep track of your money{"\n"}in one place</Text>
        </TouchableOpacity>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { opacity: 1, backgroundColor: '#7F56D9', transform: [{ scaleX: 2.5 }] }]} />
          <View style={[styles.dot, { opacity: 0.3, backgroundColor: '#7F56D9', transform: [{ scaleX: 1 }] }]} />
          <View style={[styles.dot, { opacity: 0.3, backgroundColor: '#7F56D9', transform: [{ scaleX: 1 }] }]} />
          <View style={[styles.dot, { opacity: 0.3, backgroundColor: '#7F56D9', transform: [{ scaleX: 1 }] }]} />
          <View style={[styles.dot, { opacity: 0.3, backgroundColor: '#7F56D9', transform: [{ scaleX: 1 }] }]} />
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
                onPressAdd={() => navigation.navigate('AddTransaction', { accountId: item.id, transactionType: 'income' })}
              />
            </Animated.View>
          );
        }}
      />
      <View style={styles.dotsContainer}>
        {cardAccounts.map((_, i) => {
          const inputRange = [
            (i - 1) * (CARD_WIDTH + 16),
            i * (CARD_WIDTH + 16),
            (i + 1) * (CARD_WIDTH + 16),
          ];

          const scaleX = scrollX.interpolate({
            inputRange,
            outputRange: [1, 2.5, 1],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  opacity,
                  backgroundColor: '#7F56D9',
                  transform: [{ scaleX }],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};
