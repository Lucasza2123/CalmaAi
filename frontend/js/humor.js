document.addEventListener("DOMContentLoaded", () => {
  let selectedMood = null;

  // selecionar humor
  const moodOptions = document.querySelectorAll(".mood-option");
  moodOptions.forEach(option => {
    option.addEventListener("click", () => {
      moodOptions.forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");
      selectedMood = option.dataset.mood;
    });
  });

  // salvar humor
  document.getElementById("save-mood").addEventListener("click", () => {
    if (!selectedMood) {
      alert("Por favor, selecione como você está se sentindo hoje.");
      return;
    }

    const notes = document.getElementById("mood-notes").value;

    const moodEntry = {
      mood: selectedMood,
      notes,
      date: new Date().toISOString()
    };

    // salvar no localStorage
    let moods = JSON.parse(localStorage.getItem("calma_ai_moods")) || [];
    moods.push(moodEntry);
    localStorage.setItem("calma_ai_moods", JSON.stringify(moods));

    // redirecionar para o menu
    window.location.href = "menu.html";
  });
});
