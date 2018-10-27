import query from './db';

export async function search(term) {
  const books = await searchBooks(term);
  return [...books];
}
//to_tsquery performing Full-Text Search(FTS) in postgreSQL
//use to_tsquery for querying book, review, user, or author
async function searchBooks(term) {
  const sql = `
  select * from hb.book
  where tokens @@ to_tsquery($1);
  `;
  try {
    const params = [term];
    const result = await query(sql, params);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}