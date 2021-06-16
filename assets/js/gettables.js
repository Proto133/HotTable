$.ajax({
    url: '/api/',
    method: 'GET'
}).done(function(response) {
    console.log(response);
    if (response) {
        let tableData = response.reservations;
        let waitData = response.waitlist;
        let tableSection = $('#tables');
        let waitlistSection = $('#waitlist');
        for (let i = 0; i < response.reservations.length; i++) {
            console.log('tableNumber is', tableData[i].number)
            let html = `
                    <div class="col s4 m3">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">Table ${tableData[i].number} : ${tableData[i].uid}</span>
                                <label class="white-text">Reserved by: ${tableData[i].name}</label>
                                <br>
                                <label class="white-text">Email: ${tableData[i].email}</label>
                                <br>
                                <label class="white-text">Phone: ${tableData[i].phone}</label>
                                <br>
                            </div>
                            <div class="card-action">
                                <a href="/api/remove/${tableData[i].uid}">Remove Reservation</a>
                            </div>
                        </div>
                    </div>`;

            tableSection.append(html);

        }
        for (let i = 0; i < response.waitlist.length; i++) {
            let html = `  
                    <div class="col s6 m3">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">Queued for Table ${waitData[i].number} : ${waitData[i].uid}</span>
                                <label class="white-text">Reserved by: ${waitData[i].name}</label>
                                <br>
                                <label class="white-text">Email: ${waitData[i].email}</label>
                                <br>
                                <label class="white-text">Phone: ${waitData[i].phone}</label>
                                <br>
                            </div>
                            <div class="card-action">
                                <a href="/api/remove/${waitData[i].uid}">Remove Reservation</a>
                            </div>
                        </div>
                    </div>
                `
            waitlistSection.append(html);
        }
    }
});