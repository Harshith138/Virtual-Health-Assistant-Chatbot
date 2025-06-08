const form = document.getElementById("chat-form");
const input = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userText = input.value;
  appendMessage("user", userText);
  input.value = "";

  const res = await fetch("http://127.0.0.1:5000/get", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await res.json();
  appendMessage("bot", data.reply);
});

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}
