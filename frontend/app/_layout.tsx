import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors, Styles } from "@/components/styles";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: Styles.headerTitle,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "🎯 Assistente de Recomendação",
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
}
