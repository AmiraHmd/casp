
import { NextRequest, NextResponse } from 'next/server';
import { verifyPdfAccessToken } from '@/lib/token';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const locale = searchParams.get('locale') || 'en';

  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/services/book-access?error=missing_token`, request.url));
  }

  try {
    // 1. Verify the JWT
    verifyPdfAccessToken(token);

    // 2. Create the redirect response
    const response = NextResponse.redirect(new URL(`/${locale}/PrivateBook`, request.url));

    // 3. Set the HttpOnly cookie
    // We store the payload or a new session token. 
    // For simplicity and statelessness, we can store the verified payload claims signed again 
    // OR just store the original token if it's still valid, BUT the requirement was "No JWT exposed in URL".
    // Storing the JWT in an HttpOnly cookie is a standard pattern for stateless auth.
    // We already verified it, so it's safe to use.
    
    // However, the original token has a 10m expiry (from requirement).
    // If we want the *session* to last 10 minutes from *now*, we might want to issue a new one 
    // OR just rely on the original token's expiry.
    // Given the short lifespan (10m), using the original token is fine, 
    // provided its remaining time is sufficient.
    // BUT if the user clicks the link 9 minutes in, they only get 1 minute of access.
    // If the requirement "MaxAge: 10 minutes" implies a *rolling* session or a *fixed* session from login,
    // we should probably issue a new "session" token or set the cookie maxAge to 10m.
    
    // Let's create a *new* session-specific token or just use the email as the session claim 
    // if we trust the cookie signature (Next.js cookies are not signed by default unless using a lib).
    // WE MUST SIGN ALL COOKIE CONTENT if we rely on it for auth, OR usage a signed JWT.
    // So we will store a JWT in the cookie.
    
    // We can reuse `verifyPdfAccessToken` to verify the cookie content later 
    // IF the cookie content is the same format (JWT).
    
    response.cookies.set({
      name: 'book_session',
      value: token, // We store the *valid* JWT in the cookie.
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 3, // 3 hours
    });

    return response;

  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.redirect(new URL(`/${locale}/services/book-access?error=invalid_token`, request.url));
  }
}
