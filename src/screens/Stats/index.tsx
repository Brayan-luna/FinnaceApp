import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WeeklyBarChart } from '../../components/WeeklyBarChart';
import { getStyles } from './styles';
import { BottonSheet } from '../../components/BottonSheet';
import { useScreenLoading } from '../../hooks/useScreenLoading';
import { AppSkeleton, layouts } from '../../components/AppSkeleton';
import { useApp } from '../../context/AppContext';

interface CategoryItem {
  id: string;
  name: string;
  amount: string;
  percentage: number;
  icon: keyof typeof Ionicons.glyphMap | string;
  iconColor: string;
  barColor: string;
}

export const StatsScreen = () => {
  const isLoading = useScreenLoading();
  const { themeColors, isDarkMode } = useApp();
  const styles = getStyles(themeColors);
  // Datos mock de categorías para la sección inferior
  const categories: CategoryItem[] = [
    {
      id: '1',
      name: 'Shopping',
      amount: '$950.00',
      percentage: 42,
      icon: 'cart',
      iconColor: 'rgba(98, 0, 238, 0.15)',
      barColor: '#6200EE',
    },
    {
      id: '2',
      name: 'Food & Drinks',
      amount: '$680.50',
      percentage: 30,
      icon: 'fast-food',
      iconColor: 'rgba(255, 204, 0, 0.15)',
      barColor: '#FFCC00',
    },
    {
      id: '3',
      name: 'Entertainment',
      amount: '$350.00',
      percentage: 16,
      icon: 'game-controller',
      iconColor: 'rgba(0, 122, 255, 0.15)',
      barColor: '#007AFF',
    },
    {
      id: '4',
      name: 'Transport',
      amount: '$259.50',
      percentage: 12,
      icon: 'car',
      iconColor: 'rgba(52, 199, 89, 0.15)',
      barColor: '#34C759',
    },
    {
      id: '1',
      name: 'Shopping',
      amount: '$950.00',
      percentage: 42,
      icon: 'cart',
      iconColor: 'rgba(98, 0, 238, 0.15)',
      barColor: '#6200EE',
    },
    {
      id: '2',
      name: 'Food & Drinks',
      amount: '$680.50',
      percentage: 30,
      icon: 'fast-food',
      iconColor: 'rgba(255, 204, 0, 0.15)',
      barColor: '#FFCC00',
    },
    {
      id: '3',
      name: 'Entertainment',
      amount: '$350.00',
      percentage: 16,
      icon: 'game-controller',
      iconColor: 'rgba(0, 122, 255, 0.15)',
      barColor: '#007AFF',
    },
    {
      id: '4',
      name: 'Transport',
      amount: '$259.50',
      percentage: 12,
      icon: 'car',
      iconColor: 'rgba(52, 199, 89, 0.15)',
      barColor: '#34C759',
    },
    {
      id: '1',
      name: 'Shopping',
      amount: '$950.00',
      percentage: 42,
      icon: 'cart',
      iconColor: 'rgba(98, 0, 238, 0.15)',
      barColor: '#6200EE',
    },
    {
      id: '2',
      name: 'Food & Drinks',
      amount: '$680.50',
      percentage: 30,
      icon: 'fast-food',
      iconColor: 'rgba(255, 204, 0, 0.15)',
      barColor: '#FFCC00',
    },
    {
      id: '3',
      name: 'Entertainment',
      amount: '$350.00',
      percentage: 16,
      icon: 'game-controller',
      iconColor: 'rgba(0, 122, 255, 0.15)',
      barColor: '#007AFF',
    },
    {
      id: '4',
      name: 'Transport',
      amount: '$259.50',
      percentage: 12,
      icon: 'car',
      iconColor: 'rgba(52, 199, 89, 0.15)',
      barColor: '#34C759',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppSkeleton 
        isLoading={isLoading} 
        layout={layouts.statsSkeletonLayout}
        boneColor={isDarkMode ? '#1E1F25' : '#E5E7EB'}
        highlightColor={isDarkMode ? '#2E3039' : '#F3F4F6'}
      >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>
      {/* Gráfico de Barras Semanal */}
      <WeeklyBarChart />
      <FlatList
        data={categories}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item: category }) => (
          <View style={styles.categoryItem}>
            <View style={styles.categoryLeft}>
              {/* Ícono de categoría */}
              <View style={[styles.iconWrapper, { backgroundColor: category.iconColor }]}>
                <Ionicons name={category.icon as any} size={20} color={category.barColor} />
              </View>

              {/* Info y barra de progreso */}
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${category.percentage}%`, backgroundColor: category.barColor }
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Monto y Porcentaje */}
            <View style={styles.categoryRight}>
              <Text style={styles.categoryAmount}>{category.amount}</Text>
              <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
            </View>
          </View>
        )}
        contentContainerStyle={[styles.categoryList, styles.scrollContent]}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 16 }}
      />
      </AppSkeleton>
    </SafeAreaView>
  );
};
