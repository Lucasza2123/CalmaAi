 document.getElementById('send-message').addEventListener('click', () => {
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            
            if (message) {
                const chatMessages = document.getElementById('chat-messages');
                
                // Adicionar mensagem do usuário
                const userMessage = document.createElement('div');
                userMessage.classList.add('message', 'user');
                userMessage.textContent = message;
                chatMessages.appendChild(userMessage);
                
                // Simular resposta do bot após um breve delay
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.classList.add('message', 'bot');
                    
                    // Respostas pré-definidas baseadas em palavras-chave
                    if (message.toLowerCase().includes('ansiedade') || message.toLowerCase().includes('ansioso')) {
                        botMessage.textContent = "Entendo que você esteja se sentindo ansioso. Tente focar na sua respiração por alguns momentos. Quer tentar uma técnica de respiração?";
                    } else if (message.toLowerCase().includes('triste') || message.toLowerCase().includes('tristeza')) {
                        botMessage.textContent = "Sinto muito que você esteja se sentindo triste. Lembre-se que sentimentos são passageiros. Você gostaria de conversar sobre o que está sentindo?";
                    } else if (message.toLowerCase().includes('estresse') || message.toLowerCase().includes('estressado')) {
                        botMessage.textContent = "O estresse pode ser desafiador. Talvez uma pausa para respirar ou uma caminhada curta possa ajudar. Posso sugerir alguma atividade?";
                    } else if (message.toLowerCase().includes('feliz') || message.toLowerCase().includes('alegre')) {
                        botMessage.textContent = "Que bom ver que você está se sentindo bem! Aproveite esse momento positivo!";
                    } else {
                        // Resposta padrão
                        botMessage.textContent = "Obrigado por compartilhar. Como posso ajudar você a se sentir melhor hoje?";
                    }
                    
                    chatMessages.appendChild(botMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
                
                input.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });