const addBtn = document.getElementById('sendResBtn');
// Question: What is"e" short for?
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Question: What does this code do?
    let tableName = document.getElementById('icon_prefix').value.trim();
    let tablePhone = document.getElementById('icon_phone').value.trim();
    let tableEmail = document.getElementById('icon_email').value.trim();
    let tableUID = document.getElementById('icon_UID').value.trim();
    let tableNumber = 0

    let newTable = {
        number: tableNumber,
        name: tableName,
        phone: tablePhone,
        email: tableEmail,
        uid: tableUID,
        seated: false
    };

    console.log('newTable=', newTable);

    // Question: What does this code do??
    fetch('/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTable),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('add.html', data);
            alert(`Added Reservation for: ${data.name}`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});