document.addEventListener('DOMContentLoaded', function () {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const sendMessageBtn = document.getElementById('chatbot-send');

  // Start hidden
  chatbotWindow.style.display = 'none';

  // Add a message to the chat window
  function addMessage(text, sender) {
    const message = document.createElement('div');
    message.className = sender === 'user' ? 'user-message' : 'bot-message';
    message.textContent = text;
    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTo({ top: chatbotMessages.scrollHeight, behavior: 'smooth' });
  }

  // Process static responses without backend
  function processMessage(msg) {
    const lowerMsg = msg.toLowerCase();

    let botReply = "I'm not sure I understand. Please try asking about admissions, courses, or contact info.";

    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      botReply = "Hello! Welcome to Prestige University. How can I assist you today?";
    } 
    else if (lowerMsg.includes("admission")) {
      botReply = "Our admission process details are available at prestigeuniversity.edu/admissions. You can also email admissions@prestigeuniversity.edu.";
    }
    else if (lowerMsg.includes("courses")) {
      botReply = "We offer a wide range of undergraduate and postgraduate courses in engineering, arts, science, and management.";
    }
    else if (lowerMsg.includes("contact")) {
      botReply = "You can reach us at (555) 123‑4567 or info@prestigeuniversity.edu.";
    }
    else if (lowerMsg.includes("fees")) {
      botReply = "Fee details vary by program. Please visit prestigeuniversity.edu/fees for the full breakdown.";
    }
    else if (lowerMsg.includes("location") || lowerMsg.includes("where")) {
      botReply = "Prestige University is located at 55 Academic Way, Cityville, State 54321.";
    }
    
    addMessage(botReply, 'bot');
  }

  // Handle sending user message
  function handleSend() {
    const message = chatbotInput.value.trim();
    if (message !== '') {
      addMessage(message, 'user'); // Show immediately
      processMessage(message); // Get static reply
      chatbotInput.value = '';
    }
  }

  // Toggle chatbot window
  chatbotToggle.addEventListener('click', () => {
    if (chatbotWindow.style.display === 'none') {
      chatbotWindow.style.display = 'flex';
      if (chatbotMessages.children.length === 0) {
        processMessage('hello');
      }
    } else {
      chatbotWindow.style.display = 'none';
    }
  });

  // Close chatbot
  chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
  });

  // Send on button click
  sendMessageBtn.addEventListener('click', handleSend);

  // Send on Enter key press
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });
});
