


const MAX_CAPACITY = 100;


let attendees = [];


function addAttendee(name, email, ticketType) {
    if (isFull()) {
        console.log("Cannot add attendee. Conference is full!");
        return;
    }

    const attendee = {
        name: name,
        email: email,
        ticketType: ticketType
    };

    attendees.push(attendee);
    console.log(`${name} registered successfully as ${ticketType}`);
}


function isFull() {
    return attendees.length >= MAX_CAPACITY;
}


function listAttendees() {
    console.log("\n--- Attendee List ---");

    if (attendees.length === 0) {
        console.log("No attendees registered yet.");
        return;
    }

    attendees.forEach((attendee, index) => {
        console.log(
            `${index + 1}. Name: ${attendee.name}, Email: ${attendee.email}, Ticket: ${attendee.ticketType}`
        );
    });
}


function countByTicketType(type) {
    return attendees.filter(attendee => attendee.ticketType === type).length;
}




addAttendee("Ali Khan", "ali@example.com", "General");
addAttendee("Sara Ahmed", "sara@example.com", "VIP");
addAttendee("Hassan Raza", "hassan@example.com", "Speaker");
addAttendee("Fatima Noor", "fatima@example.com", "VIP");

listAttendees();

console.log("\nVIP Count:", countByTicketType("VIP"));
console.log("General Count:", countByTicketType("General"));
console.log("Speaker Count:", countByTicketType("Speaker"));

console.log("\nIs Conference Full?", isFull());