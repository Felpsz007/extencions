document.addEventListener('DOMContentLoaded', () => {
    // Carregar sugestões de treino
    chrome.storage.local.get(['trainingSuggestions', 'stats'], data => {
        const suggestionsList = document.querySelector('.suggestions-list');
        const progressBar = document.querySelector('.progress');
        suggestionsList.innerHTML = '';

        if (data.trainingSuggestions && data.trainingSuggestions.length > 0) {
            data.trainingSuggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'suggestion';
                item.textContent = suggestion;
                suggestionsList.appendChild(item);
            });
        } else {
            suggestionsList.textContent = "Nenhuma sugestão disponível.";
        }

        // Atualizar progresso
        const completed = data.stats?.completed || 0;
        const total = data.trainingSuggestions?.length || 1;
        const progressPercentage = Math.min((completed / total) * 100, 100);
        progressBar.style.width = `${progressPercentage}%`;
    });
});
