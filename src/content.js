
function hideElements() {
    chrome.storage.local.get(['blockedKeywords'], function (result) {

        const keywords = result.blockedKeywords;
        if (keywords && keywords.length > 0) {
            document.querySelectorAll('article').forEach(article => {
                if (keywords.some(keyword => article.innerText.includes(keyword))) {
                    article.style.display = 'none';
                }
            });

            document.querySelectorAll(".result-item").forEach(div => {
                if (keywords.some(keyword => div.innerText.includes(keyword))) {
                    div.style.display = 'none';
                }
            });

        }
    });
}

// Ejecutar la función inicialmente
hideElements();

// Crear un MutationObserver para observar cambios en el DOM
const observer = new MutationObserver(hideElements);

// Configurar el observer para observar cambios en el cuerpo del documento y sobre los descendientes
observer.observe(document.body, { childList: true, subtree: true })


// Escuchar cambios en el almacenamiento local
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'local' && changes.blockedKeywords) {
        hideElements();
    }
});