import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { useGame } from '@/providers/GameProvider';
import type { MoodType } from '@/providers/GameProvider';

const MOODS: { emoji: MoodType; label: string }[] = [
  { emoji: '🙂', label: 'İyi' },
  { emoji: '💻', label: 'Kodlama' },
  { emoji: '🔥', label: 'Ateşli' },
  { emoji: '😴', label: 'Yorgun' },
  { emoji: '🎯', label: 'Odaklı' },
  { emoji: '🚀', label: 'Hızlı' },
];

const MoodSelector: React.FC = () => {
  const { state, setTeamMood } = useGame();
  const scaleAnims = useRef(MOODS.map(() => new Animated.Value(1))).current;

  const handleSelect = useCallback((mood: MoodType, index: number) => {
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setTeamMood(mood);

    Animated.sequence([
      Animated.spring(scaleAnims[index], { toValue: 1.25, useNativeDriver: true, friction: 3, tension: 200 }),
      Animated.spring(scaleAnims[index], { toValue: 1, useNativeDriver: true, friction: 4 }),
    ]).start();
  }, [setTeamMood, scaleAnims]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Takım Ruh Hali</Text>
      <View style={styles.moodRow}>
        {MOODS.map((m, i) => {
          const isActive = state.teamMood === m.emoji;
          return (
            <Pressable
              key={m.emoji}
              onPress={() => handleSelect(m.emoji, i)}
              testID={`mood-${m.emoji}`}
            >
              <Animated.View
                style={[
                  styles.moodItem,
                  isActive && styles.moodItemActive,
                  { transform: [{ scale: scaleAnims[i] }] },
                ]}
              >
                <Text style={styles.moodEmoji}>{m.emoji}</Text>
                <Text style={[styles.moodLabel, isActive && styles.moodLabelActive]}>
                  {m.label}
                </Text>
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  moodItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassStroke,
    minWidth: 52,
  },
  moodItemActive: {
    backgroundColor: 'rgba(0, 217, 166, 0.12)',
    borderColor: Colors.accent + '50',
  },
  moodEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '600' as const,
  },
  moodLabelActive: {
    color: Colors.accent,
  },
});

export default React.memo(MoodSelector);
