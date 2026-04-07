const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// SYSTEM INSTRUCTIONS:
// 1. Focus on ADULT-TO-ADULT interactions only.
// 2. Identify 'Conflicting Instructional Cues' (two staff speaking at once).
// 3. Flag 'Blur Words' (professional, reliable, etc.) and ask for data points.
// 4. Use SBI Model (Situation, Behavior, Impact) for feedback.

async function handleChat() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    // Placeholder for API Call (OpenAI/Gemini/etc.)
    const botResponse = await getCoachResponse(text);
    appendMessage(botResponse, 'bot');
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getCoachResponse(input) {
    // In a real implementation, you'd send 'input' to your API.
    // For testing the 'Clarity Coach' logic locally:
    if (input.toLowerCase().includes("professional")) {
        return "I noticed you used a 'Blur Word': 'professional'. To keep our feedback data-driven, can you describe the specific behavior you saw? [SBI Model]";
    } 
    if (input.toLowerCase().includes("help him get ready")) {
        return "That sounds like a vague instruction. Could you rephrase that using 'Spatial Directions' or 'Descriptive Hints' for your partner?";
    }
    return "I hear you. Let's look at that through the lens of a synchronized partnership. How did that interaction impact the student's cognitive load?";
}

sendBtn.addEventListener('click', handleChat);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });