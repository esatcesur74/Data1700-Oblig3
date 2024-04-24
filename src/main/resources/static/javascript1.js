function handlePurchase() {
    var movie = $('#film').val();
    var quantity = $('#antall').val();
    var fname = $('#fname').val();
    var etternavn = $('#etternavn').val();
    var telefonnr = $('#telefonnr').val();
    var email = $('#email').val();

    // Validering
    if (!movie || !quantity || !fname || !etternavn || !telefonnr || !email) {
        alert('Vennligst fyll ut alle feltene.');
        return;
    }

    var ticket = {
        film: movie,
        antall: quantity,
        fname: fname,
        etternavn: etternavn,
        telefonnr: telefonnr,
        email: email
    };

    fetch('/leggeTil', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Ticket added:", data);
            displayTickets();
            clearForm();
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

function displayTickets() {
    fetch('/hentListe')
        .then(response => response.json())
        .then(data => {
            var ticketListDiv = $('#ticketList');
            ticketListDiv.empty();

            data.forEach(ticket => {
                var ticketInfo = 'Film: ' + ticket.film + ', Antall: ' + ticket.antall +
                    ', Navn: ' + ticket.fname + ' ' + ticket.etternavn +
                    ', Telefon: ' + ticket.telefonnr + ', Email: ' + ticket.email;

                var ticketDiv = $('<div></div>').text(ticketInfo);
                ticketListDiv.append(ticketDiv);
            });
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

function deleteAllTickets() {
    fetch('/slett', {
        method: 'DELETE'
    })
        .then(() => {
            console.log("All tickets deleted");
            displayTickets();
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

function clearForm() {
    $('#film').val('film1');
    $('#antall').val(1);
    $('#fname').val('');
    $('#etternavn').val('');
    $('#telefonnr').val('');
    $('#email').val('');
}
