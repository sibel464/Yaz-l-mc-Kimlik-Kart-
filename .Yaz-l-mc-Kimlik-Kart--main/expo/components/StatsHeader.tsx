import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Zap, Users, TrendingUp, Flame } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/providers/GameProvider';

const StatsHeader: React.FC = () => {
  const { state, hiredCount, teamLevel, levelProgress } = useGame();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: levelProgress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [levelProgress, progressAnim]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.greeting}>Developer Hub</Text>
          <Text style={styles.subtitle}>Takımını kur, projeleri yönet</Text>
        </View>
        <Animated.View style={[styles.moodBubble, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.moodEmoji}>{state.teamMood}</Text>
        </Animated.View>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: 'rgba(0, 217, 166, 0.08)' }]}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(0, 217, 166, 0.15)' }]}>
            <Zap size={16} color={Colors.accent} />
          </View>
          <Text style={[styles.statValue, { color: Colors.accent }]}>{state.totalPoints}</Text>
          <Text style={styles.statLabel}>Puan</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)' }]}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
            <Users size={16} color={Colors.accentBlue} />
          </View>
          <Text style={[styles.statValue, { color: Colors.accentBlue }]}>{hiredCount}</Text>
          <Text style={styles.statLabel}>Takım</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: 'rgba(245, 158, 11, 0.08)' }]}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
            <TrendingUp size={16} color={Colors.accentOrange} />
          </View>
          <Text style={[styles.statValue, { color: Colors.accentOrange }]}>Lv.{teamLevel}</Text>
          <Text style={styles.statLabel}>Seviye</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: 'rgba(236, 72, 153, 0.08)' }]}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(236, 72, 153, 0.15)' }]}>
            <Flame size={16} color={Colors.accentPink} />
          </View>
          <Text style={[styles.statValue, { color: Colors.accentPink }]}>{state.streak}x</Text>
          <Text style={styles.statLabel}>Seri</Text>
        </View>
      </View>

      <View style={styles.levelBarContainer}>
        <View style={styles.levelBarHeader}>
          <Text style={styles.levelBarLabel}>Takım Seviyesi {teamLevel}</Text>
          <Text style={styles.levelBarPercent}>{Math.round(levelProgress * 100)}%</Text>
        </View>
        <View style={styles.levelBarBg}>
          <Animated.View style={[styles.levelBarFill, { width: progressWidth }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  moodBubble: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassStroke,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 26,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.glassStroke,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800' as const,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  levelBarContainer: {
    backgroundColor: Colors.glassBg,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.glassStroke,
  },
  levelBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelBarLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600' as const,
  },
  levelBarPercent: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '700' as const,
  },
  levelBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  levelBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
});

export default React.memo(StatsHeader);
