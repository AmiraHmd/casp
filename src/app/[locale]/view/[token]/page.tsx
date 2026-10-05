import { verifyPdfAccessToken } from '@/lib/token';
import { Icon } from '@iconify/react';

interface Props {
  params: Promise<{
    locale: string;
    token: string;
  }>;
}

export default async function ViewBookPage({ params }: Props) {
  const { token, locale } = await params;

  let email = '';
  let valid = false;

  try {
    const payload = verifyPdfAccessToken(token);
    email = payload.email;
    valid = true;
  } catch {
    valid = false;
  }

  if (!valid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-brand-navy-black text-center p-4">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-6">
          <Icon icon="solar:shield-warning-bold" className="text-4xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Access Expired or Invalid</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
          The secure link you used is either expired or invalid. Access links are only valid for 24 hours.
        </p>
        <a 
          href={`/${locale}/services/book-access`}
          className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <Icon icon="solar:refresh-bold" />
          Request New Access
        </a>
      </div>
    );
  }

  // Construct the secure PDF stream URL
  // We use the same token to authenticate the stream route
  const pdfStreamUrl = `/api/pdf/${token}#toolbar=0`;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col h-screen w-screen overflow-hidden">
        {/* Header / Toolbar (Minimal) */}
        <div className="h-14 bg-brand-navy-dark border-b border-gray-700 flex items-center justify-between px-4 shrink-0">
             <div className="flex items-center gap-2 text-white/80">
                 <Icon icon="solar:lock-keyhole-minimalistic-bold" className="text-brand-gold" />
                 <span className="text-sm font-medium">Secure Viewer</span>
             </div>
             <a href={`/${locale}`} className="text-white/60 hover:text-white transition-colors">
                 <Icon icon="solar:close-circle-bold" className="w-6 h-6" />
             </a>
        </div>

      {/* PDF Viewer Container */}
      <div className="grow relative bg-gray-800 w-full h-full flex items-center justify-center">
        <iframe
          src={pdfStreamUrl}
          className="w-full h-full border-none"
          title="Secure Book Viewer"
        />
        
        {/* Security Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
             {/* Diagonal Repeating Text (Optional, but user asked for bottom-right specifically) */}
        </div>
        
        {/* Bottom Right User Watermark (As requested) */}
        <div className="absolute bottom-8 right-8 pointer-events-none z-10 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10">
            <p className="text-white/50 text-xs font-mono">
                Licensed to: <span className="text-white/80">{email}</span>
            </p>
            <p className="text-white/30 text-[10px] text-right mt-0.5">
                Do not distribute
            </p>
        </div>

        {/* Floating Pattern Watermark (Subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-[0.03] text-white text-6xl font-black whitespace-nowrap select-none">
            {email}
        </div>
      </div>
    </div>
  );
}
