import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import useAuthStore from '../store/auth-store'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import ProfileValue from '../components/profile-value'
import LineDivider from '../components/line-divider'
import { MaterialIcons } from '@expo/vector-icons'

const ProfileScreen = () => {
  const { user, signOut } = useAuthStore()

  function renderProfileSection1 () {
    return (
      <View style={styles.profileSectionContainer}>
        {/*Email*/}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 80
          }}
        >
          {/*Icon*/}
          <MaterialIcons
            name='email'
            size={24}
            color={COLORS.primaryOrangeHex}
          />

          {/*Label and Value*/}
          <View style={{ flex: 1, marginLeft: SPACING.space_8 }}>
            <Text style={{ fontFamily: FONTFAMILY.poppins_medium, opacity: 1 }}>
              Email
            </Text>

            <Text
              style={{ fontFamily: FONTFAMILY.poppins_medium, opacity: 0.5 }}
            >
              {user?.email}
            </Text>
          </View>
        </View>
        <LineDivider />

        <ProfileValue
          onPress={signOut}
          value='Sign Out'
          valueStyles={{ color: COLORS.primaryRedHex }}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 16 }}
      >
        <Text
          style={{
            marginLeft: SPACING.space_16,
            fontFamily: FONTFAMILY.poppins_semibold,
            fontSize: FONTSIZE.size_18
          }}
        >
          User Info
        </Text>
        {/*Profile Section 1*/}
        {renderProfileSection1()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginBottom: SPACING.space_16,
    paddingHorizontal: SPACING.space_16
  }
})

export default ProfileScreen
