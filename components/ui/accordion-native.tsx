import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface AccordionContextValue {
  expandedItem: string | null;
  setExpandedItem: (value: string | null) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

interface AccordionProps {
  children: React.ReactNode;
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
}

interface AccordionContentProps {
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ expandedItem, setExpandedItem }}>
      <View style={styles.container}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ 
  children, 
  value 
}) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within an Accordion');
  
  const isExpanded = context.expandedItem === value;
  const onPress = () => {
    context.setExpandedItem(isExpanded ? null : value);
  };

  return (
    <View style={styles.item}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === AccordionTrigger) {
            return React.cloneElement(child, { 
              onPress,
              isExpanded,
            } as any);
          }
          if (child.type === AccordionContent) {
            return React.cloneElement(child, { 
              isExpanded,
            } as any);
          }
        }
        return child;
      })}
    </View>
  );
};

export const AccordionTrigger: React.FC<AccordionTriggerProps & { 
  onPress?: () => void;
  isExpanded?: boolean;
}> = ({ 
  children, 
  onPress,
  isExpanded 
}) => {
  const rotateAnimation = React.useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity 
      style={styles.trigger}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.triggerContent}>
        {children}
      </View>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <ChevronDown size={20} color="#6b7280" />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const AccordionContent: React.FC<AccordionContentProps & {
  isExpanded?: boolean;
}> = ({ 
  children,
  isExpanded 
}) => {
  const heightAnimation = React.useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = React.useState(isExpanded);

  React.useEffect(() => {
    if (isExpanded) {
      setShouldRender(true);
    }

    Animated.timing(heightAnimation, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (!isExpanded) {
        setShouldRender(false);
      }
    });
  }, [isExpanded]);

  if (!shouldRender) return null;

  return (
    <Animated.View
      style={[
        styles.content,
        {
          opacity: heightAnimation,
          transform: [{
            translateY: heightAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  triggerContent: {
    flex: 1,
  },
  content: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
});