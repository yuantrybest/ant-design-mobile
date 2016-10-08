import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import variables from '../style/themes/default';
import tsProps from './PropsType';

export default class Button extends React.Component<tsProps, any> {
  static defaultProps = {
    pressIn: false,
    size: 'large',
    disabled: false,
    inline: false,
    loading: false,
    onClick: (x: any) => {},
  };
  mTextColor: string;
  mBorderColor: string;
  mTextHighlightColor: string;
  mBorderHighlightColor: string;
  constructor(props) {
    super(props);
    this.state = {
      pressIn: false,
    };
  }

  pressTextColor() {
    if (this.state.pressIn) {
      return { color: this.mTextHighlightColor };
    }

    return { color: this.mTextColor };
  }

  pressBorderColor() {
    if (this.state.pressIn && this.mBorderHighlightColor) {
      return { borderColor: this.mBorderHighlightColor };
    }

    return {borderColor: this.mBorderColor};
  }

  onPressIn = (...args) => {
    this.setState({ pressIn: true });
  };

  onPressOut = (...args) => {
    this.setState({ pressIn: false });
  };

  render() {
    const { size, type, disabled } = this.props;

    let height;
    let fontSize;
    let paddingLeft;
    let paddingRight;
    let backgroundColor;
    let textColor;
    let borderColor;

    let highlightBackgroundColor;
    let highlightTextColor;
    let highlightBorderColor;

    switch (size) {
      case 'large':
        height = variables.button_height;
        fontSize = variables.button_font_size;
        paddingLeft = paddingRight = variables.h_spacing_sm;
        break;
      case 'small':
        height = variables.button_height_sm;
        fontSize = variables.button_font_size_sm;
        paddingLeft = paddingRight = variables.h_spacing_sm;
        break;
      default:
        break;
    }

    if (type === 'primary') {
      textColor = variables.color_text_base_inverse;
      backgroundColor = variables.primary_button_fill;
      borderColor = variables.primary_button_fill;

      highlightTextColor = variables.color_text_base_inverse;
      highlightBackgroundColor = variables.primary_button_fill_tap;
      highlightBorderColor = variables.primary_button_fill;
    } else if (type === 'ghost') {
      textColor = variables.ghost_button_color;
      backgroundColor = 'transparent';
      borderColor = variables.ghost_button_color;
      highlightTextColor = variables.color_text_base_inverse;
      highlightBackgroundColor = variables.ghost_button_fill_tap;
      highlightBorderColor = variables.ghost_button_color;
    } else if (type === 'warning') {
      textColor = variables.brand_warning;
      backgroundColor = variables.fill_base;
      borderColor = variables.brand_warning;
      highlightBackgroundColor = variables.brand_warning;
    } else {
      textColor = variables.color_text_base;
      backgroundColor = variables.fill_base;
      borderColor = variables.border_color_base;

      highlightBackgroundColor = variables.fill_tap;
      highlightTextColor = textColor;
    }
    if (disabled) {
      textColor = variables.color_text_disabled;
      backgroundColor = variables.fill_disabled;
      borderColor = variables.fill_disabled;
    }

    let touchableProps: any = {};
    if (!disabled) {
      touchableProps.onPressIn = this.onPressIn;
      touchableProps.onPressOut = this.onPressOut;
    }

    let style = {
      alignItems: 'center',
      height,
      paddingLeft,
      paddingRight,
      backgroundColor,
      borderRadius: variables.radius_md,
      borderWidth: 1,
      borderColor,
      justifyContent: 'center',
    };

    this.mTextColor = textColor;
    this.mBorderColor = borderColor;
    this.mTextHighlightColor = highlightTextColor;
    if (highlightBorderColor) {
      this.mBorderHighlightColor = highlightBorderColor;
    }

    if (disabled) {
      return (<View {...this.props} style={[style, this.pressBorderColor(), this.props.style]}>
        <Text style={[{ fontSize }, this.pressTextColor()]}>
          {this.props.children}
        </Text>
      </View>);
    }

    return (
      <TouchableHighlight
        activeOpacity={1}
        onPress={() => this.props.onClick(this)}
        delayPressOut={1} { ...this.props } { ...touchableProps }
        style={[style, this.pressBorderColor(), this.props.style]}
        underlayColor={highlightBackgroundColor}
      >
        <Text style={[{ fontSize }, this.pressTextColor()]}>
          {this.props.children}
        </Text>
      </TouchableHighlight>
    );
  }
}
