const apiUrl = "https://7103.api.greenapi.com";

async function fetchAPI(method, endpoint, data = {}) {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const url = `${apiUrl}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: method === 'POST' ? JSON.stringify(data) : null
        });
        const result = await response.json();
        document.getElementById('response').value = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('response').value = 'Ошибка: ' + error.message;
    }
}

function getSettings() {
    fetchAPI('GET', 'getSettings');
}

function getStateInstance() {
    fetchAPI('GET', 'getStateInstance');
}

function sendMessage() {
    const chatId = "77056784309@c.us";
    const message = document.getElementById('message').value;
    const data = {
        chatId: chatId,
        message: message
    };
    fetchAPI('POST', 'sendMessage', data);
}

function sendFileByUrl() {
    const chatId = "77056784309@c.us";
    const urlFile = document.getElementById('fileUrl').value;
    const data = {
        chatId: chatId,
        urlFile: urlFile,
        fileName: urlFile.split('/').pop()
    };
    fetchAPI('POST', 'sendFileByUrl', data);
}
