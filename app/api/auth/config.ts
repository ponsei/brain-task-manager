import { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

// 環境に応じたGitHub認証情報を取得
const getGitHubCredentials = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }
  }
  // 開発環境用の認証情報
  return {
    clientId: process.env.GITHUB_ID || '',
    clientSecret: process.env.GITHUB_SECRET || '',
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider(getGitHubCredentials()),
  ],
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
}
