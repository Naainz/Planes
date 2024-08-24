document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const origin = urlParams.get('origin');
    const destination = urlParams.get('destination');
    const departure = urlParams.get('departure');
    const returnDate = urlParams.get('return');

    const flightDetailsContainer = document.querySelector('.flight-details-container');

    const flightDetailsHeader = document.createElement('h2');
    flightDetailsHeader.textContent = `Flights from ${origin} to ${destination} on ${new Date(departure).toDateString()}${returnDate ? ` (Return: ${new Date(returnDate).toDateString()})` : ''}`;
    flightDetailsContainer.appendChild(flightDetailsHeader);

    const flightData = JSON.parse(localStorage.getItem('flightData'));

    if (flightData && flightData.data) {
        flightData.data.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.classList.add('flight-card');
            flightCard.innerHTML = `
                <p>Airline: ${flight.validatingAirlineCodes.join(', ')}</p>
                <p>Flight Number: ${flight.itineraries[0].segments.map(segment => segment.number).join(', ')}</p>
                <p>A flight from ${origin} to ${destination} costs ${flight.price.grandTotal} ${flight.price.currency}.</p>
            `;
            const bookingLink = document.createElement('a');
            bookingLink.href = '#'; 
            bookingLink.textContent = 'Book this flight';
            flightCard.appendChild(bookingLink);
            flightDetailsContainer.appendChild(flightCard);
        });
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No flight details available.';
        flightDetailsContainer.appendChild(errorMessage);
    }
});
