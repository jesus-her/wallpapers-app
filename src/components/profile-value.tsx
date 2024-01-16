import { COLORS, SPACING } from '../theme/theme'
import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'

const ProfileValue = ({
  value,
  label,
  onPress,
  valueStyles
}: {
  value?: any
  label?: string
  onPress?: () => void
  valueStyles?: any
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 80
      }}
      onPress={onPress}
    >
      {/*Icon*/}

      {/*Label and Value*/}
      <View
        style={{
          backgroundColor: COLORS.primaryRedHex + 30,

          paddingVertical: 6,
          paddingHorizontal: 16,
          borderRadius: 100
        }}
      >
        {label && (
          <Text
            style={{
              color: COLORS.primaryLightGreyHex
            }}
          >
            {label}
          </Text>
        )}
        <Text
          style={{
            color: COLORS.primaryWhiteHex,
            ...valueStyles
          }}
        >
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProfileValue
