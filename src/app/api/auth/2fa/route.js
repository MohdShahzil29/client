import speakeasy from "speakeasy";
import qrcode from "qrcode";

let users = {}; // Simple in-memory store for demo purposes

export async function POST(req) {
  const { action, token, username } = await req.json();

  if (action === "generate") {
    const secret = speakeasy.generateSecret({ name: "Demo App" });
    users[username] = { secret: secret.base32 };

    try {
      const qrCode = await qrcode.toDataURL(secret.otpauth_url);
      return new Response(JSON.stringify({ qrCode, secret: secret.base32 }), {
        status: 200,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Error generating QR code" }),
        { status: 500 }
      );
    }
  }

  if (action === "verify") {
    const verified = speakeasy.totp.verify({
      secret: users[username].secret,
      encoding: "base32",
      token,
    });

    if (verified) {
      return new Response(
        JSON.stringify({ message: "2FA verification successful" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Invalid 2FA token" }), {
        status: 400,
      });
    }
  }

  return new Response(JSON.stringify({ message: "Invalid action" }), {
    status: 400,
  });
}
