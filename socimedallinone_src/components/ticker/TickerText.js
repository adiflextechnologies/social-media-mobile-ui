import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextTicker from 'react-native-text-ticker'

const TickerText = ({children, style}) => {
  return (
    <View>
      <TextTicker
          style={[{ fontSize: 18 }, style]}
          duration={10000}
          loop
          // bounce
          repeatSpacer={50}
          // marqueeDelay={100}
        >
          {children}
        </TextTicker>
    </View>
  )
}

export default TickerText

const styles = StyleSheet.create({})