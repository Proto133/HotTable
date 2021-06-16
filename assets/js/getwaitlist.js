$.ajax({
    url: '/api/',
    method: 'GET'
}).done(function(response) {
    console.log(response);
    if (response) {
        let waitData = response.waitlist;
        let waitlistSection = $('#waitlist');
        for (let i = 0; i < response.waitlist.length; i++) {
            let html = `  
                    <div class="col s6 m3">
                        <div class="card gray lighten-1">
                            <div class="card-content black-text">
                                <span class="card-title">Queued for Table: ${waitData[i].number}: <br> ${waitData[i].uid}</span>
                                <label class="black-text">Reserved by: ${waitData[i].name}</label>
                                <br>
                                <label class="black-text">Email: ${waitData[i].email}</label>
                                <br>
                                <label class="black-text">Phone: ${waitData[i].phone}</label>
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