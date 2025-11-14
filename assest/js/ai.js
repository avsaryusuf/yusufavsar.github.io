// ===============================
// YUSUF AI WIDGET - PROFESSIONAL
// ===============================

// Panel Aç/Kapat
document.addEventListener("DOMContentLoaded", () => {

    const aiBtn = document.getElementById("yusufAiBtn");
    const aiPanel = document.getElementById("yusufAiPanel");
    const aiMessages = document.getElementById("aiMessages");
    const aiInput = document.getElementById("aiInput");

    if (!aiBtn || !aiPanel) return;

    aiBtn.onclick = () => {
        aiPanel.style.display = aiPanel.style.display === "flex" ? "none" : "flex";
    };

    // Enter tuşu ile mesaj gönderme
    aiInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendToYusufAI();
    });

});


// ===============================
// Mesaj Gönderme
// ===============================
async function sendToYusufAI() {

    const input = document.getElementById("aiInput");
    const messages = document.getElementById("aiMessages");

    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    // Kullanıcı mesajı
    messages.innerHTML += `<div class="msg user"><span>Sen:</span> ${text}</div>`;
    input.value = "";

    // Data JSON
    const data = await fetch("data.js").then(r => r.json());

    // Cevap bul
    const reply = getBestMatch(text, data);

    // AI cevabı
    messages.innerHTML += `<div class="msg ai"><span>Yusuf AI:</span> ${reply}</div>`;

    messages.scrollTop = messages.scrollHeight;
}


// ===============================
// BASIC NLP MATCHING
// ===============================
function getBestMatch(question, data) {

    const q = question.toLowerCase();

    const map = [
        { keys: ["kim", "hakkında", "yusuf"], field: "hakkimda" },
        { keys: ["proje", "ne geliştiriyorsun"], field: "projeler" },
        { keys: ["uzman", "alan", "tecrüb"], field: "uzmanlik" },
        { keys: ["makale", "yazı"], field: "makaleler" },
        { keys: ["hizmet"], field: "hizmetler" },
        { keys: ["sertifika"], field: "sertifikalar" }
    ];

    for (const item of map) {
        if (item.keys.some(k => q.includes(k))) {
            return data[item.field];
        }
    }

    return data.default;
}
