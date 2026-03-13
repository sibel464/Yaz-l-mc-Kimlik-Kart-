import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { Zap, Briefcase, TrendingUp, PlayCircle, CheckCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { useGame } from '@/providers/GameProvider';
import type { Developer } from '@/mocks/developers';

interface DeveloperCardProps {
  developer: Developer;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  const { state, hireDeveloper, assignTask } = useGame();
  const hiredData = state.hiredDevs[developer.id] ?? null;
  const isHired = !!hiredData;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const emojiAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(isHired ? 1 : 0)).current;
  const buttonPressAnim = useRef(new Animated.Value(1)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;

  const currentLevel = hiredData?.currentLevel ?? developer.level;
  const points = hiredData?.points ?? 0;
  const mood = hiredData?.mood ?? '🙂';
  const tasksCompleted = hiredData?.tasksCompleted ?? 0;

  const getLevelTitle = useCallback((lvl: number): string => {
    if (lvl <= 1) return 'Junior';
    if (lvl <= 2) return 'Mid-Level';
    if (lvl <= 3) return 'Senior';
    if (lvl <= 4) return 'Lead';
    return 'Principal';
  }, []);

  const levelProgress = Math.min(currentLevel / 5, 1);

  const triggerHireAnimation = useCallback(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.04, useNativeDriver: true, friction: 3 }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
    ]).start();

    Animated.sequence([
      Animated.timing(emojiAnim, { toValue: 0.3, duration: 120, useNativeDriver: true }),
      Animated.spring(emojiAnim, { toValue: 1, useNativeDriver: true, friction: 3, tension: 120 }),
    ]).start();

    Animated.timing(bgAnim, { toValue: 1, duration: 400, useNativeDriver: false }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(shineAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
      { iterations: 2 }
    ).start();
  }, [scaleAnim, emojiAnim, bgAnim, shineAnim]);

  const handleHire = useCallback(() => {
    if (isHired) return;
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    hireDeveloper(developer.id);
    triggerHireAnimation();
  }, [isHired, hireDeveloper, developer.id, triggerHireAnimation]);

  const handleAssignTask = useCallback(() => {
    if (!isHired) return;
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    assignTask(developer.id);

    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.02, useNativeDriver: true, friction: 4 }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
    ]).start();

    Animated.sequence([
      Animated.timing(emojiAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.spring(emojiAnim, { toValue: 1, useNativeDriver: true, friction: 4 }),
    ]).start();
  }, [isHired, assignTask, developer.id, scaleAnim, emojiAnim]);

  const handleButtonPressIn = useCallback(() => {
    Animated.spring(buttonPressAnim, { toValue: 0.93, useNativeDriver: true, friction: 5 }).start();
  }, [buttonPressAnim]);

  const handleButtonPressOut = useCallback(() => {
    Animated.spring(buttonPressAnim, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  }, [buttonPressAnim]);

  const cardBgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.cardDefault, Colors.cardHired],
  });

  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border, developer.accentColor + '40'],
  });

  const shineOpacity = shineAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.15, 0],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ scale: scaleAnim }],
          backgroundColor: cardBgColor,
          borderColor: borderColor,
        },
      ]}
      testID="developer-card"
    >
      <View style={[styles.accentStripe, { backgroundColor: developer.accentColor }]} />

      <Animated.View
        style={[styles.shineOverlay, { opacity: shineOpacity }]}
        pointerEvents="none"
      />

      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Animated.View
            style={[
              styles.avatarContainer,
              {
                transform: [{ scale: emojiAnim }],
                borderColor: developer.accentColor + '50',
                backgroundColor: developer.accentColor + '12',
              },
            ]}
          >
            <Text style={styles.avatarEmoji}>{mood}</Text>
          </Animated.View>

          <View style={styles.headerInfo}>
            <Text style={styles.name} numberOfLines={1}>{developer.name}</Text>
            <View style={styles.skillRow}>
              <Briefcase size={12} color={Colors.textSecondary} />
              <Text style={styles.skill}>{developer.skill}</Text>
            </View>
            {developer.bio ? (
              <Text style={styles.bio} numberOfLines={1}>{developer.bio}</Text>
            ) : null}
          </View>

          <View style={[styles.pointsBadge, { backgroundColor: developer.accentColor + '15' }]}>
            <Zap size={12} color={developer.accentColor} />
            <Text style={[styles.pointsText, { color: developer.accentColor }]}>{points}</Text>
          </View>
        </View>

        <View style={styles.skillTagsRow}>
          {developer.skills.slice(0, 3).map((s) => (
            <View key={s} style={[styles.skillTag, { borderColor: developer.accentColor + '30' }]}>
              <Text style={[styles.skillTagText, { color: developer.accentColor }]}>{s}</Text>
            </View>
          ))}
          {developer.skills.length > 3 ? (
            <View style={[styles.skillTag, { borderColor: Colors.textMuted + '50' }]}>
              <Text style={[styles.skillTagText, { color: Colors.textMuted }]}>
                +{developer.skills.length - 3}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.levelSection}>
          <View style={styles.levelHeader}>
            <View style={styles.levelLeft}>
              <TrendingUp size={13} color={Colors.textSecondary} />
              <Text style={styles.levelLabel}>Lv.{currentLevel}</Text>
              <View style={[styles.levelTitleBadge, { backgroundColor: developer.accentColor + '15' }]}>
                <Text style={[styles.levelTitleText, { color: developer.accentColor }]}>
                  {getLevelTitle(currentLevel)}
                </Text>
              </View>
            </View>
            {isHired ? (
              <View style={styles.tasksInfo}>
                <CheckCircle size={11} color={Colors.success} />
                <Text style={styles.tasksText}>{tasksCompleted} görev</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${levelProgress * 100}%`,
                  backgroundColor: developer.accentColor,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.buttonsRow}>
          <Animated.View style={[styles.mainButtonWrapper, { transform: [{ scale: buttonPressAnim }] }]}>
            <Pressable
              style={[
                styles.hireButton,
                isHired
                  ? styles.hireButtonDisabled
                  : { backgroundColor: developer.accentColor },
              ]}
              onPress={handleHire}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
              disabled={isHired}
              testID="hire-button"
            >
              <Text
                style={[
                  styles.hireButtonText,
                  isHired && styles.hireButtonTextDisabled,
                ]}
              >
                {isHired ? 'Projelerde Çalışıyor ✓' : 'İşe Al'}
              </Text>
            </Pressable>
          </Animated.View>

          {isHired ? (
            <Pressable
              style={[styles.taskButton, { borderColor: developer.accentColor + '50' }]}
              onPress={handleAssignTask}
              testID="task-button"
            >
              <PlayCircle size={16} color={developer.accentColor} />
              <Text style={[styles.taskButtonText, { color: developer.accentColor }]}>Görev</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  accentStripe: {
    height: 3,
    width: '100%',
  },
  shineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    marginBottom: 2,
    letterSpacing: 0.1,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skill: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  bio: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 3,
  },
  pointsText: {
    fontSize: 13,
    fontWeight: '700' as const,
  },
  skillTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  skillTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  skillTagText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  levelSection: {
    marginBottom: 14,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  levelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  levelLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600' as const,
  },
  levelTitleBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
  },
  levelTitleText: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
  },
  tasksInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  tasksText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mainButtonWrapper: {
    flex: 1,
  },
  hireButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hireButtonDisabled: {
    backgroundColor: Colors.buttonDisabled,
  },
  hireButtonText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#0A1628',
    letterSpacing: 0.2,
  },
  hireButtonTextDisabled: {
    color: Colors.textSecondary,
  },
  taskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
  },
  taskButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
});

export default React.memo(DeveloperCard);
