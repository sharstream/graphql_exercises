import { groupBy, map, pathOr } from 'ramda';
import axios from 'axios';
import DataLoader from 'dataloader';
import query from './db';

export async function searchBook(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
  try {
    const result = await axios(url);
    const items = pathOr([],['data', 'items'], result);
    console.log('items: ' + items);
    const books = map(book => ({ id: book.id, ...book.volumeInfo}), items);
    console.log('books: ' + books);
    return books;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function findBooksByIds(ids) {
  const sql = `
  select *
  from hb.book
  where hb.book.id = ANY($1);
  `;
  const params = [ids];
  try {
    const result = await query(sql, params);
    const rowsById = groupBy((book) => book.id, result.rows);
    // console.log(rowsById);
    // console.log(map(id => {
    //   const book = rowsById[id] ? rowsById[id][0] : null;
    //   return book;
    // }, ids));
    return map(id => {
      const book = rowsById[id] ? rowsById[id][0] : null;
      return book;
    } , ids);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function findBooksByIdsLoader() {
  return new DataLoader(findBooksByIds);
}

export async function findBookById(id) {
  const sql = `
   select *
   from hb.book
   where hb.book.id = $1:
  `;

  const params = [id];
  try {
    const result = await query(sql, params);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const ORDER_BY = {
  ID_DESC: 'id desc',
  RATING_DESC: 'rating desc',
}

export async function allBooks(args) {
  const orderBy = ORDER_BY[args.orderBy];
  const sql = `
    select * from hb.book
    order by ${orderBy};
  `;
  try {
    const result = await query(sql);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function imageUrl(size, id) {
  const zoom = size === 'SMALL' ? 1 : 0;
  //books.google.com/books/content?printsec=frontcover&img=1&edge=curl&source=gbs_api&zoom=0&id=POOJDQAAQBAJ
  return `//books.google.com/books/content?printsec=frontcover&img=1&edge=curl&source=gbs_api&zoom=${zoom}&id=${id}`;
}