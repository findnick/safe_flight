const emailTemplate = (
  passengerName,
  departureTime,
  arrivalTime,
  flightName,
  imageUrl // Add the image URL as a parameter
) => {
  return `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
    <h2 style="color: #4CAF50; text-align: center;">Booking Confirmation</h2>
    
    <p>Dear ${passengerName},</p>
    <p>Thank you for booking with us! Here are the details of your upcoming flight:</p>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Flight Name:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${flightName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Departure Time:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${departureTime}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Arrival Time:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${arrivalTime}</td>
      </tr>
    </table>

    <p style="text-align: center; margin-top: 20px;">
      <a href="http://flightsavior.com/" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Explore More</a>
    </p>

    <p>If you have any questions, feel free to contact us at <a href="mailto:kickart11@gmail.com">kickart11@gmail.com</a>.</p>

    <p style="color: #999; font-size: 12px; text-align: center;">Thank you for choosing us!</p>
  </div>
  `;
};

export default emailTemplate;
