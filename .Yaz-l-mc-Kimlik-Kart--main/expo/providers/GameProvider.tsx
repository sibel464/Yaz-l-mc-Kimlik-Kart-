import { useState, useCallback, useMemo, useEffect } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from '@tanstack/react-query';
import developers from '@/mocks/developers';
import achievements from '@/mocks/achievements';
import type { Achievement } from '@/mocks/achievements';

export type MoodType = '🙂' | '💻' | '🔥' | '😴' | '🎯' | '🚀';

export interface HiredDeveloper {
  id: string;
  hiredAt: number;
  points: number;
  currentLevel: number;
  mood: MoodType;
  tasksCompleted: number;
}

interface GameState {
  hiredDevs: Record<string, HiredDeveloper>;
  totalPoints: number;
  teamMood: MoodType;
  moodsUsed: MoodType[];
  unlockedAchievements: string[];
  streak: number;
  lastActionTime: number;
}

const STORAGE_KEY = 'developer_game_state';

const defaultState: GameState = {
  hiredDevs: {},
  totalPoints: 0,
  teamMood: '🙂',
  moodsUsed: ['🙂'],
  unlockedAchievements: [],
  streak: 0,
  lastActionTime: 0,
};

export const [GameProvider, useGame] = createContextHook(() => {
  const [state, setState] = useState<GameState>(defaultState);
  const [recentUnlock, setRecentUnlock] = useState<Achievement | null>(null);

  const stateQuery = useQuery({
    queryKey: ['gameState'],
    queryFn: async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored) as GameState;
        }
      } catch (e) {
        console.log('Failed to load game state:', e);
      }
      return defaultState;
    },
  });

  useEffect(() => {
    if (stateQuery.data) {
      setState(stateQuery.data);
    }
  }, [stateQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async (newState: GameState) => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
  });

  const persist = useCallback((newState: GameState) => {
    setState(newState);
    saveMutation.mutate(newState);
  }, [saveMutation]);

  const checkAchievements = useCallback((newState: GameState): string[] => {
    const newUnlocks: string[] = [];
    const hiredCount = Object.keys(newState.hiredDevs).length;
    const teamLevel = Math.floor(newState.totalPoints / 30) + 1;

    for (const ach of achievements) {
      if (newState.unlockedAchievements.includes(ach.id)) continue;

      let unlocked = false;
      if (ach.type === 'hire' && hiredCount >= ach.requirement) unlocked = true;
      if (ach.type === 'points' && newState.totalPoints >= ach.requirement) unlocked = true;
      if (ach.type === 'level' && teamLevel >= ach.requirement) unlocked = true;
      if (ach.type === 'streak' && newState.moodsUsed.length >= ach.requirement) unlocked = true;

      if (unlocked) newUnlocks.push(ach.id);
    }
    return newUnlocks;
  }, []);

  const hireDeveloper = useCallback((devId: string) => {
    setState((prev) => {
      if (prev.hiredDevs[devId]) return prev;

      const dev = developers.find((d) => d.id === devId);
      if (!dev) return prev;

      const now = Date.now();
      const timeDiff = now - prev.lastActionTime;
      const isStreak = timeDiff < 10000 && prev.lastActionTime > 0;

      const basePoints = 10;
      const streakBonus = isStreak ? 5 : 0;
      const pointsEarned = basePoints + streakBonus;

      const newHired: HiredDeveloper = {
        id: devId,
        hiredAt: now,
        points: pointsEarned,
        currentLevel: dev.level,
        mood: '💻',
        tasksCompleted: 0,
      };

      const newState: GameState = {
        ...prev,
        hiredDevs: { ...prev.hiredDevs, [devId]: newHired },
        totalPoints: prev.totalPoints + pointsEarned,
        streak: isStreak ? prev.streak + 1 : 1,
        lastActionTime: now,
      };

      const newUnlocks = checkAchievements(newState);
      if (newUnlocks.length > 0) {
        newState.unlockedAchievements = [...prev.unlockedAchievements, ...newUnlocks];
        const firstUnlock = achievements.find((a) => a.id === newUnlocks[0]);
        if (firstUnlock) {
          setRecentUnlock(firstUnlock);
          setTimeout(() => setRecentUnlock(null), 3000);
        }
      }

      persist(newState);
      return newState;
    });
  }, [persist, checkAchievements]);

  const assignTask = useCallback((devId: string) => {
    setState((prev) => {
      const hired = prev.hiredDevs[devId];
      if (!hired) return prev;

      const pointsEarned = 5;
      const newTasksCompleted = hired.tasksCompleted + 1;
      const shouldLevelUp = newTasksCompleted % 3 === 0;

      const updatedDev: HiredDeveloper = {
        ...hired,
        points: hired.points + pointsEarned,
        tasksCompleted: newTasksCompleted,
        currentLevel: shouldLevelUp ? Math.min(hired.currentLevel + 1, 5) : hired.currentLevel,
        mood: newTasksCompleted >= 5 ? '🔥' : '💻',
      };

      const newState: GameState = {
        ...prev,
        hiredDevs: { ...prev.hiredDevs, [devId]: updatedDev },
        totalPoints: prev.totalPoints + pointsEarned,
        lastActionTime: Date.now(),
      };

      const newUnlocks = checkAchievements(newState);
      if (newUnlocks.length > 0) {
        newState.unlockedAchievements = [...prev.unlockedAchievements, ...newUnlocks];
        const firstUnlock = achievements.find((a) => a.id === newUnlocks[0]);
        if (firstUnlock) {
          setRecentUnlock(firstUnlock);
          setTimeout(() => setRecentUnlock(null), 3000);
        }
      }

      persist(newState);
      return newState;
    });
  }, [persist, checkAchievements]);

  const setTeamMood = useCallback((mood: MoodType) => {
    setState((prev) => {
      const newMoodsUsed = prev.moodsUsed.includes(mood)
        ? prev.moodsUsed
        : [...prev.moodsUsed, mood];

      const newState: GameState = {
        ...prev,
        teamMood: mood,
        moodsUsed: newMoodsUsed,
      };

      const newUnlocks = checkAchievements(newState);
      if (newUnlocks.length > 0) {
        newState.unlockedAchievements = [...prev.unlockedAchievements, ...newUnlocks];
        const firstUnlock = achievements.find((a) => a.id === newUnlocks[0]);
        if (firstUnlock) {
          setRecentUnlock(firstUnlock);
          setTimeout(() => setRecentUnlock(null), 3000);
        }
      }

      persist(newState);
      return newState;
    });
  }, [persist, checkAchievements]);

  const resetGame = useCallback(() => {
    persist(defaultState);
    setRecentUnlock(null);
  }, [persist]);

  const hiredCount = Object.keys(state.hiredDevs).length;
  const teamLevel = Math.floor(state.totalPoints / 30) + 1;
  const levelProgress = (state.totalPoints % 30) / 30;

  const leaderboard = useMemo(() => {
    return developers
      .map((dev) => ({
        ...dev,
        hired: !!state.hiredDevs[dev.id],
        hiredData: state.hiredDevs[dev.id] ?? null,
        totalPoints: state.hiredDevs[dev.id]?.points ?? 0,
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }, [state.hiredDevs]);

  const unlockedAchievementsList = useMemo(() => {
    return achievements.filter((a) => state.unlockedAchievements.includes(a.id));
  }, [state.unlockedAchievements]);

  const lockedAchievementsList = useMemo(() => {
    return achievements.filter((a) => !state.unlockedAchievements.includes(a.id));
  }, [state.unlockedAchievements]);

  return useMemo(() => ({
    state,
    hireDeveloper,
    assignTask,
    setTeamMood,
    resetGame,
    hiredCount,
    teamLevel,
    levelProgress,
    leaderboard,
    unlockedAchievementsList,
    lockedAchievementsList,
    recentUnlock,
    isLoading: stateQuery.isLoading,
  }), [
    state,
    hireDeveloper,
    assignTask,
    setTeamMood,
    resetGame,
    hiredCount,
    teamLevel,
    levelProgress,
    leaderboard,
    unlockedAchievementsList,
    lockedAchievementsList,
    recentUnlock,
    stateQuery.isLoading,
  ]);
});
