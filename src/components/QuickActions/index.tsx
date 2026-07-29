import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

type ActionType = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export const QuickActions = () => {
  const actions: ActionType[] = [
    { id: '1', title: 'Agregar Gastos', icon: 'add', onPress: () => console.log('Agregar Gastos') },
    { id: '2', title: 'Agregar Ingresos', icon: 'add', onPress: () => console.log('Agregar Ingresos') },
    { id: '3', title: 'Crear Categoria', icon: 'add', onPress: () => console.log('Crear Categoria') }
  ];

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity key={action.id} style={styles.actionButton} onPress={action.onPress}>
          <View style={styles.iconContainer}>
            <Ionicons name={action.icon} size={24} color="#007BFF" />
          </View>
          <Text style={styles.actionText}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
