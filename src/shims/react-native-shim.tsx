import * as React from 'react';

export const View = React.forwardRef<any, any>(({ className, style, ...props }: any, ref) => {
  return <div ref={ref} className={className} style={style} {...props} />;
});
View.displayName = 'View';

export const Text = React.forwardRef<any, any>(({ className, style, ...props }: any, ref) => {
  return <span ref={ref} className={className} style={style} {...props} />;
});
Text.displayName = 'Text';

export const TextInput = React.forwardRef<any, any>(({ className, style, onChangeText, multiline, numberOfLines, ...props }: any, ref) => {
  const Comp = multiline ? 'textarea' : 'input';
  return (
    <Comp
      ref={ref}
      className={className}
      style={style}
      onChange={(e: any) => onChangeText?.(e.target.value)}
      {...props}
    />
  );
});
TextInput.displayName = 'TextInput';

export const Pressable = React.forwardRef<any, any>(({ className, style, ...props }: any, ref) => {
  return <button ref={ref} className={className} style={style} {...props} />;
});
Pressable.displayName = 'Pressable';
