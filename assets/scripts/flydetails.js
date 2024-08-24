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

    const airlineBookingLinks = {
        'AA': 'https://www.aa.com/', // American Airlines
        'DL': 'https://www.delta.com/', // Delta Airlines
        'UA': 'https://www.united.com/', // United Airlines
        'BA': 'https://www.britishairways.com/', // British Airways
        'LH': 'https://www.lufthansa.com/', // Lufthansa
        'AF': 'https://www.airfrance.com/', // Air France
        'KL': 'https://www.klm.com/', // KLM
        'EK': 'https://www.emirates.com/', // Emirates
        'QR': 'https://www.qatarairways.com/', // Qatar Airways
        'SQ': 'https://www.singaporeair.com/', // Singapore Airlines
        'CX': 'https://www.cathaypacific.com/', // Cathay Pacific
        'QF': 'https://www.qantas.com/', // Qantas
        'NZ': 'https://www.airnewzealand.com/', // Air New Zealand
        'AC': 'https://www.aircanada.com/', // Air Canada
        'NH': 'https://www.ana.co.jp/', // All Nippon Airways (ANA)
        'JL': 'https://www.jal.com/', // Japan Airlines
        'AY': 'https://www.finnair.com/', // Finnair
        'SK': 'https://www.flysas.com/', // Scandinavian Airlines (SAS)
        'TG': 'https://www.thaiairways.com/', // Thai Airways
        'CX': 'https://www.cathaypacific.com/', // Cathay Pacific
        'VS': 'https://www.virginatlantic.com/', // Virgin Atlantic
        'AZ': 'https://www.alitalia.com/', // Alitalia
        'IB': 'https://www.iberia.com/', // Iberia
        'EI': 'https://www.aerlingus.com/', // Aer Lingus
        'LX': 'https://www.swiss.com/', // SWISS
        'OS': 'https://www.austrian.com/', // Austrian Airlines
        'SN': 'https://www.brusselsairlines.com/', // Brussels Airlines
        'TK': 'https://www.turkishairlines.com/', // Turkish Airlines
        'LY': 'https://www.elal.com/', // El Al Israel Airlines
        'EK': 'https://www.emirates.com/', // Emirates
        'EY': 'https://www.etihad.com/', // Etihad Airways
        'MH': 'https://www.malaysiaairlines.com/', // Malaysia Airlines
        'GA': 'https://www.garuda-indonesia.com/', // Garuda Indonesia
        'VA': 'https://www.virginaustralia.com/', // Virgin Australia
        'FJ': 'https://www.fijiairways.com/', // Fiji Airways
        'SV': 'https://www.saudia.com/', // Saudia
        'RJ': 'https://www.rj.com/', // Royal Jordanian
        'WY': 'https://www.omanair.com/', // Oman Air
        'MS': 'https://www.egyptair.com/', // EgyptAir
        'ET': 'https://www.ethiopianairlines.com/', // Ethiopian Airlines
        'SA': 'https://www.flysaa.com/', // South African Airways
        'KE': 'https://www.koreanair.com/', // Korean Air
        'OZ': 'https://www.flyasiana.com/', // Asiana Airlines
        'BR': 'https://www.evaair.com/', // EVA Air
        'CI': 'https://www.china-airlines.com/', // China Airlines
        'MU': 'https://www.ceair.com/', // China Eastern Airlines
        'CZ': 'https://www.csair.com/', // China Southern Airlines
        'HU': 'https://www.hainanairlines.com/', // Hainan Airlines
        'VN': 'https://www.vietnamairlines.com/', // Vietnam Airlines
        'MH': 'https://www.malaysiaairlines.com/', // Malaysia Airlines
        'PR': 'https://www.philippineairlines.com/', // Philippine Airlines
        'AI': 'https://www.airindia.in/', // Air India
        'G9': 'https://www.airarabia.com/', // Air Arabia
        '3O': 'https://www.aircairo.com/', // Air Cairo
        'KP': 'https://www.askyairlines.com/', // ASKY Airlines
        'Z9': 'https://www.azmanair.com/', // Azman Air
        '9J': 'https://www.danaair.com/', // Dana Air
        'KQ': 'https://www.kenya-airways.com/', // Kenya Airways
        'WB': 'https://www.rwandair.com/', // RwandAir
        'PZ': 'https://www.latam.com/', // LATAM Paraguay
        '4M': 'https://www.latam.com/', // LATAM Argentina
        'LA': 'https://www.latam.com/', // LATAM Chile
        'JJ': 'https://www.latam.com/', // LATAM Brasil
        'LP': 'https://www.latam.com/', // LATAM Perú
        '4C': 'https://www.latam.com/', // LATAM Colombia
        'XL': 'https://www.latam.com/', // LATAM Ecuador
        'CM': 'https://www.copaair.com/', // Copa Airlines
        'AV': 'https://www.avianca.com/', // Avianca
        'TA': 'https://www.avianca.com/', // Avianca El Salvador
        'LR': 'https://www.avianca.com/', // Avianca Costa Rica
        'T0': 'https://www.aeromar.com.mx/', // Aeromar
        'AM': 'https://www.aeromexico.com/', // Aeromexico
        'VB': 'https://www.vivaaerobus.com/', // VivaAerobus
        'Y4': 'https://www.volaris.com/', // Volaris
        'AR': 'https://www.aerolineas.com.ar/', // Aerolíneas Argentinas
        'AC': 'https://www.aircanada.com/', // Air Canada
        'WS': 'https://www.westjet.com/', // WestJet
        'F8': 'https://www.flairairlines.com/', // Flair Airlines
        'TS': 'https://www.airtransat.com/', // Air Transat
        'PD': 'https://www.flyporter.com/', // Porter Airlines
        'NZ': 'https://www.airnewzealand.com/', // Air New Zealand
        'VA': 'https://www.virginaustralia.com/', // Virgin Australia
        'JQ': 'https://www.jetstar.com/', // Jetstar Airways
        'QF': 'https://www.qantas.com/', // Qantas
        'TT': 'https://www.tigerair.com.au/', // Tigerair Australia
        'FJ': 'https://www.fijiairways.com/', // Fiji Airways
        'PX': 'https://www.airniugini.com.pg/', // Air Niugini
        'NF': 'https://www.airvanuatu.com/', // Air Vanuatu
        'CI': 'https://www.china-airlines.com/', // China Airlines
        'BR': 'https://www.evaair.com/', // EVA Air
        'PR': 'https://www.philippineairlines.com/', // Philippine Airlines
        'BI': 'https://www.flyroyalbrunei.com/', // Royal Brunei Airlines
        'MH': 'https://www.malaysiaairlines.com/', // Malaysia Airlines
        'OD': 'https://www.malindoair.com/', // Malindo Air
        'AK': 'https://www.airasia.com/', // AirAsia
        'Z2': 'https://www.philippinesairasia.com/', // Philippines AirAsia
        '5J': 'https://www.cebupacificair.com/', // Cebu Pacific
        'TR': 'https://www.flyscoot.com/', // Scoot
        'D7': 'https://www.airasia.com/', // AirAsia X
        'FD': 'https://www.airasia.com/', // Thai AirAsia
        'SL': 'https://www.thaismileair.com/', // Thai Smile
        'XJ': 'https://www.airasia.com/', // Thai AirAsia X
        'QG': 'https://www.citilink.co.id/', // Citilink
        'JT': 'https://www.lionair.co.id/', // Lion Air
        'GA': 'https://www.garuda-indonesia.com/', // Garuda Indonesia
        'SJ': 'https://www.sriwijayaair.co.id/', // Sriwijaya Air
        'QZ': 'https://www.airasia.com/', // Indonesia AirAsia
        'BL': 'https://www.bambooairways.com/', // Bamboo Airways
        'VN': 'https://www.vietnamairlines.com/', // Vietnam Airlines
        'VJ': 'https://www.vietjetair.com/', // VietJet Air
        'QD': 'https://www.nokair.com/', // Nok Air
        'DD': 'https://www.nokair.com/', // NokScoot
        'PG': 'https://www.bangkokair.com/', // Bangkok Airways
        'WE': 'https://www.thaismileair.com/', // Thai Smile
        'TG': 'https://www.thaiairways.com/', // Thai Airways
        'SG': 'https://www.spicejet.com/', // SpiceJet
        'G8': 'https://www.goair.in/', // GoAir
        'UK': 'https://www.vistara.com/', // Vistara
        'AI': 'https://www.airindia.in/', // Air India
        '6E': 'https://www.goindigo.in/', // IndiGo
        'XY': 'https://www.flynas.com/', // Flynas
        'SV': 'https://www.saudia.com/', // Saudia
        'KU': 'https://www.kuwaitairways.com/', // Kuwait Airways
        'QR': 'https://www.qatarairways.com/', // Qatar Airways
        'EK': 'https://www.emirates.com/', // Emirates
        'EY': 'https://www.etihad.com/', // Etihad Airways
        'GF': 'https://www.gulfair.com/', // Gulf Air
        'WY': 'https://www.omanair.com/', // Oman Air
        'RJ': 'https://www.rj.com/', // Royal Jordanian
        'MS': 'https://www.egyptair.com/', // EgyptAir
        'AT': 'https://www.royalairmaroc.com/', // Royal Air Maroc
        'TU': 'https://www.tunisair.com/', // Tunisair
        'AH': 'https://www.airalgerie.dz/', // Air Algérie
        '3O': 'https://www.aircairo.com/', // Air Cairo
        '8U': 'https://www.afriqiyah.aero/', // Afriqiyah Airways
        'XY': 'https://www.flynas.com/', // Flynas
        'XY': 'https://www.flyadeal.com/', // Flyadeal
        'ME': 'https://www.mea.com.lb/', // Middle East Airlines
        'SU': 'https://www.aeroflot.ru/', // Aeroflot
        'S7': 'https://www.s7.ru/', // S7 Airlines
        'FV': 'https://www.rossiya-airlines.com/', // Rossiya Airlines
        'DP': 'https://www.pobeda.aero/', // Pobeda
        'UT': 'https://www.utair.ru/', // UTair
        'BT': 'https://www.airbaltic.com/', // airBaltic
        'LO': 'https://www.lot.com/', // LOT Polish Airlines
        'LH': 'https://www.lufthansa.com/', // Lufthansa
        'LX': 'https://www.swiss.com/', // SWISS
        'OS': 'https://www.austrian.com/', // Austrian Airlines
        'SN': 'https://www.brusselsairlines.com/', // Brussels Airlines
        'TP': 'https://www.flytap.com/', // TAP Air Portugal
        'IB': 'https://www.iberia.com/', // Iberia
        'VY': 'https://www.vueling.com/', // Vueling
        'UX': 'https://www.aireuropa.com/', // Air Europa
        'FR': 'https://www.ryanair.com/', // Ryanair
        'EI': 'https://www.aerlingus.com/', // Aer Lingus
        'LS': 'https://www.jet2.com/', // Jet2.com
        'U2': 'https://www.easyjet.com/', // EasyJet
        'BA': 'https://www.britishairways.com/', // British Airways
        'AZ': 'https://www.alitalia.com/', // Alitalia
        'NO': 'https://www.neosair.it/', // Neos
        'FR': 'https://www.ryanair.com/', // Ryanair
        'TK': 'https://www.turkishairlines.com/', // Turkish Airlines
        'PC': 'https://www.flypgs.com/', // Pegasus Airlines
        'SG': 'https://www.spicejet.com/', // SpiceJet
        'AI': 'https://www.airindia.in/', // Air India
        'EK': 'https://www.emirates.com/', // Emirates
        'EY': 'https://www.etihad.com/', // Etihad Airways
        'QR': 'https://www.qatarairways.com/', // Qatar Airways
        'SV': 'https://www.saudia.com/', // Saudia
        'MS': 'https://www.egyptair.com/', // EgyptAir
        'AT': 'https://www.royalairmaroc.com/', // Royal Air Maroc
        'TU': 'https://www.tunisair.com/', // Tunisair
        'AH': 'https://www.airalgerie.dz/', // Air Algérie
        'XY': 'https://www.flyadeal.com/', // Flyadeal
    };

    if (flightData && flightData.data) {
        flightData.data.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.classList.add('flight-card');
            const airlineCode = flight.validatingAirlineCodes[0];
            const bookingLinkUrl = airlineBookingLinks[airlineCode] || '#';
            flightCard.innerHTML = `
                <p>Airline: ${flight.validatingAirlineCodes.join(', ')}</p>
                <p>Flight Number: ${flight.itineraries[0].segments.map(segment => segment.number).join(', ')}</p>
                <p>A flight from ${origin} to ${destination} costs ${flight.price.grandTotal} ${flight.price.currency}.</p>
            `;
            const bookingLink = document.createElement('a');
            bookingLink.href = bookingLinkUrl; 
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
