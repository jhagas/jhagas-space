import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      const body = JSON.parse(req.body);
      if (
        body.slug.length > 0 &&
        body.name.length > 0 &&
        body.comment.length > 0
      ) {
        await sql`INSERT INTO comment(slug, name, comment) VALUES (${body.slug}, ${body.name}, ${body.comment})`;
      }
      res.status(200).json("success");
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
