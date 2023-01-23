import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

import spotifyAPI, { LOGIN_URL } from "../../../lib/spotify";


const refreshAccessToken = async (token) => {
  try {
    spotifyAPI.setAccessToken(token.accessToken),
      spotifyAPI.setRefreshToken(token.refreshToken);

      const { body:refreshedToken } = await spotifyAPI.refreshAccessToken()
      console.log('Refresh Token is',refreshedToken)

      return {
        ...token,
        accessToken: refreshedToken.access_token,
        accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
        refreshToken: refreshedToken.refresh_token?? token.refreshToken
      }
  } catch (err) {
    console.log(err);
    return {
      ...token,
      error: "refreshAccessTokenError",
    };
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),

    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //Handling Expiry time in milliseconds
        };
      }
      // Return Previous token if still valid
      if (Date.now() < (token.accessTokenExpires)) {
        console.log("Existing Access Token is valid");
        return token;
      }

      //Return new access token if previous token has expired
      console.log("Acess Token has expired, Refreshing...");
      return await refreshAccessToken(token)
    },

    async session({session,token}) {
          session.user.accessToken = token.accessToken;
          session.user.refreshToken = token.refreshToken,
          session.user.username = token.username

          return session
    }
  },
});
