import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Award, Lock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/providers/GameProvider';
import achievements from '@/mocks/achievements';
import type { Achievement } from '@/mocks/achievements';

const AchievementCard: React.FC<{ achievement: Achievement; unlocked: boolean; index: number }> = React.memo(
  ({ achievement, unlocked, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          delay: index * 60,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          delay: index * 60,
          useNativeDriver: true,
          friction: 6,
        }),
      ]).start();
    }, [fadeAnim, scaleAnim, index]);

    return (
      <Animated.View
        style={[
          styles.achCard,
          unlocked && { borderColor: achievement.color + '40' },
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View
          style={[
            styles.achIconBox,
            {
              backgroundColor: unlocked ? achievement.color + '18' : Colors.glassBg,
              borderColor: unlocked ? achievement.color + '30' : Colors.glassStroke,
            },
          ]}
        >
          {unlocked ? (
            <Text style={styles.achEmoji}>{achievement.icon}</Text>
          ) : (
            <Lock size={20} color={Colors.textMuted} />
          )}
        </View>

        <View style={styles.achInfo}>
          <Text style={[styles.achTitle, !unlocked && styles.achTitleLocked]}>
            {achievement.title}
          </Text>
          <Text style={styles.achDesc}>{achievement.description}</Text>
        </View>

        {unlocked ? (
          <View style={[styles.unlockedBadge, { backgroundColor: achievement.color + '18' }]}>
            <Text style={[styles.unlockedText, { color: achievement.color }]}>✓</Text>
          </View>
        ) : (
          <View style={styles.lockedBadge}>
            <Text style={styles.lockedText}>🔒</Text>
          </View>
        )}
      </Animated.View>
    );
  }
);

export default function AchievementsScreen() {
  const insets = useSafeAreaInsets();
  const { unlockedAchievementsList } = useGame();

  const unlockedIds = new Set(unlockedAchievementsList.map((a) => a.id));
  const sortedAchievements = [
    ...achievements.filter((a) => unlockedIds.has(a.id)),
    ...achievements.filter((a) => !unlockedIds.has(a.id)),
  ];

  const progress = unlockedAchievementsList.length / achievements.length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Award size={24} color={Colors.accentPink} />
          <Text style={styles.headerTitle}>Başarımlar</Text>
        </View>
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>
            {unlockedAchievementsList.length}/{achievements.length}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {Math.round(progress * 100)}% tamamlandı
        </Text>
      </View>

      <FlatList
        data={sortedAchievements}
        renderItem={({ item, index }) => (
          <AchievementCard
            achievement={item}
            unlocked={unlockedIds.has(item.id)}
            index={index}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="achievements-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  progressBadge: {
    backgroundColor: Colors.glassBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.glassStroke,
  },
  progressText: {
    fontSize: 14,
    color: Colors.accentPink,
    fontWeight: '700' as const,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.accentPink,
  },
  progressLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600' as const,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  achCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardDefault,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  achIconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  achEmoji: {
    fontSize: 24,
  },
  achInfo: {
    flex: 1,
    marginLeft: 14,
  },
  achTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  achTitleLocked: {
    color: Colors.textMuted,
  },
  achDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  unlockedBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unlockedText: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
  lockedBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: Colors.glassBg,
  },
  lockedText: {
    fontSize: 14,
  },
});
