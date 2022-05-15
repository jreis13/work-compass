const books_array = [
  {
    isbn: "9780143111597",
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    year: "1969",
    available_copies: 1,
    max_copies: 10,
  },
  {
    isbn: "9781472258229",
    title: "Kindred",
    author: "Octavia E. Butler",
    year: "1979",
    available_copies: 10,
    max_copies: 10,
  },
  {
    isbn: "9780441569595",
    title: "Neuromancer",
    author: "William Gibson",
    year: "1984",
    available_copies: 4,
    max_copies: 10,
  },
  {
    isbn: "9781857231380",
    title: "Consider Phlebas",
    author: "Iain M. Banks",
    year: "1987",
    available_copies: 7,
    max_copies: 10,
  },
  {
    isbn: "9780553283686",
    title: "Hyperion",
    author: "Dan Simmons",
    year: "1989",
    available_copies: 0,
    max_copies: 10,
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function lookup(isbn) {
  const book = books_array.filter((res) => res.isbn === isbn);

  if (book.length > 0) {
    console.log(`Searching for your book...`);

    await sleep(2000);

    console.log(
      `Book found: ${book[0].title}, written by ${book[0].author} - (${book[0].year})`
    );

    console.log(`Available copies: ${book[0].available_copies}`);
  } else {
    console.log("We're sorry but we don't have this book in our library.");
  }
}

async function add(isbn, amount = 1) {
  const book = books_array.filter((res) => res.isbn === isbn);

  if (book.length > 0) {
    book[0].available_copies += amount;
    console.log(`Adding copies to selected book...`);

    await sleep(2000);

    console.log(`Added ${amount} copies to ${book[0].title}.`);
  } else {
    console.log("We're sorry but we don't have this book in our library.");
  }
}

function borrow(isbn) {
  const book = books_array.filter((res) => res.isbn === isbn);

  if (book.length > 0 && book[0].available_copies > 0) {
    book[0].available_copies -= 1;
    console.log(
      `Borrowed a copy of ${book[0].title}, written by ${book[0].author} - (${book[0].year})`
    );
  } else if (book.length > 0 && book[0].available_copies === 0) {
    console.log(
      `We're sorry but we don't have any copy of ${book[0].title} at the moment. Try again later!`
    );
  } else {
    console.log("We're sorry but we don't have this book in our library.");
  }
}

function restore(isbn) {
  const book = books_array.filter((res) => res.isbn === isbn);

  if (book.length > 0 && book[0].available_copies + 1 <= book[0].max_copies) {
    book[0].available_copies += 1;
    console.log(`Succesfully returned your copy of ${book[0].title}`);
  } else if (
    book.length > 0 &&
    book[0].available_copies + 1 > book[0].max_copies
  ) {
    console.log("Oops, it seems like this book is not ours!");
  } else {
    console.log("We're sorry but we don't have this book in our library.");
  }
}

async function stock() {
  console.log(`Checking stock...`);

  await sleep(2000);

  console.log(`Current stock is:`);
  books_array.forEach((book) =>
    console.log(
      `${book.title} with ISBN #${book.isbn} has ${book.available_copies} copies in stock.`
    )
  );
}

/*  --- Lookup ---
lookup('9780441569595') // Gives us Neuromancer by William Gibson (1984)

lookup('123') // Gives us error message
*/

/* --- Add ---
add('9780441569595') // Adds 1 copy to Neuromancer's stock

add('9780441569595', 10) // Adds 10 copies to Neuromancer's stock

add('123') // Gives us error message
*/

/* --- Borrow ---
borrow('9781472258229') // Borrows a copy of Kindred

borrow('9780553283686') // Gives us error message (Hyperion has 0 copies available by default)

borrow('123') // Gives us error message
*/

/* --- Return ---
restore('9781857231380') // Returns a copy of Consider Phlebas

restore('9781472258229') // Gives us error message because Kindred has 10 available and 10 max copies.

restore('123') // Gives us error message
*/

/* --- Stock ---
stock() // Checks our library stock
*/
