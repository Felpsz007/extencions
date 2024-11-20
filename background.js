chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ trainingSuggestions: [], stats: {} });
});

// Função para buscar dados do Lichess
async function fetchLichessData(username) {
    try {
        const response = await fetch(`https://lichess.org/api/games/user/${username}`, {
            headers: { 'Accept': 'application/x-ndjson' }
        });
        const data = await response.text();
        const games = data.split('\n').filter(Boolean).map(line => JSON.parse(line));

        const suggestions = [];
        games.forEach(game => {
            if (game.moves.length > 40) {
                suggestions.push(`Pratique finais do seu jogo contra ${game.opponent.name}.`);
            }
            if (game.moves.slice(0, 6).includes("e4")) {
                suggestions.push("Reveja aberturas contra 1.e4.");
            }
        });

        chrome.storage.local.set({ trainingSuggestions: suggestions });
    } catch (error) {
        console.error("Erro ao buscar dados do Lichess:", error);
    }
}

// Exemplo de coleta automática para um usuário fixo (substitua pelo seu username no Lichess)
fetchLichessData("exemplo_user");
