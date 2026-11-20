import { Link } from 'expo-router'
import { Text } from 'react-native'
import Screen from '@/components/screen'


const signUp = () => {
  return (
    <Screen edges={["top", "bottom"]} className="items-center justify-center">
      <Text>signUp</Text>
      <Link href="/auth/signIn">Sign In</Link>
    </Screen>
  )
}

export default signUp