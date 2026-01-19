# Frontend

1. Abrir o terminal e tipar:

```bash
npx create-expo-app frontend 
cd frontend
npm run reset-project
```

Obs. Confirmar com Y

2. Navegar em `cd frontend`

3. Alterar o `tsconfig.json` para comportar os componentes

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": false,
    "jsx": "react-native",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

3.2. Alterar `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1e40af',
        },
      },
    },
  },
  plugins: [],
}
```

4. Criar os componentes

4.1. `components/styles.tsx`

```tsx
import { StyleSheet } from "react-native";

export const Colors = {
    primary: "#2563eb",
    white: "#ffffff",
    background: "#f3f4f6",
    titleColor: "#111827",
    buttonColor: "#841584",
    buttonColorDisabled: "#b57cb5",
    errorBg: "#fef2f2",
    errorText: "#b91c1c",
    textMain: "#1e293b",
    textSub: "#64748b",
};

export const Styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: Colors.background,
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },
    text: {
        fontSize: 16,
        padding: 16,
    },
    title: {
        fontSize: 28,          
        fontWeight: '800',     
        color: Colors.titleColor,      
        marginBottom: 16,      
        letterSpacing: -0.5,   
    },
    button: {
        backgroundColor: Colors.buttonColor, 
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: Colors.buttonColorDisabled, 
    },
    buttonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    loadingContainer: {
        marginTop: 32,
        alignItems: 'center',
        padding: 32,
        backgroundColor: Colors.white,
        borderRadius: 24,
        // Sombra leve
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconCircle: {
        backgroundColor: '#dbeafe', // blue-100
        padding: 16,
        borderRadius: 99,
        marginBottom: 16,
    },
    loadingTitle: {
        color: Colors.textMain,
        fontWeight: '600',
        fontSize: 16,
    },
    loadingSubtitle: {
        color: Colors.textSub,
        fontSize: 14,
        marginTop: 4,
    },
    errorContainer: {
        marginTop: 24,
        backgroundColor: Colors.errorBg,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fecaca',
    },
    errorTitle: {
        color: Colors.errorText,
        fontWeight: 'bold',
        fontSize: 18,
    }
});

```

4.2. `components/preferences.tsx`

```tsx
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { Styles } from "./styles";

interface PreferencesInputProps {
    preferences: string;
    setPreferences: (text: string) => void;
    onSubmit: () => void;
    loading?: boolean;
}

export default function PreferencesInput({
    preferences,
    setPreferences,
    onSubmit,
    loading = false
}: PreferencesInputProps) {
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>
                O que você está procurando?
            </Text>

            <TextInput
                placeholder="Ex: filmes de ação, livros de ficção, músicas relaxantes..."
                value={preferences}
                onChangeText={setPreferences}
                className="border border-gray-300 rounded-lg p-4 mb-4 bg-white text-gray-800"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                editable={!loading}
            />

            <TouchableOpacity
                onPress={onSubmit}
                disabled={loading}
                activeOpacity={0.8}
                style={[Styles.button, loading && Styles.buttonDisabled]}
            >
                <Text style={Styles.buttonText}>
                    {loading ? "Gerando..." : "Gerar Recomendações"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
```

4.3. `components/recommendations.tsx`

```tsx
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
```

4.4. `services/api.tsx`

```tsx
export async function getRecommendations(preferences) {
  try {
    const res = await fetch("http://127.0.0.1:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preferences }),
    });
    const data = await res.json();
    return data.recommendations;
  } catch (error) {
    return "Erro ao conectar com a API";
  }
}
```

5. Refatorar o `_layout.tsx`

```tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// Importando seus estilos e cores globais
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
```

6. Refatorar `index.tsx` e testar

```tsx
import React, { useState } from "react";
import { 
  ScrollView, 
  View, 
  ActivityIndicator, 
  Text, 
  Alert, 
  StatusBar,
  SafeAreaView
} from "react-native";
import PreferencesInput from "@/components/preferences";
import Recommendations from "@/components/recommendations";
import { getRecommendations } from "@/services/api";
import { Colors, Styles } from "@/components/styles";

export default function App() {
  const [preferences, setPreferences] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!preferences.trim()) {
      Alert.alert("Atenção", "Por favor, digite suas preferências!");
      return;
    }

    setLoading(true);
    setError("");
    setRecommendations("");

    try {
      const result = await getRecommendations(preferences);
      setRecommendations(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao buscar recomendações";
      setError(errorMessage);
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <ScrollView>
        <View style={Styles.scrollContent}>
          <PreferencesInput
            preferences={preferences}
            setPreferences={setPreferences}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {loading && (
            <View style={Styles.loadingContainer}>
              <View style={Styles.iconCircle}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
              <Text style={Styles.loadingTitle}>Gerando recomendações...</Text>
              <Text style={Styles.loadingSubtitle}>Isso pode levar alguns segundos</Text>
            </View>
          )}

          {error && !loading && (
            <View style={Styles.errorContainer}>
              <Text style={Styles.errorTitle}>⚠️ Ops!</Text>
              <Text style={{ color: Colors.errorText, marginTop: 4 }}>{error}</Text>
            </View>
          )}

          {recommendations && !loading && (
            <Recommendations recommendations={recommendations} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

7. De volta ao Terminal, executar o server Expo

```bash
npx expo-start
```

Obs. Você consegue testar dentro de seu celular, através de um QRCode gerado pelo Expo. Precisa baixar aplicativo no PlayStore ou AppStore.
