export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Send email via Resend API
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'PME Website <onboarding@resend.dev>',
                to: process.env.CONTACT_EMAIL || 'hello@primemarketingexperts.com',
                subject: `New Lead: ${body.formType || 'Contact Form'} from ${body.name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 20px; text-align: center;">
                            <h1 style="color: white; margin: 0;">New Form Submission</h1>
                        </div>
                        <div style="padding: 30px; background: #f9fafb;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Form Type:</strong></td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${body.formType || 'Contact Form'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${body.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${body.email}">${body.email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${body.phone || 'Not provided'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Company:</strong></td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${body.company || 'Not provided'}</td>
                                </tr>
                                ${body.website ? `
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Website:</strong></td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="${body.website}">${body.website}</a></td>
                                </tr>
                                ` : ''}
                                ${body.services && body.services.length > 0 ? `
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Services Interested:</strong></td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${body.services.join(', ')}</td>
                                </tr>
                                ` : ''}
                            </table>
                            ${body.message ? `
                            <div style="margin-top: 20px;">
                                <strong>Message:</strong>
                                <p style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px;">${body.message}</p>
                            </div>
                            ` : ''}
                        </div>
                        <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
                            <p style="margin: 0;">This email was sent from the Prime Marketing Experts website contact form.</p>
                        </div>
                    </div>
                `,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Resend API error:', errorData);
            throw new Error('Failed to send email');
        }

        console.log('Email sent successfully for:', body.name, body.email);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return new Response(JSON.stringify({ success: false, error: 'Failed to process request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
