import { SignJWT } from "jose";

export async function createJwt(userId: string | undefined = 'anon', workspaceId: string | undefined = 'default') {
    if (!process.env.ZERO_AUTH_SECRET) {
        throw new Error('ZERO_AUTH_SECRET is not set')
    }

    const jwtPayload = {
        sub: userId,
        workspaceId,
        iat: Math.floor(Date.now() / 1000),
    };

    const jwt = await new SignJWT(jwtPayload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1w")
        .sign(new TextEncoder().encode(process.env.ZERO_AUTH_SECRET));

    return jwt
}