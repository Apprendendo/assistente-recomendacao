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

export default function Index() {
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
