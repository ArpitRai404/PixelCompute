const input = document.querySelector("#noteInput")
const notesSection = document.querySelector("#notesSection")

const getRandomColor = () => {
    const colors = ["#FFB6C1", "#FFD700", "#ADFF2F", "#87CEFA", "#FF69B4", "#FFA07A", "#20B2AA", "#9370DB", "#00CED1"];
    return colors[Math.floor(Math.random() * colors.length)];
}

const addNote = () => { 
    const text = input.value;
    
    if(text === "") return;
    
    const note = document.createElement("div")
    note.classList.add("notes")
    note.textContent = text 
    note.style.backgroundColor = getRandomColor();

    const close = document.createElement("button")
    close.textContent = "x"
    close.classList.add("close")

    close.addEventListener("click", event =>
    event.target.parentElement.remove())
    
    note.appendChild(close)

    notesSection.appendChild(note)

    input.value = ""
}

const add = document.querySelector('#add');
add.addEventListener("click", addNote)
