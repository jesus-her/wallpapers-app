import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

export default createIconSetFromIcoMoon(
  require('../../selection.json'),
  'IcoMoon',
  'app_icons.ttf'
);

