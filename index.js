//Frame work
const express = require("express");

//Database
const database = require("./database/index");

// Initializing express
const shapeAI = express();

// Configurations
shapeAI.use(express.json());


//------------------------------ GET ------------------------------
//------------------------------ BOOKAPI ------------------------------
/*
Route                    /
Description              get all books
Access                   PUBLIC
Parameter                NONE
Method                   GET
*/
shapeAI.get("/", (req, res) => {
    return res.json({ books: database.books});
});


/*
Route                    /
Description              get specific book based on ISBN
Access                   PUBLIC
Parameter                ISBN
Method                   GET
*/

shapeAI.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({book: getSpecificBook});
});

/*
Route                    /c/ 
Description              get specific books based on category
Access                   PUBLIC
Parameter                Category
Method                   GET
*/
shapeAI.get("/c/:category", (req, res) => {
    const getSpecificBooks = database.books.filter((book) =>
       book.category.includes(req.params.category)
    );
    if(getSpecificBooks.length === 0){
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    } 

    return res.json({book: getSpecificBooks});
});


/*
Route                    /a/ 
Description              get specific books based on author
Access                   PUBLIC
Parameter                AUTHOR
Method                   GET
*/
shapeAI.get("/a/:authors", (req, res) => {
    const getSpecificBooks = database.books.filter((book) =>
       book.authors.includes(req.params.authors)
    );
    if(getSpecificBooks.length === 0){
        return res.json({
            error: `No book found for the author ${req.params.authors}`,
        });
    } 

    return res.json({book: getSpecificBooks});
});

//------------------------------ AUTHOR API ------------------------------
/*
Route                    /author
Description              get all authors
Access                   PUBLIC
Parameter                NONE
Method                   GET
*/
shapeAI.get("/author", (req, res) => {
    return res.json({ authors: database.authors});
});


/*
Route                    /
Description              get specific author based on ISBN
Access                   PUBLIC
Parameter                ISBN
Method                   GET
*/
shapeAI.get("/ia/:isbn", (req, res) => {
    const getSpecificBook = database.authors.filter(
        (author) => author.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No author found for the ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({author: getSpecificBook});
});


/*
Route                    /author
Description              get a list of authors based on book's ISBN
Access                   PUBLIC
Parameter                ISBN
Method                   GET
*/
shapeAI.get("/author/:isbn", (req, res) => {
    const getSpecificAuthors = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthors.length === 0){
        return res.json({
            error: `No author found for the ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({authors: getSpecificAuthors});
});

//------------------------------ PUBLICATION API ------------------------------
/*
Route                    /publication
Description              get all publications
Access                   PUBLIC
Parameter                NONE
Method                   GET
*/
shapeAI.get("/publications", (req, res) => {
    return res.json({publications: database.publications});
});


/*
Route                    /
Description              to get specific publication
Access                   PUBLIC
Parameter                ISBN
Method                   GET
*/
shapeAI.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({book: getSpecificBook});
});

//------------------------------ POST ------------------------------
/*
Route                    /book/new
Description              add new books
Access                   PUBLIC
Parameter                NONE
Method                   POST
*/
shapeAI.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books, message: "book was added!" });
});

/*
Route                    /author/new
Description              add new author
Access                   PUBLIC
Parameter                NONE
Method                   POST
*/
shapeAI.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    database.authors.push(newAuthor);
    return res.json({ authors: database.authors, message: "author was added!" });
});

/*
Route                    /publication/new
Description              add new publication
Access                   PUBLIC
Parameter                NONE
Method                   POST
*/
shapeAI.post("/publication/new", (req, res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);
    return res.json({ publications: database.publications, message: "publication was added!" });
});

//------------------------------ PUT ------------------------------
/*
Route                    /book/update
Description              update title of a book
Access                   PUBLIC
Parameter                ISBN
Method                   PUT
*/
shapeAI.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.bookTitle;
            return;
        }
    }); 
    return res.json({ books: database.books});   
});

/*
Route                    /book/author/update
Description              update/add new author
Access                   PUBLIC
Parameter                ISBN
Method                   PUT
*/
shapeAI.put("/book/author/update/:isbn", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) 
        return book.authors.push(req.body.newAuthor);
    }); 
    
    // update the author database
    database.authors.forEach((author) => {
        if (author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });

    return res.json({
        books: database.books,
        authors: database.authors,
        message: "New author was added🚁",
    });
});

/*
Route                    /author/update
Description              update name of author
Access                   PUBLIC
Parameter                ISBN
Method                   PUT
*/
shapeAI.put("/author/update/:id", (req, res) => {
    database.authors.forEach((author) => {
        if (author.id === req.params.id) {
            author.name = req.body.authorName;
            return;
        }
    }); 
    return res.json({ authors: database.authors});   
});

/*
Route                    /publication/update
Description              update name of a publication
Access                   PUBLIC
Parameter                ISBN
Method                   PUT
*/
shapeAI.put("/publication/update/:id", (req, res) => {
    database.publications.forEach((publication) => {
        if (publication.id === req.params.id) {
            publication.name = req.body.publicationName;
            return;
        }
    }); 
    return res.json({ publications: database.publications});   
});

/*
Route                    /publication/update/book
Description              update/add new book to a publication
Access                   PUBLIC
Parameter                ISBN
Method                   PUT
*/
shapeAI.put("/publication/update/book/:isbn", (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {
        if (publication.id === req.params.pubId) {
            return publication.books.push(req.params.isbn);
        }
    }); 

    // update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({
        books: database.books,
        publications: database.publications,
        message: "Successfully updated publication",
    });
});


shapeAI.listen(3000, () => console.log("Server running!!"));

  