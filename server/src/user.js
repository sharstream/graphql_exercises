import { groupBy, map } from 'ramda';
import DataLoader from 'dataloader';
import query from './db';

async function findUsersByIds(ids) {
  const sql = `
  select *
  from hb.user
  where hb.user.id = ANY($1);
  `;
  const params = [ids];
  try {
    const result = await query(sql, params);
    const rowsByIds = groupBy( user => user.id, result.rows);
    console.log(`users ids: ${rowsByIds}`);
    return map(id => {
      const user = rowsByIds[id] ? rowsByIds[id][0] : null;
      return user;
    }, ids);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function findUsersByIdsLoader() {
  return new DataLoader(findUsersByIds);
}

export async function findUserById(id) {
  const sql = `
  select *
  from hb.user
  where hb.user.id = $1;
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

export async function allUsers() {
  const sql = `
  select * from hb.user
  `;
  try {
    const result = await query(sql);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}