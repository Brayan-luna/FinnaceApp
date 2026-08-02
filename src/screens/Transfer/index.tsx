import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Account, PaymentIconType, PaymentIconTypeKey, Transaction } from '../../types';
import { PaymentIcon } from 'react-native-payment-icons';
import { BottonSheet } from '../../components/BottonSheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const CATEGORIES: Category[] = [
  { id: 'shopping', name: 'Shopping', icon: 'cart', color: '#9C27B0' },
  { id: 'food', name: 'Food & Drinks', icon: 'fast-food', color: '#E91E63' },
  { id: 'transport', name: 'Transport', icon: 'car', color: '#2196F3' },
  { id: 'housing', name: 'Housing', icon: 'home', color: '#FFC107' },
  { id: 'health', name: 'Health', icon: 'heart', color: '#34C759' },
  { id: 'entertainment', name: 'Entertainment', icon: 'game-controller', color: '#03A9F4' },
  { id: 'education', name: 'Education', icon: 'school', color: '#FF4081' },
  { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', color: '#FF9800' },
  { id: 'other', name: 'Other', icon: 'ellipsis-horizontal', color: '#9E9E9E' },
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const TransferScreen = () => {
  const navigation = useNavigation<any>();
  const { accounts, addTransaction } = useFinanceStore();

  const accountSheetRef = useRef<any>(null);
  const categorySheetRef = useRef<any>(null);
  const dateSheetRef = useRef<any>(null);

  // Form State
  const [amount, setAmount] = useState<string>('32,000');
  const [currency, setCurrency] = useState<'USD' | 'COP'>('COP');
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[1]); // Food & Drinks default
  const [description, setDescription] = useState<string>('Hamburguesa');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 4, 12)); // May 12, 2024 as default to match mock
  const [notes, setNotes] = useState<string>('');

  // Sheet Visibility States
  const [isAccountSheetOpen, setIsAccountSheetOpen] = useState<boolean>(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState<boolean>(false);
  const [isDateSheetOpen, setIsDateSheetOpen] = useState<boolean>(false);

  // Date Picker Custom Sheet Internal State
  const [activeDateTab, setActiveDateTab] = useState<'calendar' | 'month' | 'year'>('calendar');
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [startYearPage, setStartYearPage] = useState<number>(2021); // Starting year for Year grid page

  // Initialize with first account when loaded
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts]);

  // Sync temp dates when date sheet is opened
  useEffect(() => {
    if (isDateSheetOpen) {
      setTempDate(selectedDate);
      setViewDate(selectedDate);
      // Align year page to fit the selected date's year
      const targetYear = selectedDate.getFullYear();
      const pageStart = targetYear - (targetYear % 12) + 1;
      setStartYearPage(pageStart - 1);
    }
  }, [isDateSheetOpen, selectedDate]);

  const handleSaveExpense = () => {
    // Remove formatting from amount
    const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!selectedAccount) {
      Alert.alert('Error', 'Please select an account');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      accountId: selectedAccount.id,
      type: 'expense',
      amount: parsedAmount,
      category: selectedCategory.id,
      date: selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), // e.g. "Oct 12"
    };

    addTransaction(newTransaction);
    Alert.alert('Success', 'Expense saved successfully!', [
      {
        text: 'OK',
        onPress: () => {
          // Reset form fields
          setAmount('');
          setDescription('');
          setNotes('');
          navigation.navigate('Home');
        }
      }
    ]);
  };

  // Format currency display
  const formatBalance = (bal: number) => {
    return bal.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  // Format Date for UI Banner and Field
  const formatDateString = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Calendar Day Generation Helper
  const calendarRows = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek = new Date(year, month, 1).getDay();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    // Prev month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      cells.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Next month days
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    const rows = [];
    for (let i = 0; i < 42; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }
    return rows;
  }, [viewDate]);

  // Year list for year selector (12 years page)
  const yearsArray = useMemo(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
      list.push(startYearPage + i);
    }
    return list;
  }, [startYearPage]);

  // Navigate Calendar Months
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Navigate Years in Month view
  const handlePrevYear = () => {
    setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));
  };

  // Navigate Years in Year view (pages of 12)
  const handlePrevYearPage = () => {
    setStartYearPage(startYearPage - 12);
  };

  const handleNextYearPage = () => {
    setStartYearPage(startYearPage + 12);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerSubtitle}>Add expense</Text>
              <Text style={styles.headerTitle}>New expense</Text>
            </View>

            <Image
              source={require('../../../assets/brayanAnime.jpg')}
              style={styles.avatar}
            />
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Amount Group */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountInputContainer}>
                <View style={styles.amountIconCircle}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>$</Text>
                </View>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.currencyPicker}
                  onPress={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.currencyText}>{currency}</Text>
                  <Ionicons name="chevron-down" size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Category Selector */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                style={styles.selectorCard}
                onPress={() => setIsCategorySheetOpen(true)}
                activeOpacity={0.8}
              >
                <View style={styles.selectorLeft}>
                  <View style={[styles.categoryBadge, { backgroundColor: selectedCategory.color }]}>
                    <Ionicons name={selectedCategory.icon as any} size={16} color="#FFFFFF" />
                  </View>
                  <Text style={styles.selectorTitle}>{selectedCategory.name}</Text>
                </View>
                <Ionicons name="chevron-down" size={16} color="rgba(255, 255, 255, 0.4)" />
              </TouchableOpacity>
            </View>

            {/* Description Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description (optional)</Text>
              <View style={styles.descInputContainer}>
                <TextInput
                  style={styles.descInput}
                  placeholder="e.g. Food, Taxi"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={description}
                  onChangeText={(val) => {
                    if (val.length <= 100) setDescription(val);
                  }}
                />
                <Text style={styles.charCounter}>{description.length}/100</Text>
              </View>
            </View>

            {/* From (Account) Selector */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>From</Text>
              {selectedAccount ? (
                <TouchableOpacity
                  style={styles.accountRow}
                  onPress={() => setIsAccountSheetOpen(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.accountLeft}>
                    {selectedAccount.type === 'cash' ? (
                      <View style={styles.accountLogoCash}>
                        <Ionicons name="wallet-outline" size={18} color="#34C759" />
                      </View>
                    ) : (
                      <View style={styles.accountLogoContainer}>
                        <PaymentIcon type={(selectedAccount.cardType || 'generic') as any} width={30} />
                      </View>
                    )}
                    <View style={styles.accountInfo}>
                      <Text style={styles.accountName}>{selectedAccount.name}</Text>
                      <Text style={styles.accountMeta}>
                        Balance: {formatBalance(selectedAccount.balance)}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.4)" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.selectorCard}
                  onPress={() => setIsAccountSheetOpen(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.selectorLeft}>
                    <Ionicons name="card-outline" size={18} color="rgba(255, 255, 255, 0.4)" />
                    <Text style={[styles.selectorTitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>
                      Select account or cash
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.4)" />
                </TouchableOpacity>
              )}
            </View>

            {/* Date Selector */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.selectorCard}
                onPress={() => setIsDateSheetOpen(true)}
                activeOpacity={0.8}
              >
                <View style={styles.selectorLeft}>
                  <Ionicons name="calendar-outline" size={18} color="rgba(255, 255, 255, 0.4)" />
                  <Text style={styles.selectorTitle}>
                    {formatDateString(selectedDate)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.4)" />
              </TouchableOpacity>
            </View>

            {/* Notes Section */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Notes (optional)</Text>
              <View style={styles.notesContainer}>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Add a note..."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={2}
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSaveExpense}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#8A2387', '#E94057', '#F27121']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Save expense</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Account Bottom Sheet */}
      {isAccountSheetOpen && (
        <BottonSheet
          ref={accountSheetRef}
          snapPoints={['55%', '80%']}
          index={0}
          onClose={() => setIsAccountSheetOpen(false)}
        >
          <BottomSheetScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 112 : 96 }}>
            <View style={styles.sheetContent}>
              <Text style={styles.sheetTitle}>Select account or cash</Text>
              {accounts.map((acc) => {
                const isSelected = selectedAccount?.id === acc.id;
                return (
                  <TouchableOpacity
                    key={acc.id}
                    style={[
                      styles.accountSheetRow,
                      isSelected && styles.accountSheetRowSelected
                    ]}
                    onPress={() => {
                      setSelectedAccount(acc);
                      setIsAccountSheetOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.accountSheetLeft}>
                      {acc.type === 'cash' ? (
                        <View style={styles.accountLogoCash}>
                          <Ionicons name="wallet-outline" size={18} color="#34C759" />
                        </View>
                      ) : (
                        <View style={styles.accountLogoContainer}>
                          <PaymentIcon type={(acc.cardType || 'generic') as any} width={30} />
                        </View>
                      )}
                      <View style={styles.accountSheetInfo}>
                        <Text style={styles.accountSheetName}>{acc.name}</Text>
                        <Text style={styles.accountSheetMeta}>
                          {acc.type === 'cash' ? 'Cash' : 'Credit / Debit Card'}
                        </Text>
                      </View>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 6 }}>
                      <Text style={styles.accountSheetBalance}>{formatBalance(acc.balance)}</Text>
                      <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </BottomSheetScrollView>
        </BottonSheet>
      )}

      {/* Category Bottom Sheet */}
      {isCategorySheetOpen && (
        <BottonSheet
          ref={categorySheetRef}
          snapPoints={['50%', '75%']}
          index={0}
          onClose={() => setIsCategorySheetOpen(false)}
        >
          <BottomSheetScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 112 : 96 }}>
            <View style={styles.sheetContent}>
              <Text style={styles.sheetTitle}>Select category</Text>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={styles.categoryGridItem}
                    onPress={() => {
                      setSelectedCategory(cat);
                      setIsCategorySheetOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.categoryBadge, { backgroundColor: cat.color }]}>
                      <Ionicons name={cat.icon as any} size={15} color="#FFFFFF" />
                    </View>
                    <Text style={styles.categoryGridItemText} numberOfLines={1}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </BottomSheetScrollView>
        </BottonSheet>
      )}

      {/* Custom Date Picker Bottom Sheet (with sticky footer buttons) */}
      {isDateSheetOpen && (
        <BottonSheet
          ref={dateSheetRef}
          snapPoints={['75%', '90%']}
          index={0}
          onClose={() => setIsDateSheetOpen(false)}
        >
          <View style={{ flex: 1, paddingBottom: Platform.OS === 'ios' ? 120 : 95, justifyContent: 'space-between' }}>
            <BottomSheetScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
              <View style={styles.sheetContent}>
                <View style={styles.dateAndTitleContainer}>
                  <Text style={styles.sheetTitle}>Select date</Text>
                  <View style={styles.dateAndIconSelected}>
                    <Ionicons name="calendar" size={18} color="#7F56D9" />
                    <Text style={styles.dateBannerText}>
                      {formatDateString(tempDate)}
                    </Text>
                  </View>
                </View>

                {/* Custom Tab Selector */}
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    style={[styles.tabButton, activeDateTab === 'calendar' && styles.tabButtonActive]}
                    onPress={() => setActiveDateTab('calendar')}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.tabButtonText, activeDateTab === 'calendar' && styles.tabButtonTextActive]}>
                      Calendar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tabButton, activeDateTab === 'month' && styles.tabButtonActive]}
                    onPress={() => setActiveDateTab('month')}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.tabButtonText, activeDateTab === 'month' && styles.tabButtonTextActive]}>
                      Month
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tabButton, activeDateTab === 'year' && styles.tabButtonActive]}
                    onPress={() => setActiveDateTab('year')}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.tabButtonText, activeDateTab === 'year' && styles.tabButtonTextActive]}>
                      Year
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Tab Views */}
                {activeDateTab === 'calendar' && (
                  <View>
                    {/* Month Navigation */}
                    <View style={styles.navRow}>
                      <TouchableOpacity style={styles.navButton} onPress={handlePrevMonth}>
                        <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                      <Text style={styles.navTitle}>
                        {MONTH_FULL_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                      </Text>
                      <TouchableOpacity style={styles.navButton} onPress={handleNextMonth}>
                        <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>

                    {/* Days of Week Headers */}
                    <View style={styles.weekHeaderRow}>
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                        <Text key={day} style={styles.weekDayLabel}>{day}</Text>
                      ))}
                    </View>

                    {/* Days Grid */}
                    {calendarRows.map((row, rowIndex) => (
                      <View key={rowIndex} style={styles.gridRow}>
                        {row.map((cell, cellIndex) => {
                          const isSelected =
                            tempDate.getDate() === cell.date.getDate() &&
                            tempDate.getMonth() === cell.date.getMonth() &&
                            tempDate.getFullYear() === cell.date.getFullYear();

                          const isToday =
                            new Date().getDate() === cell.date.getDate() &&
                            new Date().getMonth() === cell.date.getMonth() &&
                            new Date().getFullYear() === cell.date.getFullYear();

                          return (
                            <TouchableOpacity
                              key={cellIndex}
                              style={[
                                styles.gridDayCell,
                                isSelected && styles.gridDayCellSelected
                              ]}
                              onPress={() => {
                                setTempDate(cell.date);
                                if (!cell.isCurrentMonth) {
                                  setViewDate(new Date(cell.date.getFullYear(), cell.date.getMonth(), 1));
                                }
                              }}
                              activeOpacity={0.8}
                            >
                              <Text style={[
                                styles.gridDayText,
                                !cell.isCurrentMonth && styles.gridDayTextDim
                              ]}>
                                {cell.day}
                              </Text>
                              {isToday && (
                                <View style={[
                                  styles.gridDayDot,
                                  isSelected && styles.gridDayDotSelected
                                ]} />
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                  </View>
                )}

                {activeDateTab === 'month' && (
                  <View>
                    {/* Year Navigation */}
                    <View style={styles.navRow}>
                      <TouchableOpacity style={styles.navButton} onPress={handlePrevYear}>
                        <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                      <Text style={styles.navTitle}>{viewDate.getFullYear()}</Text>
                      <TouchableOpacity style={styles.navButton} onPress={handleNextYear}>
                        <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>

                    {/* Months Grid */}
                    <View style={styles.monthGrid}>
                      {MONTH_NAMES.map((monthName, idx) => {
                        const isSelected =
                          tempDate.getMonth() === idx &&
                          tempDate.getFullYear() === viewDate.getFullYear();

                        return (
                          <TouchableOpacity
                            key={monthName}
                            style={[
                              styles.monthCell,
                              isSelected && styles.monthCellSelected
                            ]}
                            onPress={() => {
                              const newD = new Date(tempDate);
                              newD.setMonth(idx);
                              newD.setFullYear(viewDate.getFullYear());
                              setTempDate(newD);
                            }}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.monthText}>{monthName}</Text>
                            <Text style={[
                              styles.monthSubtext,
                              isSelected && styles.monthSubtextSelected
                            ]}>
                              {viewDate.getFullYear()}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}

                {activeDateTab === 'year' && (
                  <View>
                    {/* Year Range Navigation */}
                    <View style={styles.navRow}>
                      <TouchableOpacity style={styles.navButton} onPress={handlePrevYearPage}>
                        <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                      <Text style={styles.navTitle}>Select year</Text>
                      <TouchableOpacity style={styles.navButton} onPress={handleNextYearPage}>
                        <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>

                    {/* Years Grid */}
                    <View style={styles.yearGrid}>
                      {yearsArray.map((yearNum) => {
                        const isSelected = tempDate.getFullYear() === yearNum;

                        return (
                          <TouchableOpacity
                            key={yearNum}
                            style={[
                              styles.yearCell,
                              isSelected && styles.yearCellSelected
                            ]}
                            onPress={() => {
                              const newD = new Date(tempDate);
                              newD.setFullYear(yearNum);
                              setTempDate(newD);
                              setViewDate(new Date(yearNum, viewDate.getMonth(), 1));
                            }}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.yearText}>{yearNum}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
            </BottomSheetScrollView>

            {/* Sticky Footer - Always Pinned at Bottom of BottomSheet */}
            <View style={{ paddingHorizontal: 16 }}>
              {/* Selected Date Indicator Banner */}


              {/* Action Buttons */}
              <View style={styles.actionButtonsRow}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setIsDateSheetOpen(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => {
                    setSelectedDate(tempDate);
                    setIsDateSheetOpen(false);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#8A2387', '#E94057', '#F27121']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.confirmBtnGradient}
                  >
                    <Text style={styles.confirmBtnText}>Confirm</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottonSheet>
      )}
    </SafeAreaView>
  );
};
