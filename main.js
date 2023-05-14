let isChanged = false;
document.getElementById('btn').addEventListener('click', () => {
    if (isChanged) {
        document.getElementById('btn').textContent = 'CLICK ME';
        isChanged = false;
    } else {
        document.getElementById('btn').textContent = 'CLICKED';
        isChanged = true;
    }
})
