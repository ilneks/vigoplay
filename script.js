const MY_KEY = 'AIzaSyDeO2kq5wOF4PM3gdcE6rC0bXq0DtxwL0M'; 

async function askGemini(message) {
    // В версии 2.0 используем путь v1beta и модель gemini-2.0-flash-exp или gemini-2.0-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${MY_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Ты — Женя, ИИ-собеседник, созданный Ильёй (Ilyukha). Общайся просто, кратко, без лишнего пафоса. Вопрос: " + message }] }]
            })
        });

        const data = await response.json();

        if (response.ok && data.candidates && data.candidates[0]) {
            return data.candidates[0].content.parts[0].text;
        } else {
            // Если модель 2.0 еще не доступна в твоем регионе, Гугл выдаст ошибку здесь
            console.error('Ошибка:', data);
            return "Ошибка API: " + (data.error ? data.error.message : "модель не ответила");
        }

    } catch (e) {
        return "Женя ушел на перезагрузку...";
    }
}
