import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WeeklyBarChart } from '../../components/WeeklyBarChart';
import { getStyles } from './styles';
import { BottonSheet } from '../../components/BottonSheet';
import { useScreenLoading } from '../../hooks/useScreenLoading';
import { AppSkeleton, layouts } from '../../components/AppSkeleton';
import { useApp } from '../../context/AppContext';
import { getCategoryMeta, formatCurrency } from '../../context/AppContext';

interface CategoryItem {
  id: string;
  name: string;
  amount: string;
  rawAmount: number;
  percentage: number;
  icon: keyof typeof Ionicons.glyphMap | string;
  iconColor: string;
  barColor: string;
}

export const StatsScreen = () => {
  const isLoading = useScreenLoading();
  const { themeColors, isDarkMode, transactions } = useApp();
  const styles = getStyles(themeColors);

  // Aggregate real transaction data by category
  const categories: CategoryItem[] = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);

    if (totalExpenses === 0) {
      // Show placeholder categories when no transactions exist
      const placeholders = ['shopping', 'food', 'entertainment', 'transport'];
      return placeholders.map(catId => {
        const cat = getCategoryMeta(catId);
        return {
          id: cat.id,
          name: cat.name,
          amount: '$0',
          rawAmount: 0,
          percentage: 0,
          icon: cat.icon,
          iconColor: `${cat.color}25`,
          barColor: cat.color,
        };
      });
    }

    // Group transactions by category
    const grouped: Record<string, number> = {};
    expenseTransactions.forEach(t => {
      const catId = t.category || 'other';
      grouped[catId] = (grouped[catId] || 0) + Math.abs(t.amount);
    });

    // Convert to sorted array
    return Object.entries(grouped)
      .sort(([, a], [, b]) => b - a)
      .map(([catId, amount]) => {
        const cat = getCategoryMeta(catId);
        const percentage = Math.round((amount / totalExpenses) * 100);
        return {
          id: cat.id,
          name: cat.name,
          amount: formatCurrency(amount),
          rawAmount: amount,
          percentage,
          icon: cat.icon,
          iconColor: `${cat.color}25`,
          barColor: cat.color,
        };
      });
  }, [transactions]);

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
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="bar-chart-outline" size={48} color={themeColors.textSecondary} />
            <Text style={{ color: themeColors.textSecondary, marginTop: 12, fontSize: 14, textAlign: 'center' }}>
              Add some expenses to{"\n"}see your statistics here
            </Text>
          </View>
        }
      />
      </AppSkeleton>
    </SafeAreaView>
  );
};
