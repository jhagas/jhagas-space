import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request, { params }) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("pagination") || 0;

  const slug = params.slug;

  let max = await sql`SELECT COUNT(slug) FROM comment where slug = ${slug}`;
  let { rows } =
    await sql`SELECT name, comment, time from comment where slug=${slug} LIMIT 5 OFFSET ${
      +query * 5
    }`;

  rows = rows.map((row) => {
    return {
      name: row.name,
      comment: row.comment,
      time: row.time.toISOString(),
    };
  });

  const data = {
    max: max.rows[0].count,
    pagination: 5,
    data: rows,
  };

  return new Response(JSON.stringify(data));
}
