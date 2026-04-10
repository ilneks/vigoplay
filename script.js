// Используем тот ключ, который ты дал последним
const MY_KEY = 'AIzaSyDeO2kq5wOF4PM3gdcE6rC0bXq0DtxwL0M'; 

const chatWindow = document.getElementById('chat-window');
const inputField = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function askGemini(message) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${MY_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();

        // Если Гугл вернул ошибку (код 400, 403 и т.д.)
        if (data.error) {
            console.error('Ошибка API:', data.error);
            return `Ошибка от Гугла: ${data.error.message}`;
        }

        // Если всё ок, выводим ответ
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        }
        
        return "Женя в замешательстве... Ответ пустой.";

    } catch (e) {
        console.error('Ошибка запроса:', e);
        return "Не удалось отправить сообщение. Проверь консоль.";
    }
}

function addMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.style.marginBottom = "10px";
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendBtn.onclick = async () => {
    const text = inputField.value.trim();
    if (!text) return;

    addMessage('Я', text);
    inputField.value = '';

    const zhenyaReply = await askGemini(text);
    addMessage('Женя', zhenyaReply);
};
