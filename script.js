const ul = document.getElementById('myUL');
const input = document.getElementById('myInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const inputWarning = document.getElementById('inputWarning');

function addClosebutton(li) {
    const span = document.createElement('button'); // use <button> for accessibility
    span.className = 'close-btn';
    span.type = 'button';
    span.setAttribute('aria-label', `Remove task ${li.textContent.trim()}`);
    span.innerHTML = '&times;'; // visible ×
    span.addEventListener('click', (e) => {
        e.stopPropagation(); // don't toggle checked when clicking the X
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
        // show inline warning and red border
        input.classList.add('input-error');
        if (inputWarning) {
            inputWarning.hidden = false;
        }
        input.focus();
        return;
    }
    const li = document.createElement('li');
    li.textContent = text;
    addClosebutton(li);
    ul.appendChild(li);
    input.value = '';
    // clear any previous warning state
    input.classList.remove('input-error');
    if (inputWarning) inputWarning.hidden = true;
    input.focus();
}
addBtn.addEventListener('click', newElement);
input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') newElement();
});
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        ul.querySelectorAll('li').forEach(li => li.remove());
    });
}

// remove warning when the user starts typing
input.addEventListener('input', () => {
    if (input.value.trim().length > 0) {
        input.classList.remove('input-error');
        if (inputWarning) inputWarning.hidden = true;
    }
});