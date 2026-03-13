import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Pressable, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RotateCcw } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { useGame } from '@/providers/GameProvider';
import developers from '@/mocks/developers';
import type { Developer } from '@/mocks/developers';
import DeveloperCard from '@/components/DeveloperCard';
import StatsHeader from '@/components/StatsHeader';
import MoodSelector from '@/components/MoodSelector';
import AchievementToast from '@/components/AchievementToast';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isLoading, resetGame } = useGame();

  const handleReset = useCallback(() => {
    if (Platform.OS !== 'web') {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
    resetGame();
  }, [resetGame]);

  const renderHeader = useCallback(() => (
    <View>
      <StatsHeader />
      <MoodSelector />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Geliştiriciler</Text>
        <Pressable onPress={handleReset} style={styles.resetButton} testID="reset-button">
          <RotateCcw size={14} color={Colors.textMuted} />
          <Text style={styles.resetText}>Sıfırla</Text>
        </Pressable>
      </View>
    </View>
  ), [handleReset]);

  const renderItem = useCallback(({ item }: { item: Developer }) => (
    <DeveloperCard developer={item} />
  ), []);

  const keyExtractor = useCallback((item: Developer) => item.id, []);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={developers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="developer-list"
      />
      <AchievementToast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassStroke,
  },
  resetText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600' as const,
  },
});
