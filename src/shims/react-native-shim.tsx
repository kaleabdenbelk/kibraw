import * as React from 'react';

export const View = React.forwardRef(({ className, style, ...props }: any, ref) => {
  return <div ref={ref} className={className} style={style} {...props} />;
});
View.displayName = 'View';

export const Text = React.forwardRef(({ className, style, ...props }: any, ref) => {
  return <span ref={ref} className={className} style={style} {...props} />;
});
Text.displayName = 'Text';
