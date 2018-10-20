import query from './db';

export async function reviewsByBookId(id) {
  const sql = `
  select
  hb.review.*
  from hb.review inner join hb.book_review
    on hb.review.id = hb.book_review.review_id
  where hb.book_review.book_id = $1
  `;
  const params = [id];
  try {
    const result = await query(sql, params);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}