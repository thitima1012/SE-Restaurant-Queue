let queue = [];

document.getElementById('enqueueBtn').addEventListener('click', () => {
    const customerName = document.getElementById('customerName').value;
    if (customerName) {
        queue.push(customerName);
        document.getElementById('customerName').value = ''; // Clear the input
        updateQueueDisplay();
    }
});

document.getElementById('dequeueBtn').addEventListener('click', () => {
    if (queue.length > 0) {
        alert('Next customer: ' + queue.shift());
        updateQueueDisplay();
    } else {
        alert('No more customers in the queue.');
    }
});

function updateQueueDisplay() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = '<h3>Queue</h3>';
    queue.forEach((customer, index) => {
        queueList.innerHTML += `<p>${index + 1}. ${customer}</p>`;
    });
}

function sendSMSToCustomer(customerName) {
  const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
  const authToken = "YOUR_TWILIO_AUTH_TOKEN";
  const twilioPhoneNumber = "YOUR_TWILIO_PHONE_NUMBER";

  const client = new Twilio(accountSid, authToken);

  client.messages
    .create({
      body: `Dear ${customerName}, your table is ready. Please proceed to the restaurant.`,
      from: twilioPhoneNumber,
      to: "CUSTOMER_PHONE_NUMBER", // Replace with the actual customer's phone number
    })
    .then((message) => console.log("SMS sent:", message.sid))
    .catch((error) => console.error("Error sending SMS:", error));
}