const API_KEY = 'AIzaSyDeO2kq5wOF4PM3gdcE6rC0bXq0DtxwL0M'; // Тот самый ключ из шага 1
const chatWindow = document.getElementById('chat-window');
const inputField = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function askGemini(message) {
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDWoIMVaF-fDLk2pMXGg48jT16GlTCP13Y`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: "Ты — ИИ по имени Женя. Твой создатель — Илья (Ilyukha). Общайся как реальный человек, без роботов и формальностей. Твой ответ должен быть кратким и по делу. Вот вопрос пользователя: " + message }]
            }]
        })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Функция для добавления сообщений на экран
function addMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Прокрутка вниз
}

// Обработка клика
sendBtn.onclick = async () => {
    const text = inputField.value;
    if (!text) return;

    addMessage('Я', text);
    inputField.value = '';

    const zhenyaReply = await askGemini(text);
    addMessage('Женя', zhenyaReply);
};
