
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingEmailPayload {
  booking: {
    id: string;
    guest_name: string;
    guest_email: string;
    hotel_name?: string;
    car_name?: string;
    bike_name?: string;
    adventure_name?: string;
    room_type?: string;
    check_in_date: string;
    check_out_date: string;
    total_price: number;
    booking_reference: string;
    booking_type: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking } = await req.json() as BookingEmailPayload;
    
    if (!booking.guest_email) {
      throw new Error("Guest email is required");
    }

    console.log("Sending booking confirmation email to:", booking.guest_email);

    // Determine the service name based on booking type
    const serviceName = booking.hotel_name || booking.car_name || booking.bike_name || booking.adventure_name || 'Unknown Service';
    
    // Format dates for display
    const checkInDate = new Date(booking.check_in_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const checkOutDate = new Date(booking.check_out_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Format price
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(booking.total_price);

    const { data, error } = await resend.emails.send({
      from: "Bookings <noreply@yourdomain.com>",
      to: [booking.guest_email],
      subject: `Booking Confirmation - ${booking.booking_reference}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .booking-details { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .price { font-size: 18px; font-weight: bold; color: #4F46E5; }
            .footer { font-size: 12px; text-align: center; margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Booking Confirmation</h1>
            <p>Reference: ${booking.booking_reference}</p>
          </div>
          
          <div class="content">
            <p>Dear ${booking.guest_name},</p>
            
            <p>Thank you for your booking! Your reservation has been confirmed.</p>
            
            <div class="booking-details">
              <h3>${serviceName}</h3>
              ${booking.room_type ? `<p>Room Type: ${booking.room_type}</p>` : ''}
              <p>Check-in: ${checkInDate}</p>
              <p>Check-out: ${checkOutDate}</p>
              <p class="price">Total Amount: ${formattedPrice}</p>
            </div>
            
            <p>If you have any questions or need to make changes to your booking, please contact our customer service.</p>
            
            <p>We look forward to welcoming you!</p>
            
            <p>Best regards,<br>The Booking Team</p>
          </div>
          
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Email sent successfully:", data);
    
    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in send-booking-confirmation:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
