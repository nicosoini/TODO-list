// Haetaan elementit HTML:stä
const ul = document.getElementById('myUL');     //Lista
const input = document.getElementById('myInput');   //Tekstikenttä
const addBtn = document.getElementById('addBtn');   //Lisää nappi
const clearBtn = document.getElementById('clearBtn');   //Tyhjennys
const inputWarning = document.getElementById('inputWarning');   //Virheviesti

// Luodaan funktio, joka lisää listatuille asioille poistonapin
function addClosebutton(li) {
    const span = document.createElement('button');  //Luodaan uusi nappi
    span.className = 'close-btn';   //Lisätään tyyli
    span.type = 'button';
    span.setAttribute('aria-label', `Remove task ${li.textContent.trim()}`);
    span.innerHTML = '&times;';     //X-symboli
    // Lisätään eventListener, joka poistaa tehtävän, kun painiketta painetaan
    span.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();    //Poistetaan tehtävä listasta
    });
    li.appendChild(span);   //Lisätään nappi listan loppuun
}
// Lisätään jokaiseen tehtävään sulkunappi
document.querySelectorAll('#myUL li').forEach(addClosebutton);
// Kuunnellaan klikkauksia UL -elementissä
ul.addEventListener('click', (e) => {
    // Jos klikattu kohde on listassa, muuttuu se yliviivatuksi eli tehdyksi
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
});

// Uuden listauksen funktio
function newElement() {
    const text = input.value.trim();
    // Virheilmoitus, jos tekstikenttä on tyhjä
    if (!text) {
        input.classList.add('input-error'); //Korostetaan kenttä
        if (inputWarning) {
            inputWarning.hidden = false;    //Varoitusviesti
        }
        input.focus();
        return;
    }
    // Luoaan uusi listaelementti ja siihen käyttäjän teksti
    const li = document.createElement('li');
    li.textContent = text;
    // Lisätään poisto -nappi listaukseen
    addClosebutton(li);
    // Lisätään tehtävä listaan
    ul.appendChild(li);
    // Tyhjennetään kenttä ja poistetaan virheilmoitus
    input.value = '';
    input.classList.remove('input-error');
    if (inputWarning) inputWarning.hidden = true;
    input.focus();
}
// Käyttäjä painaa lisää nappia, kutsutaan "newElement"
addBtn.addEventListener('click', newElement);
// Toiminnalisuus, joka lisää listauksen, kun käyttäjä painaa Enter-näppäintä
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') newElement();
});
// "Clear" -nappi poistaa kaikki listaukset
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        ul.querySelectorAll('li').forEach(li => li.remove());
    });
}
// Kun käyttäjä aloittaa kirjoittamisen, poistetaan mahdollinen virheilmoitus
input.addEventListener('input', () => {
    if (input.value.trim().length > 0) {
        input.classList.remove('input-error');
        if (inputWarning) inputWarning.hidden = true;
    }
});