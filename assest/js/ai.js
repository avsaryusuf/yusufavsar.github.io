/* ==========================================================
   Yusuf AI — JavaScript
   ========================================================== */

// Elementler
const yBtn = document.getElementById("yusufAiBtn");
const yPanel = document.getElementById("yusufAiPanel");
const yInput = document.getElementById("aiInput");
const yMessages = document.getElementById("aiMessages");

// PANEL AÇ/KAPAT
yBtn.onclick = () => {
    yPanel.style.display = yPanel.style.display === "flex" ? "none" : "flex";
    yMessages.scrollTop = yMessages.scrollHeight;
};

// ENTER TUŞU DESTEK
yInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendToYusufAI();
});

// MESAJ GÖNDERME
async function sendToYusufAI() {
    const text = yInput.value.trim();
    if (!text) return;

    addMessage("sen", text);
    yInput.value = "";

    // data.js yükle
    const data = await fetch("data.js").then(r => r.json());

    // cevap bul
    const response = getBestMatch(text.toLowerCase(), data);

    setTimeout(() => {
        addMessage("ai", response);
    }, 300);
}

// MESAJ EKLEME
function addMessage(sender, text) {
    if (sender === "sen") {
        yMessages.innerHTML += `
            <div><b>Sen:</b> ${text}</div>
        `;
    } else {
        yMessages.innerHTML += `
            <div style="color:#b06fff; margin-top:6px;"><b>Yusuf AI:</b> ${text}</div>
        `;
    }
    yMessages.scrollTop = yMessages.scrollHeight;
}

// BASİT YAPAY ZEKÂ
function getBestMatch(q, data) {
    if (!data) return "Veri dosyasına ulaşılamadı.";

    if (q.includes("kimdir") || q.includes("kim") || q.includes("hakkında") || q.includes("yusuf"))
        return data.hakkimda;

    if (q.includes("proje") || q.includes("ne geliştiriyorsun") || q.includes("projelerin"))
        return data.projeler;

    if (q.includes("uzmanlık") || q.includes("tecrübe") || q.includes("alan"))
        return data.uzmanlik;

    if (q.includes("makale") || q.includes("yazı"))
        return data.makaleler;

    if (q.includes("hizmet"))
        return data.hizmetler;

    if (q.includes("sertifika"))
        return data.sertifikalar;

    return data.default;
}
