import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      include: {
        balance: true,
      },
    });

    return Response.json(players);
  } catch (error) {
    console.error("GET /api/player error:", error);

    return Response.json({ error: "Failed to load players" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    console.error("POST /api/player error", error);

    return Response.json(
      { error: "Failed to create a player" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const playerId = body.playerId;

    if (!playerId) {
      return Response.json({ error: "playerId is required" }, { status: 400 });
    }

    await prisma.balance.deleteMany({
      where: {
        playerId: playerId,
      },
    });

    await prisma.player.delete({
      where: {
        id: playerId,
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/player error:", error);

    return Response.json(
      { error: "Failed to delete a player" },
      { status: 500 },
    );
  }
}
