import { getDataSource } from "@/database";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { User } from "@/database/entities";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  // 必须加这个，否则会报错：'JWEDecryptionFailed: decryption operation failed\n'
  secret: "doumiblog", // process.env.AUTH_SECRET,
  callbacks: {
    // session会把下面的user信息塞到/api/auth/session里面，前端就会拿到用户信息
    session: async ({ session, token }) => {
      session.user.id = token.uid as number;
      session.user.email = token.email as string;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        // TODO: 如何加入用户名字？
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("邮箱或者密码必填，请重新输入");
        }
        const AppDataSource = await getDataSource();
        const user = await AppDataSource.getRepository(User).findOne({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("邮箱或者密码不正确，请重新输入");
        }
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
