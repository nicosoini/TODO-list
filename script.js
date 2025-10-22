// Haetaan elementit HTML:stä
const ul = document.getElementById("myUL"); // Lista
const input = document.getElementById("myInput"); // Tekstikenttä
const addBtn = document.getElementById("addBtn"); // Lisää -nappi
const clearBtn = document.getElementById("clearBtn"); // Tyhjennys -nappi
const inputWarning = document.getElementById("inputWarning"); // Virheviesti
const STORAGE_KEY = "TODO-list"; // LocalStoragen avain

// Funktio, joka luo ja palauttaa uuden listaelementin
function createListItem(text, checked = false) {
  const li = document.createElement("li");
  li.dataset.text = text; // tallennetaan alkuperäinen teksti
  li.dataset.checked = checked ? "true" : "false";
  li.textContent = text; // näkyvä teksti
  if (checked) li.classList.add("checked");
  addClosebutton(li);
  return li;
}

// Luodaan funktio, joka lisää listatuille asioille poistonapin
function addClosebutton(li) {
  const span = document.createElement("button"); // Luodaan uusi nappi
  span.className = "close-btn"; // Lisätään tyyli
  span.type = "button";
  span.setAttribute(
    "aria-label",
    `Remove task ${li.dataset.text || li.textContent.trim()}`
  );
  span.innerHTML = "&times;"; // X-symboli

  // Lisätään eventListener, joka poistaa tehtävän, kun painiketta painetaan
  span.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove(); // Poistetaan tehtävä listasta
    saveToLocalStorage();
  });

  li.appendChild(span); // Lisätään nappi listan loppuun
}

// Tallennus localStorageen
function saveToLocalStorage() {
  const items = Array.from(ul.querySelectorAll("li")).map((li) => ({
    text: li.dataset.text || li.textContent.replace("×", "").trim(),
    checked: li.dataset.checked === "true",
  }));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    // Jos tallennus epäonnistuu
    console.error("Tehtäviä ei voitu tallentaa LocalStorageen", err);
  }
}

// Lataus paikallisesta tallennuksesta
function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const items = JSON.parse(raw);
    // Tyhjennetään nykyinen lista
    ul.querySelectorAll("li").forEach((li) => li.remove());
    // Lisätään tallennetut
    items.forEach((item) => {
      const li = createListItem(item.text, item.checked);
      ul.appendChild(li);
    });
  } catch (err) {
    // Jos lataus epäonnistuu
    console.error("Ei voitu ladata LocalStoragesta", err);
  }
}

// Kuunnellaan klikkauksia UL -elementissä
ul.addEventListener("click", (e) => {
  // Jos painettu elementti on listassa, merkitään se tehdyksi
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    e.target.dataset.checked = e.target.classList.contains("checked") || "true";
    ("false");
    saveToLocalStorage();
  }
});

// Uuden listauksen funktio
function newElement() {
  const text = input.value.trim();
  // Virheilmoitus, jos tekstikenttä on tyhjä
  if (!text) {
    input.classList.add("input-error"); // Korostetaan kenttä
    if (inputWarning) {
      inputWarning.hidden = false; // Varoitusviesti
    }
    input.focus();
    return;
  }
  // Luodaan uusi listaelementti
  const li = createListItem(text, false);
  // Lisätään tehtävä listaan
  ul.appendChild(li);
  // Tallennetaan localStorageen
  saveToLocalStorage();
  // Tyhjennetään kenttä ja poistetaan virheilmoitus
  input.value = "";
  input.classList.remove("input-error");
  if (inputWarning) inputWarning.hidden = true;
  input.focus();
}

// Käyttäjä painaa lisää nappia, kutsutaan "newElement"
if (addBtn) addBtn.addEventListener("click", newElement);

// Toiminnalisuus, joka lisää listauksen, kun käyttäjä painaa Enter-näppäintä
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") newElement();
});

// "Clear" -nappi poistaa kaikki listaukset
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    ul.querySelectorAll("li").forEach((li) => li.remove());
    saveToLocalStorage();
  });
}

// Kun käyttäjä aloittaa kirjoittamisen, poistetaan mahdollinen virheilmoitus
input.addEventListener("input", () => {
  if (input.value.trim().length > 0) {
    input.classList.remove("input-error");
    if (inputWarning) inputWarning.hidden = true;
  }
});

// Ladataan tehtävät LocalStoragesta
loadFromLocalStorage();
