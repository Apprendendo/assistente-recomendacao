import { View, Text } from "react-native";
import { Styles } from "./styles";

export default function Recommendations({ recommendations }) {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>Recomendações:</Text>
      <Text style={Styles.text}>{recommendations}</Text>
    </View>
  );
}