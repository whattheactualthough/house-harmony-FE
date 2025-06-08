import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import HapticFeedback from 'react-native-haptic-feedback';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('window').width;

export default function TaskCompleteSlider({ onComplete }) {
  const [completed, setCompleted] = useState(false);
  const dragX = useSharedValue(0);

  const maxSlide = screenWidth * 0.8 - 50;

  const handleDrag = (event) => {
    if (completed) return;
    let x = event.nativeEvent.translationX;
    if (x < 0) x = 0;
    if (x > maxSlide) x = maxSlide;
    dragX.value = x;
  };

  const handleRelease = () => {
    if (dragX.value > maxSlide * 0.9) {
      dragX.value = withTiming(maxSlide);
      runOnJS(completeTask)();
    } else {
      dragX.value = withTiming(0);
    }
  };

  const completeTask = () => {
    if (!completed) {
      setCompleted(true);
      HapticFeedback.trigger('impactLight');
      if (onComplete) onComplete();
    }
  };

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dragX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={[styles.track, completed && styles.trackComplete]}>
        {!completed && (
          <Text style={styles.label}>Slide to Complete</Text>
        )}
        {completed && (
          <Icon name="check" size={28} color="#fff" />
        )}
        <PanGestureHandler onGestureEvent={handleDrag} onEnded={handleRelease}>
          <Animated.View style={[styles.thumb, thumbStyle]}>
            <Icon
              name={completed ? 'check' : 'chevron-right'}
              size={24}
              color="#fff"
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  track: {
    width: screenWidth * 0.8,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  trackComplete: {
    backgroundColor: '#34C759',
  },
  label: {
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
  },
  thumb: {
    width: 50,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    position: 'absolute',
    top: 5,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});