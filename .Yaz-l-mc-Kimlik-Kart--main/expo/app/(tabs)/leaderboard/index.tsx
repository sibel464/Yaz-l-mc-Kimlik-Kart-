import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trophy, Medal, TrendingUp, Zap } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/providers/GameProvider';

interface LeaderboardEntry {
  id: string;
  name: string;
  skill: string;
  avatar: string;
  accentColor: string;
  hired: boolean;
  totalPoints: number;
  hiredData: {
    currentLevel: number;
    tasksCompleted: number;
    mood: string;
  } | null;
}

const RankBadge: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 1) return <Text style={styles.crownEmoji}>🥇</Text>;
  if (rank === 2) return <Text style={styles.crownEmoji}>🥈</Text>;
  if (rank === 3) return <Text style={styles.crownEmoji}>🥉</Text>;
  return (
    <View style={styles.rankCircle}>
      <Text style={styles.rankNumber}>{rank}</Text>
    </View>
  );
};

const LeaderboardItem: React.FC<{ entry: LeaderboardEntry; index: number }> = React.memo(({ entry, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  const isTop3 = index < 3;

  return (
    <Animated.View
      style={[
        styles.itemCard,
        isTop3 && { borderColor: entry.accentColor + '30', borderWidth: 1 },
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <RankBadge rank={index + 1} />

      <View style={[styles.avatarBox, { backgroundColor: entry.accentColor + '15', borderColor: entry.accentColor + '30' }]}>
        <Text style={styles.avatarEmoji}>{entry.hiredData?.mood ?? entry.avatar}</Text>
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{entry.name}</Text>
        <Text style={styles.itemSkill} numberOfLines={1}>{entry.skill}</Text>
        {entry.hiredData ? (
          <View style={styles.itemMeta}>
            <View style={styles.metaBadge}>
              <TrendingUp size={10} color={Colors.textSecondary} />
              <Text style={styles.metaText}>Lv.{entry.hiredData.currentLevel}</Text>
            </View>
            <View style={styles.metaBadge}>
              <Medal size={10} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{entry.hiredData.tasksCompleted} görev</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.notHiredText}>Henüz işe alınmadı</Text>
        )}
      </View>

      <View style={[styles.pointsBox, { backgroundColor: entry.accentColor + '12' }]}>
        <Zap size={12} color={entry.accentColor} />
        <Text style={[styles.pointsValue, { color: entry.accentColor }]}>{entry.totalPoints}</Text>
      </View>
    </Animated.View>
  );
});

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { leaderboard, state } = useGame();

  const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => (
    <LeaderboardItem entry={item as LeaderboardEntry} index={index} />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Trophy size={24} color={Colors.accentOrange} />
          <Text style={styles.headerTitle}>Sıralama</Text>
        </View>
        <View style={styles.totalBadge}>
          <Zap size={14} color={Colors.accent} />
          <Text style={styles.totalText}>{state.totalPoints} puan</Text>
        </View>
      </View>

      <FlatList
        data={leaderboard}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="leaderboard-list"
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
  totalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.glassBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.glassStroke,
  },
  totalText: {
    fontSize: 13,
    color: Colors.accent,
    fontWeight: '700' as const,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardDefault,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  crownEmoji: {
    fontSize: 22,
    width: 32,
    textAlign: 'center',
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.glassBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.glassStroke,
  },
  rankNumber: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: Colors.textMuted,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    marginBottom: 1,
  },
  itemSkill: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600' as const,
  },
  notHiredText: {
    fontSize: 10,
    color: Colors.textMuted,
    fontStyle: 'italic' as const,
  },
  pointsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 8,
  },
  pointsValue: {
    fontSize: 14,
    fontWeight: '800' as const,
  },
});
