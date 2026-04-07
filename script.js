const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let state = {
    phase: "INTRO",
    role: "",
    mode: ""
};

// Initial Message
window.onload = () => {
    addMessage("bot", "Welcome to the Collaborative Clarity Coach! I'm here to help you bridge communication gaps with your colleagues using UDL principles.");
    addMessage("bot", "To start: Are you practicing today as a Case Manager or a Paraprofessional?");
};

function addMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerHTML = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleInput() {
    const input = userInput.value.trim();
    if (!input) return;

    addMessage("user", input);
    userInput.value = "";

    processLogic(input);
}

function processLogic(input) {
    const lowerInput = input.toLowerCase();

    if (state.phase === "INTRO") {
        state.role = input;
        state.phase = "MODE_SELECTION";
        addMessage("bot", `Great! Working as a ${state.role} requires high levels of alignment. Please choose an Adult-Collaboration Mode:<br><br><b>Mode A</b>: Staff Huddle Analysis (LO1)<br><b>Mode B</b>: Consultation Scripting (LO2)<br><b>Mode C</b>: Workflow Construction (LO3)`);
        return;
    }

    if (state.phase === "MODE_SELECTION") {
        if (lowerInput.includes("a")) {
            state.mode = "A";
            state.phase = "SCENARIO";
            addMessage("bot", "<b>Context:</b> You are in a morning huddle explaining a safety protocol. Your partner interrupts repeatedly with unrelated logistics ('Did the bus come?'). You are unaligned.");
            addMessage("bot", "<b>Question:</b> Is this 'Conflicting Instructional Cues' or 'Frequent Interruptions'? How does this specific adult barrier impact student support?");
        } else if (lowerInput.includes("b")) {
            state.mode = "B";
            state.phase = "SCENARIO";
            addMessage("bot", "<b>Context:</b> You need to tell your partner exactly how to set up the sensory corner. Vague language fails here.");
            addMessage("bot", "<b>Question:</b> Draft a script for your PARTNER using 'Specific Spatial Directions' (like 'left corner' or 'top shelf') to tell them where to place items.");
        } else if (lowerInput.includes("c")) {
            state.mode = "C";
            state.phase = "SCENARIO";
            addMessage("bot", "<b>Context:</b> You and your partner are constantly out of sync regarding who is modifying the morning work packet. It is causing delays.");
            addMessage("bot", "<b>Question:</b> To ensure alignment, which tool applies best: <b>Shared Digital Organizer</b>, <b>Visual Schedule</b>, or <b>Chunked Template</b>? Why?");
        }
        return;
    }

    if (state.phase === "SCENARIO") {
        evaluateResponse(input);
        state.phase = "CONCLUSION";
    }
}

function evaluateResponse(input) {
    const lowerInput = input.toLowerCase();

    if (state.mode === "A") {
        if (lowerInput.includes("frequent interruptions")) {
            addMessage("bot", "<b>Correct!</b> This is 'Frequent Interruptions.' When adults can't finish a planning thought, they cannot align support effectively.");
        } else {
            addMessage("bot", "Actually, this is <b>Frequent Interruptions</b>. If staff members can't finish communicating a protocol, they leave the huddle unaligned, which confuses the student later.");
        }
    } 
    
    else if (state.mode === "B") {
        const keywords = ["left", "right", "top", "bottom", "near", "corner", "shelf", "next to"];
        let score = 0;
        keywords.forEach(word => { if (lowerInput.includes(word)) score++; });
        let rating = Math.min(score, 5) || 1;
        
        addMessage("bot", `<b>Rating: ${rating}/5</b>`);
        if (rating >= 3) {
            addMessage("bot", "Strong use of Spatial Directions! This minimizes the 'threat' of confusion for your colleague.");
        } else {
            addMessage("bot", "Try to be more specific. Using terms like 'top shelf' or 'left corner' ensures your partner doesn't have to guess.");
        }
    } 
    
    else if (state.mode === "C") {
        if (lowerInput.includes("shared digital organizer")) {
            addMessage("bot", "<b>Correct!</b> The Shared Digital Organizer is the best tool for adult logistical alignment. Remember: Visual Schedules are for students; Organizers are for staff synchronization.");
        } else {
            addMessage("bot", "The correct answer is the <b>Shared Digital Organizer</b>. While Visual Schedules help students, staff need a shared logistical tool to stay in sync regarding their own roles.");
        }
    }

    addMessage("bot", "<b>Next Step:</b> In your next team meeting, try establishing a 'Repeat Back' protocol to ensure you and your partner are 100% aligned before the students arrive!");
}

sendBtn.addEventListener('click', handleInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInput();
});