const ul = document.getElementById('myUL');
const input = document.getElementById('myInput');
const addBtn = document.getElementById('addBtn');

function addClosebutton(li) {
    const span = document.createElement('span');
    span.className = 'close-btn';
    span.textContent = ' '
    span.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });
    li.appendChild(span);
}
document.querySelectorAll('#myUL li').forEach(addClosebutton);
ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
});

function newElement() {
    const text = input.value.trim();
    if (!text) {
        alert('TU juippi kirjotappa eka!');
        return;
    }
    const li = document.createElement('li');
    li.textContent = text;
    addClosebutton(li);
    ul.appendChild(li);
    input.value = '';
    input.focus();
}
addBtn.addEventListener('click', newElement);
input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') newElement();
});