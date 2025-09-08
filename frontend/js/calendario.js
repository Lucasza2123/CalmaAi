    // Calendário
        let currentCalendarDate = new Date();
        let selectedCalendarDate = null;
        
        function renderCalendar() {
            const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            
            document.getElementById('current-month').textContent = 
                `${monthNames[currentCalendarDate.getMonth()]} ${currentCalendarDate.getFullYear()}`;
            
            const calendarGrid = document.getElementById('calendar-days');
            // Limpar dias existentes (exceto os cabeçalhos dos dias da semana)
            while (calendarGrid.children.length > 7) {
                calendarGrid.removeChild(calendarGrid.lastChild);
            }
            
            const firstDay = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1);
            const lastDay = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 0);
            
            // Preencher dias em branco antes do primeiro dia do mês
            for (let i = 0; i < firstDay.getDay(); i++) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('calendar-cell');
                calendarGrid.appendChild(emptyCell);
            }
            
            // Preencher os dias do mês
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const dateCell = document.createElement('div');
                dateCell.classList.add('calendar-cell', 'calendar-date');
                dateCell.textContent = i;
                
                // Verificar se há registro de humor para este dia
                const cellDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), i);
                const moodEntry = moods.find(m => {
                    const moodDate = new Date(m.date);
                    return moodDate.toDateString() === cellDate.toDateString() && m.userId === currentUser.id;
                });
                
                if (moodEntry) {
                    dateCell.classList.add('has-mood', moodEntry.mood);
                }
                
                dateCell.addEventListener('click', () => {
                    // Remover seleção anterior
                    document.querySelectorAll('.calendar-date.selected').forEach(cell => {
                        cell.classList.remove('selected');
                    });
                    
                    // Adicionar seleção à célula clicada
                    dateCell.classList.add('selected');
                    
                    // Atualizar o pote dos sentimentos
                    selectedCalendarDate = cellDate;
                    const formattedDate = `${i} de ${monthNames[currentCalendarDate.getMonth()]} de ${currentCalendarDate.getFullYear()}`;
                    document.getElementById('selected-date').innerHTML = `<strong>Dia selecionado:</strong> ${formattedDate}`;
                    
                    // Preencher com dados existentes, se houver
                    if (moodEntry) {
                        document.getElementById('feelings-text').value = moodEntry.notes || '';
                    } else {
                        document.getElementById('feelings-text').value = '';
                    }
                });
                
                calendarGrid.appendChild(dateCell);
            }
        }
        
        document.getElementById('prev-month').addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
        
        document.getElementById('next-month').addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });
        
        // Salvar sentimentos no pote
        document.getElementById('save-feelings').addEventListener('click', () => {
            if (!selectedCalendarDate) {
                alert('Por favor, selecione uma data no calendário!');
                return;
            }
            
            const notes = document.getElementById('feelings-text').value;
            
            // Verificar se já existe um registro de humor para esta data
            const existingMoodIndex = moods.findIndex(m => {
                const moodDate = new Date(m.date);
                return moodDate.toDateString() === selectedCalendarDate.toDateString() && m.userId === currentUser.id;
            });
            
            if (existingMoodIndex !== -1) {
                // Atualizar registro existente
                moods[existingMoodIndex].notes = notes;
            } else {
                // Criar novo registro (sem humor definido, apenas notas)
                const moodEntry = {
                    id: Date.now().toString(),
                    userId: currentUser.id,
                    mood: '', // Sem humor definido
                    notes,
                    date: selectedCalendarDate.toISOString()
                };
                moods.push(moodEntry);
            }
            
            localStorage.setItem('calma_ai_moods', JSON.stringify(moods));
            alert('Nota salva com sucesso!');
            renderCalendar(); // Atualizar o calendário para refletir as mudanças
        });