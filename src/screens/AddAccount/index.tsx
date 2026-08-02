import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Account, AccountType, PaymentIconType, PaymentIconTypeKey } from '../../types';
import { PaymentIcon } from 'react-native-payment-icons';
import { BottonSheet } from '../../components/BottonSheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const COLORS = [
  '#7F56D9', // Purple
  '#FF5A5F', // Coral/Red
  '#007AFF', // Blue
  '#FFCC00', // Yellow
  '#34C759', // Green
  '#8E8E93', // Grey
];

const ALL_CARD_BRANDS = [
  { id: PaymentIconTypeKey.visa, name: 'Visa' },
  { id: PaymentIconTypeKey.mastercard, name: 'Mastercard' },
  { id: PaymentIconTypeKey.amex, name: 'American Express' },
  { id: PaymentIconTypeKey.paypal, name: 'PayPal' },
  { id: PaymentIconTypeKey.discover, name: 'Discover' },
  { id: PaymentIconTypeKey.diners, name: 'Diners Club' },
  { id: PaymentIconTypeKey.jcb, name: 'JCB' },
  { id: PaymentIconTypeKey.maestro, name: 'Maestro' },
  { id: PaymentIconTypeKey.unionpay, name: 'UnionPay' },
  { id: PaymentIconTypeKey.elo, name: 'Elo' },
  { id: PaymentIconTypeKey.hipercard, name: 'Hipercard' },
  { id: PaymentIconTypeKey.alipay, name: 'Alipay' },
  { id: PaymentIconTypeKey.mir, name: 'Mir' },
  { id: PaymentIconTypeKey.generic, name: 'Other' },
];

export const AddAccountScreen = () => {
  const navigation = useNavigation<any>();
  const addAccount = useFinanceStore((state) => state.addAccount);
  const bottomSheetRef = useRef<any>(null);

  // Form State
  const [accountType, setAccountType] = useState<'card' | 'cash'>('card');
  const [cardType, setCardType] = useState<PaymentIconType>(PaymentIconTypeKey.visa);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [notes, setNotes] = useState<string>('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const handleAddAccount = () => {
    const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const defaultName = accountType === 'card'
      ? `${cardType.toUpperCase()} Account`
      : 'Cash Wallet';

    const newAccount: Account = {
      id: Date.now().toString(),
      name: name.trim() || defaultName,
      type: accountType === 'card' ? 'credit_card' : 'cash',
      balance: parsedAmount,
      currency: 'USD',
      color: selectedColor,
      cardType: accountType === 'card' ? cardType : undefined,
      notes: notes.trim() || undefined,
    };

    addAccount(newAccount);
    navigation.goBack();
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
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerSubtitle}>Add account</Text>
              <Text style={styles.headerTitle}>Choose account type</Text>
            </View>

            <Image
              source={require('../../../assets/brayanAnime.jpg')}
              style={styles.avatar}
            />
          </View>

          {/* Account Type Selector */}
          <View style={styles.accountTypeRow}>
            {/* Card Card */}
            <TouchableOpacity
              style={[
                styles.accountTypeCard,
                accountType === 'card' && styles.accountTypeCardSelected,
              ]}
              onPress={() => setAccountType('card')}
              activeOpacity={0.8}
            >
              <View style={styles.cardTopRow}>
                <View style={[
                  styles.accountTypeIconContainer,
                  accountType === 'card' && styles.accountTypeIconContainerSelected
                ]}>
                  <Ionicons name="card-outline" size={20} color={accountType === 'card' ? '#A180F4' : '#FFFFFF'} />
                </View>
                <View style={[
                  styles.radioOuter,
                  accountType === 'card' && styles.radioOuterSelected
                ]}>
                  {accountType === 'card' && <View style={styles.radioInner} />}
                </View>
              </View>

              <View style={styles.accountTypeTextContainer}>
                <Text style={styles.accountTypeTitle}>Card</Text>
                <Text style={styles.accountTypeDesc}>Add a debit or credit card</Text>
              </View>
            </TouchableOpacity>

            {/* Cash Card */}
            <TouchableOpacity
              style={[
                styles.accountTypeCard,
                accountType === 'cash' && styles.accountTypeCardSelected,
              ]}
              onPress={() => setAccountType('cash')}
              activeOpacity={0.8}
            >
              <View style={styles.cardTopRow}>
                <View style={[
                  styles.accountTypeIconContainer,
                  accountType === 'cash' && styles.accountTypeIconContainerSelected
                ]}>
                  <Ionicons name="cash-outline" size={20} color={accountType === 'cash' ? '#A180F4' : '#FFFFFF'} />
                </View>
                <View style={[
                  styles.radioOuter,
                  accountType === 'cash' && styles.radioOuterSelected
                ]}>
                  {accountType === 'cash' && <View style={styles.radioInner} />}
                </View>
              </View>

              <View style={styles.accountTypeTextContainer}>
                <Text style={styles.accountTypeTitle}>Cash</Text>
                <Text style={styles.accountTypeDesc}>Add cash you have on hand</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Title */}
          <Text style={styles.sectionTitle}>
            {accountType === 'card' ? 'Card details' : 'Cash details'}
          </Text>

          {/* Form */}
          <View style={styles.form}>
            {/* Conditional Card Type Section */}
            {accountType === 'card' && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Card type</Text>

                {/* Custom Clickable Dropdown */}
                <TouchableOpacity
                  style={styles.dropdownContainer}
                  onPress={() => setIsBottomSheetOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dropdownText, cardType && styles.dropdownTextActive]}>
                    {cardType ? cardType.toUpperCase() : 'Select card type'}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="rgba(255, 255, 255, 0.4)" />
                </TouchableOpacity>
              </View>
            )}

            {/* Account/Card Name Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {accountType === 'card' ? 'Card name (optional)' : 'Cash name (optional)'}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={accountType === 'card' ? 'e.g. My personal card' : 'e.g. Main wallet'}
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Amount Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountInputContainer}>
                <View style={styles.amountIconCircle}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>$</Text>
                </View>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Enter amount"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                <Text style={styles.amountCurrencyText}>USD</Text>
              </View>
            </View>

            {/* Color Bullet Picker */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Color (optional)</Text>
              <View style={styles.colorsRow}>
                {COLORS.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: color },
                        isSelected && styles.colorCircleSelected,
                      ]}
                      onPress={() => setSelectedColor(color)}
                      activeOpacity={0.8}
                    >
                      {isSelected && <View style={styles.colorCheck} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* Add Account Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddAccount}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#8A2387', '#E94057', '#F27121']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Add account</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {isBottomSheetOpen && (
        <BottonSheet
          ref={bottomSheetRef}
          snapPoints={['70%']}
          index={0}
          onClose={() => setIsBottomSheetOpen(false)}
        >
          <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <View style={styles.sheetContent}>
              <Text style={styles.sheetTitle}>Select card type</Text>
              {ALL_CARD_BRANDS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.sheetItemRow}
                  onPress={() => {
                    setCardType(item.id);
                    setIsBottomSheetOpen(false);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.sheetItemLeft}>
                    {item.id === 'generic' ? (
                      <View style={styles.sheetGenericIconContainer}>
                        <Ionicons name="card-outline" size={20} color="#FFFFFF" />
                      </View>
                    ) : (
                      <PaymentIcon type={item.id} width={45} />
                    )}
                    <Text style={styles.sheetItemText}>{item.name}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="rgba(255, 255, 255, 0.3)" />
                </TouchableOpacity>
              ))}
            </View>
          </BottomSheetScrollView>
        </BottonSheet>
      )}
    </SafeAreaView>
  );
};
