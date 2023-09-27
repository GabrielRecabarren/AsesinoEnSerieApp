import { View, Text } from "react-native"
import LoginForm from "../components/LoginForm/LoginForm"

const LoginScreen = ({navigation}) => {
  return (

    <LoginForm navigation={navigation}></LoginForm>
  )
}

export default LoginScreen