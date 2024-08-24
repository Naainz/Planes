const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const passengersInput = document.getElementById('passengers');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');
const returnRadio = document.getElementById('return');
const oneWayRadio = document.getElementById('oneway');
const returnDateGroup = document.getElementById('return-date-group');
const submitBtn = document.querySelector('.submit-btn');
const planeIcon = document.querySelector('.plane-icon');

function checkFormValidity() {
    const isOriginFilled = originInput.value.trim() !== '';
    const isDestinationFilled = destinationInput.value.trim() !== '';
    const isPassengersFilled = passengersInput.value.trim() !== '';
    const isDepartureDateFilled = departureDateInput.value.trim() !== '';
    const isReturnDateFilled = returnRadio.checked ? returnDateInput.value.trim() !== '' : true;

    if (isOriginFilled && isDestinationFilled && isPassengersFilled && isDepartureDateFilled && isReturnDateFilled) {
        submitBtn.disabled = false;
        submitBtn.classList.add('enabled');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('enabled');
    }
}

originInput.addEventListener('input', checkFormValidity);
destinationInput.addEventListener('input', checkFormValidity);
passengersInput.addEventListener('input', checkFormValidity);
departureDateInput.addEventListener('input', checkFormValidity);
returnDateInput.addEventListener('input', checkFormValidity);

returnRadio.addEventListener('change', function () {
    returnDateGroup.style.display = 'block';
    checkFormValidity();
});

oneWayRadio.addEventListener('change', function () {
    returnDateGroup.style.display = 'none';
    checkFormValidity();
});

submitBtn.addEventListener('click', async function() {
    if (!submitBtn.classList.contains('enabled')) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    planeIcon.style.animation = 'shake 0.2s infinite';

    setTimeout(async () => {
        planeIcon.style.animation = 'none';
        planeIcon.style.transform = 'translate(-50%, -200%) scale(0.5)';

        const origin = originInput.value.trim();
        const destination = destinationInput.value.trim();
        const departureDate = new Date(departureDateInput.value).toISOString().split('T')[0];
        const returnDate = returnRadio.checked ? new Date(returnDateInput.value).toISOString().split('T')[0] : null;

        try {
            const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'grant_type': 'client_credentials',
                    'client_id': 'YOUR_API_KEY',
                    'client_secret': 'YOUR_API_SECRET'
                })
            });

            const tokenData = await tokenResponse.json();
            const apiKey = tokenData.access_token;

            let apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${passengersInput.value}`;
            if (returnDate) {
                apiUrl += `&returnDate=${returnDate}`;
            }
            apiUrl += `&max=5`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('flightData', JSON.stringify(data));

                const url = `flight-details.html?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&departure=${encodeURIComponent(departureDate)}&return=${encodeURIComponent(returnDate)}`;
                window.location.href = url;
            } else {
                console.error('Error fetching flight details:', data);
                alert('Failed to fetch flight details. Please check your inputs and try again.');
            }
        } catch (error) {
            console.error('Error fetching flight details:', error);
            alert('An error occurred while fetching flight details.');
        }
    }, 1000);
});
