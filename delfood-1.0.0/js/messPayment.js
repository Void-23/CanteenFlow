document.addEventListener("DOMContentLoaded", function() {
    // Replace the placeholder with your actual payment details
    const amountToPay = 50.00; // Replace with your actual monthly mess amount

    // Generate QR Code
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: ``,
        width: 200,
        height: 200
    });

    // Display payment information
    document.getElementById("payment-info").textContent = `Amount to pay: $${amountToPay.toFixed(2)}`;
});
