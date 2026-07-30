import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { styles } from './styles';
import { CardsCarousel } from '../../components/CardsCarousel';
import { QuickActions } from '../../components/QuickActions';
import { TransactionList } from '../../components/TransactionList';
import { TransactionItem, TransactionType } from '../../components/TransactionItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaymentIconTypeKey } from '../../types';
import { BottonSheet } from '../../components/BottonSheet';
import { FlatList } from 'react-native-gesture-handler';
import { theme } from '../../constants/theme';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native';
import profile from '../../../assets/brayanAnime.jpg';



export const HomeScreen = () => {
  const MOCK_TRANSACTIONS: TransactionType[] = [
    { id: '1', title: 'Grocery Store', date: 'Today', amount: -45.50, type: 'expense', categoryIcon: 'cart' },
    { id: '2', title: 'Salary Transfer', date: 'Yesterday', amount: 3200.00, type: 'income', categoryIcon: 'cash' },
    { id: '3', title: 'Electric Bill', date: 'Oct 12', amount: -120.00, type: 'expense', categoryIcon: 'flash' },
    { id: '4', title: 'Coffee Shop', date: 'Oct 11', amount: -4.50, type: 'expense', categoryIcon: 'cafe' },
    { id: '5', title: 'Grocery Store', date: 'Today', amount: -45.50, type: 'expense', categoryIcon: 'cart' },
    { id: '6', title: 'Salary Transfer', date: 'Yesterday', amount: 3200.00, type: 'income', categoryIcon: 'cash' },
    { id: '7', title: 'Electric Bill', date: 'Oct 12', amount: -120.00, type: 'expense', categoryIcon: 'flash' },
    { id: '8', title: 'Coffee Shop', date: 'Oct 11', amount: -4.50, type: 'expense', categoryIcon: 'cafe' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Afternoon,</Text>
            <Text style={styles.userName}>Brayan Luna</Text>
          </View>
          <View style={styles.profilePicPlaceholder} >
            <Image source={require('../../../assets/brayanAnime.jpg')} style={styles.profilePicPlaceholder} />
          </View>
        </View>
        <CardsCarousel />

        {/* Dashboard Grid Section */}
        <View style={styles.gridContainer}>
          {/* Row 1 */}
          <View style={styles.gridRow}>
            <View style={styles.transactionCard}>
              <View>
                <Text style={styles.cardTitle}>Transactions</Text>
                <Text style={styles.cardSubtitle}>Spent in october</Text>
              </View>
              <View style={styles.barChartContainer}>
                <View style={styles.barPurple} />
                <View style={styles.barCoral} />
                <View style={styles.barBlue} />
                <View style={styles.barYellow} />
                <View style={styles.barGreen} />
              </View>
            </View>

            <View style={styles.cashbackCard}>
              <Text style={styles.cardTitle}>Cashback</Text>
              <View style={styles.brandsContainer}>
                <View style={[styles.brandCircle, styles.brandAdidas]}>
                  <FontAwesome5 name="adidas" size={14} color="white" />
                </View>
                <View style={[styles.brandCircle, styles.brandMcdonalds, { marginLeft: -8 }]}>
                  <FontAwesome5 name="mcdonalds" size={14} color="#FFC72C" />
                </View>
                <View style={[styles.brandCircle, styles.brandAmazon, { marginLeft: -8 }]}>
                  <FontAwesome5 name="amazon" size={12} color="#FF9900" />
                </View>
                <View style={[styles.brandCircle, styles.brandSpotify, { marginLeft: -8 }]}>
                  <FontAwesome5 name="spotify" size={14} color="white" />
                </View>
              </View>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.gridRow}>
            <View style={styles.actionColumn}>
              <View style={styles.actionButton}>
                <Ionicons name="qr-code-outline" size={20} color="white" />
              </View>
              <View style={styles.actionButton}>
                <Ionicons name="add" size={22} color="white" />
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.iconCircle}>
                <Ionicons name="school-outline" size={18} color="white" />
              </View>
              <Text style={styles.infoCardTitle}>Tips and training</Text>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.iconCircle}>
                <Ionicons name="grid-outline" size={18} color="white" />
              </View>
              <Text style={styles.infoCardTitle}>All services</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
