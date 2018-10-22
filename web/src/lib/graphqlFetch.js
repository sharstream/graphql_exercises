const options = {
  // Default options are marked with *
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, cors, *same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, same-origin, *omit
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  redirect: "follow", // manual, *follow, error
  referrer: "no-referrer", // no-referrer, *client
}

export default url => args => {
  const body = JSON.stringify(args);
  return fetch(url, { ...options, body})
          .then(res =>  res.json());
}