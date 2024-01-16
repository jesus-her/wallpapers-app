import { COLORS } from '../theme/theme'
import React from 'react'
import { View } from 'react-native'

const LineDivider = ({ lineStyle }: { lineStyle?: any }) => {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: COLORS.primaryWhiteHex,
        opacity: 0.3,
        ...lineStyle
      }}
    />
  )
}

export default LineDivider
