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
                from: 'Amp Marketing <onboarding@resend.dev>',
                to: process.env.CONTACT_EMAIL || 'hello@primemarketingexperts.com',
                subject: `🚀 New AI Consultation Request from ${body.name}`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #000;">
                        <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 40px; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.02em;">⚡ New AI Consultation</h1>
                        </div>
                        <div style="padding: 40px; background: #0a0a0a;">
                            <table style="width: 100%; border-collapse: collapse; color: #fff;">
                                <tr>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #1f1f1f; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Name</td>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #1f1f1f; font-weight: 600;">${body.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #1f1f1f; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #1f1f1f;"><a href="mailto:${body.email}" style="color: #3b82f6;">${body.email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #1f1f1f; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Solution</td>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #1f1f1f; color: #8b5cf6; font-weight: 600;">${body.solution || 'Not specified'}</td>
                                </tr>
                            </table>
                            ${body.message ? `
                            <div style="margin-top: 30px;">
                                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Vision / Message</p>
                                <p style="background: #111; padding: 20px; border-radius: 12px; color: #d1d5db; line-height: 1.6; border: 1px solid #1f1f1f;">${body.message}</p>
                            </div>
                            ` : ''}
                        </div>
                        <div style="background: #050505; color: #4b5563; padding: 24px; text-align: center; font-size: 12px; border-top: 1px solid #1f1f1f;">
                            <p style="margin: 0;">Sent from Amp Marketing AI Platform</p>
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

        console.log('Amp Contact: Email sent for:', body.name, body.email);

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
