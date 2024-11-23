const getGoogleAuthURL = (clientId, redirectUri) => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    access_type: 'offline',
  });
  return `${baseUrl}?${params.toString()}`;
};

module.exports = { getGoogleAuthURL };
