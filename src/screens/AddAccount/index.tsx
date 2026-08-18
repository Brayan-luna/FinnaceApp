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
import { useApp } from '../../context/AppContext';
import { useScreenLoading } from '../../hooks/useScreenLoading';
import { AppSkeleton, layouts } from '../../components/AppSkeleton';

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

  const { cardColors, getCardGradientColors, getAccountIcon } = useApp();

  const isLoading = useScreenLoading();

  // Form State
  const [accountType, setAccountType] = useState<'card' | 'cash'>('card');
  const [cardType, setCardType] = useState<PaymentIconType>(PaymentIconTypeKey.visa);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(cardColors[0]);
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
          <AppSkeleton isLoading={isLoading} layout={layouts.addAccountSkeletonLayout}>
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
              <Text style={styles.headerSubtitle}>ADD CARD</Text>
              <Text style={styles.headerTitle}>Add a card</Text>
            </View>

            <Image
              source={require('../../../assets/brayanAnime.jpg')}
              style={styles.avatar}
            />
          </View>

          {/* Card Preview */}
          <View style={styles.cardPreviewContainer}>
            <LinearGradient
              colors={getCardGradientColors(selectedColor)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardPreviewGradient}
            >
              <View style={styles.cardPreviewHeader}>
                {getAccountIcon('card', cardType, 32)}
              </View>
              <View style={styles.cardPreviewBottom}>
                {/* Chip Icon */}
                <View style={styles.cardChip}>
                  <View style={styles.chipInnerLineRow}>
                    <View style={styles.chipInnerLineLeft} />
                    <View style={styles.chipInnerLineRight} />
                  </View>
                  <View style={styles.chipMiddleDivider} />
                  <View style={styles.chipInnerLineRow}>
                    <View style={styles.chipInnerLineLeftBottom} />
                    <View style={styles.chipInnerLineRightBottom} />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Card Type Section */}
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

            {/* Card Name Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Card name (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. My personal card"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Amount Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Initial balance</Text>
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.amountCurrencyText}>COP</Text>
                  <Ionicons name="chevron-down" size={14} color="rgba(255, 255, 255, 0.6)" style={{ marginLeft: 4 }} />
                </View>
              </View>
            </View>

            {/* Color Bullet Picker */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Card color (optional)</Text>
              <View style={styles.colorsRow}>
                {cardColors.map((color) => {
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

            {/* Add Card Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddAccount}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#7F56D9', '#6938D0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Add card</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
          </AppSkeleton>
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
