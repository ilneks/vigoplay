// Твой новый ключ
const MY_KEY = 'AIzaSyDeO2kq5wOF4PM3gdcE6rC0bXq0DtxwL0M'; 

const chatWindow = document.getElementById('chat-window');
const inputField = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function askGemini(message) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${MY_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: "Ты — ИИ по имени Женя. Твой создатель — Илья (Ilyukha). Общайся как реальный человек, по-дружески, без официоза. Отвечай кратко. Вопрос: " + message }]
                }]
            })
        });

        const data = await response.json();

        if (response.ok && data.candidates && data.candidates[0]) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Детали ошибки:', data);
            return "Слушай, Илья, Гугл выдал ошибку: " + (data.error ? data.error.message : 'непонятки какие-то');
        }
    } catch (e) {
        console.error('Ошибка сети:', e);
        return "Сеть барахлит, не могу достучаться до мозгов.";
    }
}

// Функция отрисовки сообщений
function addMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'Я' ? 'user-message' : 'ai-message');
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Обработка клика
sendBtn.onclick = async () => {
    const text = inputField.value.trim();
    if (!text) return;

    addMessage('Я', text);
    inputField.value = '';

    // Показываем, что Женя думает
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'message ai-message';
    loadingMsg.innerText = 'Женя думает...';
    chatWindow.appendChild(loadingMsg);

    const zhenyaReply = await askGemini(text);
    
    // Удаляем надпись "думает" и ставим реальный ответ
    chatWindow.removeChild(loadingMsg);
    addMessage('Женя', zhenyaReply);
};

// Отправка по кнопке Enter
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
