// Select all the "Book Now" buttons
document.querySelectorAll('.book-now-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        const counterElement = document.querySelectorAll('.click-counter')[index];
        let seatsCount = parseInt(counterElement.textContent.replace('Seats: ', ''));
        seatsCount++;
        
        // Update the counter and keep the chair icon intact
        counterElement.innerHTML =' <i class="fa-solid fa-chair"></i> '+ 'Seats: ' + seatsCount  ;
    });
});
