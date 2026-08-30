import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const balances = await prisma.balance.findMany();

    return Response.json(balances);
  } catch (error) {
    console.error("GET /api/balance error:", error);

    return Response.json(
      { error: "Failed to load a balance" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const balance = await prisma.balance.create({
      data: {
        playerId: body.playerId,
        amount: body.amount,
      },
    });

    return Response.json(balance);
  } catch (error) {
    console.error("POST /api/balance error:", error);

    return Response.json(
      { error: "Failed to create a balance" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
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
  } catch (error) {
    console.error("PATCH /api/balance error:", error);

    return Response.json(
      { error: "Failed to change a balance" },
      { status: 500 },
    );
  }
}
