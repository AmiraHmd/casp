import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://centerarabic.com';
const LOGO_URL = `${SITE_URL}/images/logo/casp-logo.png`;

const CONTACT = {
  email: 'contact@centerarabic.com',
  phone: '00 1514 900 0895',
  website: 'www.centerarabic.com',
};

const translations = {
  ar: {
    subject: 'المركز العربي للخدمات التربوية — رمز التحقق الخاص بك',
    greeting: 'السلام عليكم،',
    heading: 'رمز التحقق الخاص بك',
    body: 'لقد طلبت الوصول إلى الكتاب الإلكتروني على منصة مركز المركز العربي للخدمات التربوية. استخدم الرمز أدناه للتحقق من هويتك.',
    codeLabel: 'رمز التحقق',
    expiry: 'ينتهي صلاحية هذا الرمز خلال <strong>15 دقيقة</strong>. لا تشارك هذا الرمز مع أي شخص.',
    ignore: 'إذا لم تطلب ذلك، يمكنك تجاهل هذه الرسالة بأمان.',
    contactTitle: 'تواصل معنا',
    footer: 'جميع الحقوق محفوظة © المركز العربي للخدمات التربوية',
    dir: 'rtl',
  },
  fr: {
    subject: 'Centre Casp — Votre code de vérification',
    greeting: 'Bonjour,',
    heading: 'Votre code de vérification',
    body: "Vous avez demandé l'accès à un livre électronique sur la plateforme Centre Casp. Utilisez le code ci-dessous pour vérifier votre identité.",
    codeLabel: 'Code de vérification',
    expiry: 'Ce code expire dans <strong>15 minutes</strong>. Ne partagez ce code avec personne.',
    ignore: "Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.",
    contactTitle: 'Nous contacter',
    footer: '© Centre Casp Éducation — Tous droits réservés',
    dir: 'ltr',
  },
  en: {
    subject: 'Casp Education — Your verification code',
    greeting: 'Dear user,',
    heading: 'Your Verification Code',
    body: 'You requested access to an electronic book on the Casp Education platform. Use the code below to verify your identity.',
    codeLabel: 'Verification Code',
    expiry: 'This code expires in <strong>15 minutes</strong>. Never share this code with anyone.',
    ignore: "If you didn't request this, you can safely ignore this email.",
    contactTitle: 'Contact Us',
    footer: '© Casp Education Centre — All rights reserved',
    dir: 'ltr',
  },
};

export async function sendOtpEmail(
  email: string,
  code: string,
  locale: 'ar' | 'fr' | 'en' = 'ar',
) {
  const t = translations[locale] || translations.ar;
  const fromAddress = 'Casp Education <contact@centerarabic.com>';
  const isRtl = t.dir === 'rtl';

  const html = `
<!DOCTYPE html>
<html dir="${t.dir}" lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${t.subject}</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:'Segoe UI',Tahoma,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr><td align="center" style="padding:40px 16px;">

      <!-- Email Card -->
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
             style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);max-width:100%;">

        <!-- Top accent bar -->
        <tr>
          <td style="background:linear-gradient(90deg,#e67e22 0%,#f39c12 100%);height:5px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Header: Logo + Brand -->
        <tr>
          <td style="background:linear-gradient(135deg,#0d1f37 0%,#1a3a6b 100%);padding:36px 48px;text-align:center;">
            <img src="${LOGO_URL}" alt="Casp Education" width="160" height="auto" style="display:block;margin:0 auto 16px;max-width:160px;border:0;" />
            <p style="margin:0;font-size:13px;color:#93c5fd;letter-spacing:0.08em;text-transform:uppercase;">المركز العربي للخدمات التربوية &nbsp;|&nbsp; Centre Casp &Eacute;ducation</p>
          </td>
        </tr>

        <!-- Heading banner -->
        <tr>
          <td style="background:#f8fafc;padding:32px 48px 0;text-align:center;">
            <h1 style="margin:0;font-size:24px;font-weight:700;color:#0d1f37;">${t.heading}</h1>
            <div style="width:48px;height:3px;background:#e67e22;border-radius:99px;margin:12px auto 0;font-size:0;">&nbsp;</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 48px 12px;background:#f8fafc;text-align:${isRtl ? 'right' : 'left'};">
            <p style="margin:0 0 8px;color:#374151;font-size:15px;font-weight:600;">${t.greeting}</p>
            <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.8;">${t.body}</p>
          </td>
        </tr>

        <!-- OTP Code Box -->
        <tr>
          <td style="padding:24px 48px;background:#f8fafc;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:#ffffff;border:2px solid #e67e22;border-radius:16px;padding:32px 24px;text-align:center;box-shadow:0 2px 16px rgba(230,126,34,0.08);">
                  <p style="margin:0 0 10px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.12em;">${t.codeLabel}</p>
                  <p style="margin:0;font-size:52px;font-weight:800;letter-spacing:14px;color:#0d1f37;font-family:'Courier New',Courier,monospace;line-height:1;">${code}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Expiry note -->
        <tr>
          <td style="padding:0 48px 32px;background:#f8fafc;text-align:${isRtl ? 'right' : 'left'};">
            <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">${t.expiry}</p>
            <p style="margin:0;font-size:13px;color:#9ca3af;">${t.ignore}</p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 48px;background:#f8fafc;">
            <div style="border-top:1px solid #e5e7eb;font-size:0;">&nbsp;</div>
          </td>
        </tr>

        <!-- Contact Info -->
        <tr>
          <td style="padding:28px 48px;background:#f8fafc;text-align:center;">
            <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#0d1f37;text-transform:uppercase;letter-spacing:0.08em;">${t.contactTitle}</p>
            <table align="center" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding:4px 12px;text-align:center;">
                  <a href="mailto:${CONTACT.email}" style="font-size:13px;color:#1a3a6b;text-decoration:none;">
                    &#128231; ${CONTACT.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding:4px 12px;text-align:center;">
                  <a href="tel:${CONTACT.phone}" style="font-size:13px;color:#1a3a6b;text-decoration:none;">
                    &#128222; ${CONTACT.phone}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding:4px 12px;text-align:center;">
                  <a href="https://${CONTACT.website}" style="font-size:13px;color:#e67e22;text-decoration:none;">
                    &#127760; ${CONTACT.website}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0d1f37;padding:20px 48px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#64748b;">${t.footer}</p>
          </td>
        </tr>

        <!-- Bottom accent bar -->
        <tr>
          <td style="background:linear-gradient(90deg,#e67e22 0%,#f39c12 100%);height:4px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

      </table>
      <!-- End Email Card -->

    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    t.heading,
    '',
    t.greeting,
    t.body,
    '',
    `${t.codeLabel}: ${code}`,
    '',
    t.expiry.replace(/<[^>]+>/g, ''),
    t.ignore,
    '',
    '---',
    t.contactTitle,
    CONTACT.email,
    CONTACT.phone,
    `https://${CONTACT.website}`,
  ].join('\n');

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      replyTo: CONTACT.email,
      subject: t.subject,
      html,
      text,
    });

    if (error) {
      console.error('[Resend Error]', error);
      throw new Error('Email failed to send');
    }
    console.log('[Resend Success] Email sent:', data);
  } catch (error) {
    console.error('[Mailer] Delivery failure:', error);
    throw error;
  }
}
