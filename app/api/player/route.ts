import { prisma } from "@/lib/prisma";

export async function GET() {
  const players = await prisma.player.findMany({
    include: {
      balance: true,
    },
  });

  return Response.json(players);
}

export async function POST(request: Request) {
  const body = await request.json();

  const player = await prisma.player.create({
    data: {
      name: body.name,
      balance: {
        create: {
          amount: 0,
        },
      },
    },
    include: {
      balance: true,
    },
  });

  return Response.json(player);
}
