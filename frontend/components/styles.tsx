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