import { Text, TextInput, TouchableOpacity, View } from "react-native";
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
                style={Styles.text}
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