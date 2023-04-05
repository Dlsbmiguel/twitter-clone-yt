import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req);
    // this body comes from prisma schema
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
