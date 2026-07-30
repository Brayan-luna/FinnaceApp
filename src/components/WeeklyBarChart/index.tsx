import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

interface BarDataItem {
  value: number;
  label: string;
  frontColor?: string;
  gradientColor?: string;
  showGradient?: boolean;
}

export const WeeklyBarChart = () => {
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income');
  const [weekOffset, setWeekOffset] = useState(0);

  // Colores base de la app
  const INCOME_COLOR_TOP = '#34C759';     // Verde éxito
  const INCOME_COLOR_BOTTOM = '#ADFF2F';  // Verde lima brillante
  const EXPENSE_COLOR_TOP = '#FF5A5F';    // Coral/Rojo peligro
  const EXPENSE_COLOR_BOTTOM = '#FF8000'; // Naranja/Amarillo brillante
  const INACTIVE_COLOR = '#2C2D35';        // Gris para días sin transacciones

  // Datos mock para ingresos y gastos
  const mockIncomeData = [
    { day: 'Sun', value: 2000 },
    { day: 'Mon', value: 0 },
    { day: 'Tue', value: 0 },
    { day: 'Wed', value: 1540 },
    { day: 'Thu', value: 0 },
    { day: 'Fri', value: 380 },
    { day: 'Sat', value: 0 },
  ];

  const mockExpenseData = [
    { day: 'Sun', value: 350 },
    { day: 'Mon', value: 120 },
    { day: 'Tue', value: 0 },
    { day: 'Wed', value: 650 },
    { day: 'Thu', value: 0 },
    { day: 'Fri', value: 1100 },
    { day: 'Sat', value: 20 },
  ];

  const currentData = activeTab === 'income' ? mockIncomeData : mockExpenseData;
  const totalAmount = activeTab === 'income' ? '$4,035.28' : '$2,240.00';
  const labelText = activeTab === 'income' ? 'Total Income' : 'Total Expense';

  // El valor máximo es 2010 para coincidir con la escala del mockup
  const maxValue = 2010;

  // Transformar los datos para gifted-charts
  const chartData: BarDataItem[] = currentData.map((item) => {
    const isZero = item.value === 0;

    // Si el valor es cero, dibujamos una pequeña pastilla gris de altura fija
    // 60 representa aproximadamente el 3% de la altura máxima (2010)
    const displayValue = isZero ? 60 : item.value;

    return {
      value: displayValue,
      label: item.day,
      frontColor: isZero
        ? INACTIVE_COLOR
        : (activeTab === 'income' ? INCOME_COLOR_TOP : EXPENSE_COLOR_TOP),
      gradientColor: isZero
        ? INACTIVE_COLOR
        : (activeTab === 'income' ? INCOME_COLOR_BOTTOM : EXPENSE_COLOR_BOTTOM),
      showGradient: !isZero,
    };
  });

  const screenWidth = Dimensions.get('window').width;
  // Calculamos el ancho disponible para el gráfico
  const chartWidth = screenWidth - 72;

  return (
    <View style={styles.cardContainer}>
      {/* Encabezado */}
      <View style={styles.containerDateRangeAndSelectors}>
        <View style={styles.header}>
          <Text style={styles.dateRange}>
            {weekOffset === 0 ? 'Aug 25 - Aug 31' : weekOffset === -1 ? 'Aug 18 - Aug 24' : 'Sep 01 - Sep 07'}
          </Text>
          <Text style={styles.label}>{labelText}</Text>
          <Text style={styles.amount}>{totalAmount}</Text>
        </View>
        {/* Selector de Segmento */}
        <View>
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  activeTab === 'income' && styles.toggleButtonActive,
                ]}
                onPress={() => setActiveTab('income')}
                activeOpacity={0.9}
              >
                <Text
                  style={
                    activeTab === 'income'
                      ? styles.toggleTextActive
                      : styles.toggleTextInactive
                  }
                >
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  activeTab === 'expense' && styles.toggleButtonActive,
                ]}
                onPress={() => setActiveTab('expense')}
                activeOpacity={0.9}
              >
                <Text
                  style={
                    activeTab === 'expense'
                      ? styles.toggleTextActive
                      : styles.toggleTextInactive
                  }
                >
                  Expense
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Gráfico de Barras */}
      <View style={styles.chartWrapper}>
        <BarChart
          data={chartData}
          barWidth={16}
          spacing={22}
          roundedTop
          roundedBottom
          hideRules={false}
          rulesType="dashed"
          rulesColor="rgba(255, 255, 255, 0.08)"
          dashWidth={4}
          dashGap={4}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisTextStyle={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: 11 }}
          xAxisLabelTextStyle={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: 11, textAlign: 'center' }}
          yAxisLabelTexts={['0', '502', '1005', '1507', '2010']}
          noOfSections={4}
          maxValue={maxValue}
          height={150}
          width={chartWidth}
          isAnimated
          animationDuration={600}
          LinearGradient={LinearGradient}
        />
      </View>

      {/* Controles de Navegación y Toggle */}
      <View style={styles.footer}>
        {/* Prev Week */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setWeekOffset(prev => prev - 1)}
          activeOpacity={0.7}
        >
          <View style={styles.arrowCircle}>
            <Ionicons name="chevron-back" size={16} color="rgba(255, 255, 255, 0.6)" />
          </View>
          <Text style={styles.navButtonText}>Prev week</Text>
        </TouchableOpacity>

        {/* Next Week */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setWeekOffset(prev => prev + 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>Next week</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.6)" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
