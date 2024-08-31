const emailTemplate = (
  passengerName,
  departureTime,
  arrivalTime,
  date,
  flightName
) => {
  return `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
    <h2 style="color: #4CAF50; text-align: center;">Booking Confirmation</h2>
    <p>Dear ${passengerName},</p>
    <p>Thank you for booking with us! Here are the details of your upcoming flight:</p>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>From (FlightName):</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${flightName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>To (DepartureTime):</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${departureTime}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Arrival Time:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${arrivalTime}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Arrival Time:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${arrivalTime}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${date}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Gate Number:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${gateNumber}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Terminal Number:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${terminalNumber}</td>
      </tr>
    </table>

    <p>Your OTP code for confirmation is <strong>${otp}</strong>. Please do not share this code with anyone.</p>
    
    <p style="text-align: center; margin-top: 20px;">
      <a href="#" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Booking Details</a>
    </p>

    <p>If you have any questions, feel free to contact us at <a href="mailto:kickart11@gmail.com">kickart11@gmail.com</a>.</p>

    <p style="color: #999; font-size: 12px; text-align: center;">Thank you for choosing us!</p>
  </div>
  `;
};

export default emailTemplate;
