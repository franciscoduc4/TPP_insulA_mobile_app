import * as React from "react"
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle, View } from "react-native"

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ children, variant = "default", size = "default", style, textStyle, ...props }, ref) => {
    const buttonStyles = [
      styles.base,
      styles[`variant${variant}`],
      styles[`size${size}`],
      style
    ]

    const textStyles = [
      styles.text,
      styles[`${variant}Text`],
      textStyle
    ]

    return (
      <TouchableOpacity style={buttonStyles} {...props}>
        <Text style={textStyles}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  // Variants
  variantdefault: {
    backgroundColor: '#0284c7', // primary color
    padding: 12,
  },
  defaultText: {
    color: '#ffffff',
  },
  variantdestructive: {
    backgroundColor: '#ef4444',
    padding: 12,
  },
  destructiveText: {
    color: '#ffffff',
  },
  variantoutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
  },
  outlineText: {
    color: '#000000',
  },
  variantsecondary: {
    backgroundColor: '#f3f4f6',
    padding: 12,
  },
  secondaryText: {
    color: '#000000',
  },
  variantghost: {
    backgroundColor: 'transparent',
    padding: 12,
  },
  ghostText: {
    color: '#000000',
  },
  variantlink: {
    backgroundColor: 'transparent',
    padding: 12,
  },
  linkText: {
    color: '#0284c7',
    textDecorationLine: 'underline',
  },
  // Sizes
  sizedefault: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sizesm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sizelg: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  sizeicon: {
    width: 40,
    height: 40,
    padding: 8,
  },
})

Button.displayName = "Button"

export { Button }
export type { ButtonProps }