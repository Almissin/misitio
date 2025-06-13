// Referencia de la API de Velo: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {

	// Escribe tu código de Javascript aquí usando la API de marco de Velo 

	// Escribe hola mundo:
	// console.log("¡Hola mundo!");

	// Llama las funciones en los elementos de la página, por ejemplo:
	// $w("#button1").label = "¡Haz clic aquí!";

	// Haz clic en "Ejecutar", o ve a la vista previa de tu sitio, para ejecutar el código

});
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Chatbot Gemini</title>
  <style>
    body { font-family: Arial; }
    #chatbox { width: 400px; height: 300px; border: 1px solid #ccc; overflow-y: scroll; padding: 10px; }
    #userInput { width: 80%; }
    #sendBtn { width: 18%; }
  </style>
</head>
<body>
  <h2>Chat con Gemini</h2>
  <div id="chatbox"></div>
  <input type="text" id="userInput" placeholder="Escribe tu mensaje..." />
  <button id="sendBtn">Enviar</button>

  <script>
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const apiKey = 'TU_API_KEY'; // Reemplaza esto con tu clave real

    async function enviarMensaje(mensajeUsuario) {
      chatbox.innerHTML += `<p><strong>Tú:</strong> ${mensajeUsuario}</p>`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: mensajeUsuario }] }]
        })
      });

      const data = await response.json();
      const respuesta = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta.';
      chatbox.innerHTML += `<p><strong>Gemini:</strong> ${respuesta}</p>`;
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
      const mensaje = userInput.value;
      if (mensaje.trim()) {
        enviarMensaje(mensaje);
        userInput.value = '';
      }
    });
  </script>
</body>
</html>