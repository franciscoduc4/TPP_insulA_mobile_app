import * as React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"

// Since we can't use className in React Native, we'll adapt the utility
const mergeStyles = (defaultStyle: any, additionalStyle?: any) => {
  if (!additionalStyle) return defaultStyle;
  return { ...defaultStyle, ...additionalStyle };
};

interface CardProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Card = React.forwardRef<View, CardProps>(({ style, ...props }, ref) => (
  <View
    ref={ref}
    style={mergeStyles(styles.card, style)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, CardProps>(({ style, ...props }, ref) => (
  <View
    ref={ref}
    style={mergeStyles(styles.cardHeader, style)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

interface CardTitleProps {
  style?: TextStyle;
  children?: React.ReactNode;
}

const CardTitle = React.forwardRef<Text, CardTitleProps>(({ style, ...props }, ref) => (
  <Text
    ref={ref}
    style={mergeStyles(styles.cardTitle, style)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps {
  style?: TextStyle;
  children?: React.ReactNode;
}

const CardDescription = React.forwardRef<Text, CardDescriptionProps>(({ style, ...props }, ref) => (
  <Text
    ref={ref}
    style={mergeStyles(styles.cardDescription, style)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, CardProps>(({ style, ...props }, ref) => (
  <View ref={ref} style={mergeStyles(styles.cardContent, style)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, CardProps>(({ style, ...props }, ref) => (
  <View
    ref={ref}
    style={mergeStyles(styles.cardFooter, style)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
