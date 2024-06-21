const apiUrl = "https://7103.api.greenapi.com";

async function fetchAPI(method, endpoint, data = {}) {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;

    if (!idInstance || !apiTokenInstance) {
        document.getElementById('response').value = 'Ошибка: Пожалуйста, введите idInstance и ApiTokenInstance.';
        return;
    }

    const url = `${apiUrl}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
    try {
        console.log(`Request URL: ${url}`);
        console.log(`Request Data: ${JSON.stringify(data)}`);

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: method === 'POST' ? JSON.stringify(data) : null
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('response').value = JSON.stringify(result, null, 2);
        console.log(`Response Data: ${JSON.stringify(result)}`);
    } catch (error) {
        document.getElementById('response').value = 'Ошибка: ' + error.message;
        console.error('Error:', error);
    }
}

function getSettings() {
    fetchAPI('GET', 'getSettings');
}

function getStateInstance() {
    fetchAPI('GET', 'getStateInstance');
}

function sendMessage() {
    const chatId = document.getElementById('chatId').value;
    const message = document.getElementById('message').value;

    if (!chatId || !message) {
        document.getElementById('response').value = 'Ошибка: Пожалуйста, введите chatId и message.';
        return;
    }

    const data = {
        chatId: chatId,
        message: message
    };

    fetchAPI('POST', 'sendMessage', data);
}

function sendFileByUrl() {
    const chatId = document.getElementById('fileChatId').value;
    const urlFile = document.getElementById('fileUrl').value;

    if (!chatId || !urlFile) {
        document.getElementById('response').value = 'Ошибка: Пожалуйста, введите chatId и urlFile.';
        return;
    }

    const data = {
        chatId: chatId,
        urlFile: urlFile,
        fileName: urlFile.split('/').pop()
    };

    fetchAPI('POST', 'sendFileByUrl', data);
}
