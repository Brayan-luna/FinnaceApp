import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isPopular: boolean;
}

const INITIAL_CATEGORIES: Category[] = [
  { id: 'income', name: 'Income', icon: 'wallet', color: '#34C759', isPopular: false },
  { id: 'shopping', name: 'Shopping', icon: 'cart', color: '#9C27B0', isPopular: true },
  { id: 'food', name: 'Food & Drinks', icon: 'fast-food', color: '#E91E63', isPopular: true },
  { id: 'transport', name: 'Transport', icon: 'car', color: '#2196F3', isPopular: true },
  { id: 'housing', name: 'Housing', icon: 'home', color: '#FFC107', isPopular: true },
  { id: 'health', name: 'Health', icon: 'heart', color: '#34C759', isPopular: true },
  { id: 'entertainment', name: 'Entertainment', icon: 'game-controller', color: '#03A9F4', isPopular: true },
  { id: 'education', name: 'Education', icon: 'school', color: '#FF4081', isPopular: true },
  { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', color: '#FF9800', isPopular: false },
  { id: 'other', name: 'Other', icon: 'ellipsis-horizontal', color: '#9E9E9E', isPopular: true },
];

const AVAILABLE_COLORS = [
  '#9C27B0', // Purple
  '#E91E63', // Pink/Red
  '#2196F3', // Blue
  '#FFC107', // Yellow
  '#34C759', // Green
  '#03A9F4', // Light Blue
  '#FF4081', // Hot Pink
  '#FF9800', // Orange
  '#9E9E9E', // Grey
  '#00BCD4', // Cyan
  '#E040FB', // Light Purple
  '#FF5722', // Deep Orange
];

const AVAILABLE_ICONS = [
  'cart',
  'fast-food',
  'car',
  'home',
  'heart',
  'game-controller',
  'school',
  'receipt',
  'wallet',
  'airplane',
  'bulb',
  'gift',
  'fitness',
  'cash',
  'musical-notes',
  'shirt',
  'trending-up',
  'ellipsis-horizontal',
];

export const AddCategoriesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // New category state
  const [newCatName, setNewCatName] = useState('');
  const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(AVAILABLE_ICONS[0]);

  // Filtered categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  // Filtered popular categories (only those that are marked isPopular and match search)
  const popularCategories = useMemo(() => {
    return filteredCategories.filter((cat) => cat.isPopular);
  }, [filteredCategories]);

  const handleCreateCategory = () => {
    if (!newCatName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCatName.trim(),
      icon: selectedIcon,
      color: selectedColor,
      isPopular: false,
    };

    setCategories((prev) => [...prev, newCategory]);
    
    // Reset modal state
    setNewCatName('');
    setSelectedColor(AVAILABLE_COLORS[0]);
    setSelectedIcon(AVAILABLE_ICONS[0]);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.subtitle}>Add expense</Text>
              <Text style={styles.title}>Select category</Text>
            </View>
          </View>
          <Image
            source={require('../../../assets/brayanAnime.jpg')}
            style={styles.avatar}
          />
        </View>

        {/* Search & Add Category Button */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="rgba(255, 255, 255, 0.4)"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search category"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8A2387', '#E94057', '#F27121']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={26} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* All Categories list with popular as a header element */}
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            popularCategories.length > 0 ? (
              <>
                <Text style={styles.sectionHeader}>Popular</Text>
                <View style={styles.popularGrid}>
                  {popularCategories.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.popularCard}
                      activeOpacity={0.7}
                    >
                      <Ionicons name={item.icon as any} size={24} color={item.color} />
                      <Text style={styles.popularText} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.sectionHeader}>All categories</Text>
              </>
            ) : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryRow} activeOpacity={0.7}>
              <View style={styles.categoryLeft}>
                <View style={[styles.iconBadge, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon as any} size={18} color="#FFFFFF" />
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="rgba(255, 255, 255, 0.3)"
                style={styles.chevron}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal for adding a new category */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Category</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Category Name Input */}
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Subscriptions, Travel"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={newCatName}
              onChangeText={setNewCatName}
              maxLength={24}
              autoFocus
            />

            {/* Color Selector */}
            <Text style={styles.inputLabel}>Select Color</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.selectorScroll}
            >
              {AVAILABLE_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorBubble,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorBubbleSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Icon Selector */}
            <Text style={styles.inputLabel}>Select Icon</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.selectorScroll}
            >
              {AVAILABLE_ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconBubble,
                    selectedIcon === icon && styles.iconBubbleSelected,
                  ]}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <Ionicons
                    name={icon as any}
                    size={22}
                    color={selectedIcon === icon ? selectedColor : 'rgba(255, 255, 255, 0.6)'}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                { opacity: newCatName.trim() ? 1 : 0.6 }
              ]}
              onPress={handleCreateCategory}
              disabled={!newCatName.trim()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#8A2387', '#E94057', '#F27121']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Add Category</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};
