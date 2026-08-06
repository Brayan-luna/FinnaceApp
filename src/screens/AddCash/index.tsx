import React, { useState } from 'react';
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
import { Account } from '../../types';
import { useApp } from '../../context/AppContext';

export const AddCashScreen = () => {
  const navigation = useNavigation<any>();
  const addAccount = useFinanceStore((state) => state.addAccount);

  const { cashColors, getCardGradientColors } = useApp();

  // Form State
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(cashColors[0]);

  const handleAddCash = () => {
    const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const defaultName = 'Cash Wallet';

    const newAccount: Account = {
      id: Date.now().toString(),
      name: name.trim() || defaultName,
      type: 'cash',
      balance: parsedAmount,
      currency: 'USD',
      color: selectedColor,
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
              <Text style={styles.headerSubtitle}>ADD CASH</Text>
              <Text style={styles.headerTitle}>Add cash</Text>
            </View>

            <Image
              source={require('../../../assets/brayanAnime.jpg')}
              style={styles.avatar}
            />
          </View>

          {/* Cash Card Preview */}
          <View style={styles.cardPreviewContainer}>
            <LinearGradient
              colors={getCardGradientColors(selectedColor)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardPreviewGradient}
            >
              <View style={styles.cardPreviewLeft}>
                {/* Banknote Icon Container */}
                <View style={[
                  styles.banknoteIconContainer,
                  {
                    backgroundColor: `${selectedColor}33`,
                    borderWidth: 1.5,
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                  }
                ]}>
                  <Ionicons name="cash" size={22} color="#FFFFFF" />
                </View>

                <View style={styles.cardPreviewTextContainer}>
                  <Text style={styles.cardPreviewTitle}>Cash</Text>
                  <Text style={styles.cardPreviewSubtitle}>Add the cash you have on hand</Text>
                </View>
              </View>

              {/* Faint Banknote illustration on the right */}
              <View style={styles.banknoteIllustration}>
                <Ionicons name="cash-outline" size={110} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Account Name Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Account name (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Cash wallet, Daily cash"
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
              <Text style={styles.label}>Account color (optional)</Text>
              <View style={styles.colorsRow}>
                {cashColors.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: color },
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

            {/* Add Cash Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddCash}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[selectedColor, selectedColor]}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Add cash</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
