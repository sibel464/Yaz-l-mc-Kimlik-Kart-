import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Colors from '@/constants/colors';
import { useGame } from '@/providers/GameProvider';

const AchievementToast: React.FC = () => {
  const { recentUnlock } = useGame();
  const slideAnim = useRef(new Animated.Value(-120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (recentUnlock) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, friction: 6, tension: 80 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(slideAnim, { toValue: -120, duration: 300, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [recentUnlock, slideAnim, opacityAnim]);

  if (!recentUnlock) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          borderLeftColor: recentUnlock.color,
        },
      ]}
      pointerEvents="none"
    >
      <Text style={styles.toastIcon}>{recentUnlock.icon}</Text>
      <View style={styles.toastContent}>
        <Text style={styles.toastLabel}>Başarım Açıldı!</Text>
        <Text style={styles.toastTitle}>{recentUnlock.title}</Text>
        <Text style={styles.toastDesc}>{recentUnlock.description}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: Colors.cardElevated,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 100,
    borderWidth: 1,
    borderColor: Colors.glassStroke,
  },
  toastIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  toastContent: {
    flex: 1,
  },
  toastLabel: {
    fontSize: 10,
    color: Colors.accent,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    marginBottom: 2,
  },
  toastTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  toastDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default React.memo(AchievementToast);
