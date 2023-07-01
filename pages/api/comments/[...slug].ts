import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  const { slug } = req.query;
  
  let max = await sql`SELECT COUNT(slug) FROM comment where slug = ${slug[0]}`
  let { rows } = await sql`SELECT name, comment, time from comment where slug=${
    slug[0]
  } LIMIT 5 OFFSET ${slug[1] * 5}`;

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

  res.status(200).json(data);
}
