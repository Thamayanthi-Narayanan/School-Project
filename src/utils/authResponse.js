const readToken = (payload) => {
  if (!payload || typeof payload !== 'object') return null;

  return (
    payload.token
    ?? payload.accessToken
    ?? payload.access_token
    ?? payload.jwt
    ?? payload.bearerToken
    ?? null
  );
};

const collectPayloadCandidates = (response) => {
  const candidates = [response?.data, response];

  if (response?.data && typeof response.data === 'object') {
    candidates.push(response.data.data, response.data.auth, response.data.login);
  }

  return candidates.filter((item) => item && typeof item === 'object');
};

/**
 * Normalizes login / verify-otp API payloads into session fields.
 */
export const extractAuthSessionFromResponse = (response) => {
  if (!response?.success) return null;

  const topLevelToken = readToken(response);
  if (topLevelToken) {
    return {
      token: String(topLevelToken),
      user: response.user ?? response.data?.user ?? null,
      expiresIn: response.expiresIn ?? response.data?.expiresIn ?? null,
    };
  }

  for (const payload of collectPayloadCandidates(response)) {
    const token = readToken(payload);
    if (!token) continue;

    return {
      token: String(token),
      user: payload.user ?? payload.userDetails ?? response.data?.user ?? null,
      expiresIn: payload.expiresIn ?? payload.expires_in ?? null,
    };
  }

  return null;
};
