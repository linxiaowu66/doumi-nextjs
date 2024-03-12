import { getDataSource } from "@/database";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { User } from "@/database/entities";

export async function POST(req: Request) {
  const { email, password, username } = await req.json();
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(User);
  const users = await repo.find();

  if (users.length >= 2) {
    return NextResponse.json(
      { error: "注册用户数已满，无法注册！" },
      { status: 400 }
    );
  }
  const exists = await repo.findOne({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "用户已存在" }, { status: 400 });
  } else {
    const user = await repo.save({
      email,
      username,
      password: await hash(password, 10),
    });
    return NextResponse.json({ data: user, code: 200, message: "注册成功！" });
  }
}
export const dynamic = "force-dynamic";
