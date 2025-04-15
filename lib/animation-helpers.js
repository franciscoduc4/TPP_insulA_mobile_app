// Animation helpers that mimic react-native-reanimated API using React Native's Animated
import { Animated, Easing as RNEasing } from 'react-native';

// Core API
export const useSharedValue = (initialValue) => {
  const animatedValue = new Animated.Value(initialValue);
  return {
    value: initialValue,
    _animatedValue: animatedValue,
    set value(newValue) {
      animatedValue.setValue(newValue);
    },
    get value() {
      return animatedValue.__getValue();
    }
  };
};

export const useAnimatedStyle = (styleCallback) => {
  // This is a simplified version - in real usage you'd need to add dependencies
  return styleCallback();
};

export const withTiming = (toValue, config = {}, callback) => {
  return {
    toValue,
    type: 'timing',
    duration: config.duration || 300,
    easing: config.easing || RNEasing.ease,
    callback
  };
};

export const withSpring = (toValue, config = {}, callback) => {
  return {
    toValue,
    type: 'spring',
    speed: config.speed || 12,
    bounciness: config.bounciness || 8,
    callback
  };
};

export const runOnUI = (fn) => fn;
export const runOnJS = (fn) => fn;

// Simple Animated component creator
export const createAnimatedComponent = (Component) => Animated.createAnimatedComponent(Component);

// Easing functions
export const Easing = {
  linear: RNEasing.linear,
  ease: RNEasing.ease,
  quad: RNEasing.quad,
  cubic: RNEasing.cubic,
  bezier: (...args) => RNEasing.bezier(...args),
  in: (easing) => RNEasing.in(easing),
  out: (easing) => RNEasing.out(easing),
  inOut: (easing) => RNEasing.inOut(easing),
};

// Simplified layout animation helper
export const Layout = {
  duration: (ms) => ({
    // Use React Native's LayoutAnimation in your component when needed
    duration: ms
  })
};

// Export a default object to allow import * as Animated from './animation-helpers'
export default {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnUI,
  runOnJS,
  createAnimatedComponent,
  Easing,
  Layout
};