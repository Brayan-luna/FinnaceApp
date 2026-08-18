import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getStyles } from './styles';
import { useScreenLoading } from '../../hooks/useScreenLoading';
import { AppSkeleton, layouts } from '../../components/AppSkeleton';
import { useApp } from '../../context/AppContext';

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  isLast?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  title,
  subtitle,
  rightElement,
  onPress,
  isLast = false,
}) => {
  const { themeColors } = useApp();
  const styles = getStyles(themeColors);

  return (
    <TouchableOpacity
      style={[styles.row, !isLast && styles.rowBorder]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !rightElement}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={themeColors.accent} />
      </View>
      <View style={styles.rowTextContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      {rightElement ? (
        rightElement
      ) : (
        <Ionicons name="chevron-forward" size={18} color={themeColors.subtleIcon} />
      )}
    </TouchableOpacity>
  );
};

export const SettingsScreen = () => {
  const isLoading = useScreenLoading();
  const { isDarkMode, toggleTheme, themeColors } = useApp();
  const [currency, setCurrency] = useState('COP');

  const styles = getStyles(themeColors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppSkeleton 
          isLoading={isLoading} 
          layout={layouts.settingsSkeletonLayout}
          boneColor={isDarkMode ? '#1E1F25' : '#E5E7EB'}
          highlightColor={isDarkMode ? '#2E3039' : '#F3F4F6'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header */}
            <Text style={styles.headerTitle}>Settings</Text>

            {/* Profile Card */}
            <TouchableOpacity style={styles.profileCard} activeOpacity={0.8}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
                  }}
                  style={styles.avatar}
                />
                <View style={styles.editBadge}>
                  <Ionicons name="pencil" size={10} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>Brayan Luna</Text>
                <Text style={styles.profileSubtitle}>Manage your profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={themeColors.subtleIcon} />
            </TouchableOpacity>

            {/* Preferences Section */}
            <Text style={styles.sectionLabel}>Preferences</Text>
            <View style={styles.card}>
              <SettingRow
                icon="cash-outline"
                title="Currency"
                subtitle="Choose your preferred currency"
                rightElement={
                  <TouchableOpacity style={styles.currencyBadge} activeOpacity={0.7}>
                    <Text style={styles.currencyText}>{currency}</Text>
                    <Ionicons name="chevron-down" size={14} color={themeColors.accent} />
                  </TouchableOpacity>
                }
              />
              <SettingRow
                icon="moon-outline"
                title="Dark mode"
                subtitle="Customize the appearance"
                rightElement={
                  <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#D1D5DB', true: themeColors.accent }}
                    thumbColor={isDarkMode ? '#FFFFFF' : '#F3F4F6'}
                  />
                }
              />
              <SettingRow
                icon="color-palette-outline"
                title="Accent color"
                subtitle="Choose the app accent color"
                rightElement={
                  <View style={styles.accentRight}>
                    <View style={styles.accentCircle} />
                    <Ionicons name="chevron-forward" size={18} color={themeColors.subtleIcon} />
                  </View>
                }
                isLast
              />
            </View>

            {/* General Section */}
            <Text style={styles.sectionLabel}>General</Text>
            <View style={styles.card}>
              <SettingRow
                icon="notifications-outline"
                title="Notifications"
                subtitle="Manage your notifications"
                onPress={() => { }}
              />
              <SettingRow
                icon="cloud-upload-outline"
                title="Backup & restore"
                subtitle="Back up or restore your data"
                onPress={() => { }}
              />
              <SettingRow
                icon="information-circle-outline"
                title="About"
                subtitle="App information and version"
                onPress={() => { }}
                isLast
              />
            </View>
          </ScrollView>
        </AppSkeleton>
      </View>
    </SafeAreaView>
  );
};
