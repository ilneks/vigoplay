const MY_KEY = 'AIzaSyDeO2kq5wOF4PM3gdcE6rC0bXq0DtxwL0M'; // Убедись, что это НОВЫЙ ключ

async function askGemini(message) {
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${MY_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();

        // Если пришла ошибка 400 или любая другая
        if (!response.ok) {
            console.error('Ошибка API:', data);
            return "Ошибка от Гугла: " + (data.error ? data.error.message : 'Неизвестная ошибка 400');
        }

        return data.candidates[0].content.parts[0].text;

    } catch (e) {
        console.error('Ошибка запроса:', e);
        return "Женя вне зоны доступа. Проверь консоль.";
    }
}
