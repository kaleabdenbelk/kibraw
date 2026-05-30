import * as React from 'react';

const ItemContext = React.createContext({ isExpanded: false });

export const useItemContext = () => React.useContext(ItemContext);

export const Root = React.forwardRef(({ children, type, collapsible, defaultValue, className, ...props }: any, ref) => {
  const [activeItems, setActiveItems] = React.useState<string[]>(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );

  const toggleItem = (value: string) => {
    setActiveItems((prev) => {
      if (prev.includes(value)) {
        return collapsible ? [] : prev;
      }
      return type === 'single' ? [value] : [...prev, value];
    });
  };

  return (
    <div ref={ref} className={className} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          activeItems,
          toggleItem,
        } as any);
      })}
    </div>
  );
});
Root.displayName = 'AccordionPrimitive.Root';

export const Item = React.forwardRef(({ children, value, activeItems, toggleItem, className, ...props }: any, ref) => {
  const isExpanded = activeItems?.includes(value) || false;

  return (
    <ItemContext.Provider value={{ isExpanded }}>
      <div
        ref={ref}
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          ...props.style
        }}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child, {
            isExpanded,
            toggleItem: () => toggleItem(value),
          } as any);
        })}
      </div>
    </ItemContext.Provider>
  );
});
Item.displayName = 'AccordionPrimitive.Item';

export const Header = React.forwardRef(({ children, className, ...props }: any, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
});
Header.displayName = 'AccordionPrimitive.Header';

export const Trigger = React.forwardRef(({ children, toggleItem, className, ...props }: any, ref) => {
  return (
    <button
      ref={ref}
      onClick={toggleItem}
      className={className}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        outline: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        ...props.style
      }}
      {...props}
    >
      {children}
    </button>
  );
});
Trigger.displayName = 'AccordionPrimitive.Trigger';

export const Content = React.forwardRef(({ children, isExpanded, className, ...props }: any, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: isExpanded ? 'block' : 'none',
        overflow: 'hidden',
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
});
Content.displayName = 'AccordionPrimitive.Content';
