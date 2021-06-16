let tableNumber = 1;
$('#sendResBtn').on('click', (e) => {
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

    let currentURL = window.location.origin;
    $.post(currentURL + "/api/new", newTable,
        function(data) {

            console.log('data:', data)
                // If a table is available... tell user they are booked.
            if (data.seated === true) {
                alert("Yay! You are officially booked!")
            }

            // If a table is available... tell user they on the waiting list.
            if (data.seated === false) {
                alert("You are on the waitlist and will be seated as soon as possible.")
            }

        });

    // fetch('/api/reservations/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newTable),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('data = ', data)
    //         if (data.name != "" && data.uid != "") {
    //             alert(`Added Reservation for: ${data.name}`);
    //         }
    //         if (data.name == "" |) {
    //             alert(`You have been added to the waitlist, please check back for changes.`)
    //         }
    document.getElementById('icon_prefix').value = ''
    document.getElementById('icon_phone').value = ''
    document.getElementById('icon_email').value = ''
    document.getElementById('icon_UID').value = ''
    return false;
});