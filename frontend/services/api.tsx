export async function getRecommendations(preferences) {
    try {
        const res = await fetch("http://127.0.0.1:8000/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ preferences }),
        })
    } catch (error) {
        return "Erro ao conectar com a API";
    }

}