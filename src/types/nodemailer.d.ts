// Minimal type shim for nodemailer so TypeScript is satisfied
// until @types/nodemailer can be installed (requires disk space).
// Once disk space is freed: npm install --save-dev @types/nodemailer

declare module 'nodemailer' {
  interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: { user?: string; pass?: string };
    [key: string]: unknown;
  }

  interface SendMailOptions {
    from?: string;
    to?: string | string[];
    subject?: string;
    text?: string;
    html?: string;
    [key: string]: unknown;
  }

  interface Transporter {
    sendMail(options: SendMailOptions): Promise<unknown>;
  }

  function createTransport(options: TransportOptions): Transporter;
  export { createTransport };
}
