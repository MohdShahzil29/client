import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
} from "@simplewebauthn/server";

let users = {};

const encodeUserID = (username) => {
  return new TextEncoder().encode(username);
};

export async function POST(req) {
  try {
    const { action, username } = await req.json();

    if (action === "register") {
      const userID = encodeUserID(username);

      // Generate registration options
      const options = generateRegistrationOptions({
        rpName: "Demo App",
        userID,
        userName: username,
      });

      // Store the challenge
      users[username] = { challenge: options.challenge };

      return new Response(JSON.stringify(options), { status: 200 });
    }

    if (action === "login") {
      const options = generateAuthenticationOptions({
        allowCredentials: [],
      });
      users[username].challenge = options.challenge;

      return new Response(JSON.stringify(options), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Invalid action" }), {
      status: 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
