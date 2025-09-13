 let breathingInterval;
        let breathingTimeLeft = 1 * 60; // 4 minutos em segundos
        let isBreathingActive = false;
        
        document.getElementById('start-breathing').addEventListener('click', () => {
            isBreathingActive = true;
            document.getElementById('start-breathing').style.display = 'none';
            document.getElementById('stop-breathing').style.display = 'block';
            
            const circle = document.getElementById('breathing-circle');
            const instruction = document.getElementById('breathing-instruction');
            
            let breatheIn = true;
            
            breathingInterval = setInterval(() => {
                breathingTimeLeft--;
                
                const minutes = Math.floor(breathingTimeLeft / 60);
                const seconds = breathingTimeLeft % 60;
                document.getElementById('breathing-timer').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (breathingTimeLeft <= 0) {
                    clearInterval(breathingInterval);
                    circle.textContent = "Concluído!";
                    instruction.textContent = "Sessão de respiração concluída. Espero que se sinta melhor!";
                    document.getElementById('start-breathing').style.display = 'block';
                    document.getElementById('stop-breathing').style.display = 'none';
                    breathingTimeLeft = 1 * 60;
                    isBreathingActive = false;
                    return;
                }
                
                if (breatheIn) {
                    circle.textContent = "Inspire";
                    circle.style.transform = 'scale(1.2)';
                    instruction.textContent = "Inspire profundamente pelo nariz...";
                    breatheIn = false;
                } else {
                    circle.textContent = "Expire";
                    circle.style.transform = 'scale(1)';
                    instruction.textContent = "Expire lentamente pela boca...";
                    breatheIn = true;
                }
            }, 2000);
        });
        
        document.getElementById('stop-breathing').addEventListener('click', () => {
            clearInterval(breathingInterval);
            document.getElementById('breathing-circle').textContent = "Inspire";
            document.getElementById('breathing-circle').style.transform = 'scale(1)';
            document.getElementById('breathing-instruction').textContent = "Clique em iniciar para começar a sessão de respiração";
            document.getElementById('breathing-timer').textContent = "01:00";
            document.getElementById('start-breathing').style.display = 'block';
            document.getElementById('stop-breathing').style.display = 'none';
            breathingTimeLeft = 1 * 60;
            isBreathingActive = false;
        });