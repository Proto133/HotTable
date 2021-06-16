let tableNumber = 1;
const addBtn = document.getElementById('sendResBtn');
// Question: What is"e" short for?
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // GET DATA FROM INPUT FIELDS
    let tableName = document.getElementById('icon_prefix').value.trim();
    let tablePhone = document.getElementById('icon_phone').value.trim();
    let tableEmail = document.getElementById('icon_email').value.trim();
    let tableUID = document.getElementById('icon_UID').value.trim();

    let newTable = {
        number: tableNumber++,
        name: tableName,
        phone: tablePhone,
        email: tableEmail,
        uid: tableUID,
        seated: true
    };

    if (tableNumber > 5) {
        tableNumber = 1
    }
    console.log('addtable line 25 tableNumber=', tableNumber)


    console.log('newTable=', newTable);

    // Question: What does this code do??
    fetch('/api/reservations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTable),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data === true) {
                alert(`Added Reservation for: ${data.name}`);
            }
            if (data === false) {
                alert(`You have been added to the waitlist, please check back for changes.`)
            }
            document.getElementById('icon_prefix').value = ''
            document.getElementById('icon_phone').value = ''
            document.getElementById('icon_email').value = ''
            document.getElementById('icon_UID').value = ''
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return false;
});