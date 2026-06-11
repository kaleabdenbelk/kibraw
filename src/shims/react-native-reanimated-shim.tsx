import * as React from 'react';

const AnimatedView = React.forwardRef(({ className, style, entering, exiting, layout, ...props }: any, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        ...style,
      }}
      {...props}
    />
  );
});
AnimatedView.displayName = 'Animated.View';

const Animated = {
  View: AnimatedView,
};

export const FadeIn = 'FadeIn';
export const FadeOut = 'FadeOut';
export const LinearTransition = 'LinearTransition';

export function useSharedValue(initialValue: any) {
  return { value: initialValue };
}

export function withRepeat(animation: any, numberOfReps?: number, reverse?: boolean) {
  return animation;
}

export function withSequence(...animations: any[]) {
  return animations[0];
}

export function useAnimatedStyle(callback: () => any) {
  const styles = callback() || {};
  // Handle transform string conversion if it's in React Native array form
  if (Array.isArray(styles.transform)) {
    const transformStr = styles.transform
      .map((t: any) => {
        const key = Object.keys(t)[0];
        return `${key}(${t[key]})`;
      })
      .join(' ');
    styles.transform = transformStr;
  }
  return styles;
}

export function withTiming(value: any, config?: any) {
  return value;
}

export default Animated;
