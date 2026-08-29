import { prisma } from "@/lib/prisma";

export async function GET() {
  const balances = await prisma.balance.findMany();

  return Response.json(balances);
}

export async function POST(request: Request) {
  const body = await request.json();

  const balance = await prisma.balance.create({
    data: {
      playerId: body.playerId,
      amount: body.amount,
    },
  });

  return Response.json(balance);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const balance = await prisma.balance.update({
    where: {
      playerId: body.playerId,
    },
    data: {
      amount: body.amount,
    },
  });

  return Response.json(balance);
}
