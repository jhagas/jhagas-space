import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.slug.length > 0 && body.name.length > 0 && body.comment.length > 0) {
    await sql`INSERT INTO comment(slug, name, comment) VALUES (${body.slug}, ${body.name}, ${body.comment})`;
    return new Response("success");
  } else {
    return new Response("error");
  }
}
