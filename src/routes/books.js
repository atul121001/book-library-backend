const express = require('express');
const router = express.Router();
const {Book} = require('../model/Book')

router.post('/book/create', async(req, res)=>{
    const {title, author, status, description} = req?.body;
    const bookConfig = {title, author, status, description};
    const book = new Book(bookConfig);
    try{
         await book.save();
         res.status(200).send("books created");
    } catch(error){
        res.status(400).send(error?.message || "Something went wrong!");
    }
   
})

router.patch('/book/:bookID', async(req, res)=>{
    const {bookID} = req.params;

    if(!bookID) {
        return res.status(400).send("Book ID is required");
    }
   
    try {
        const bookDetails = await Book.findById(bookID);
        if(!bookDetails) {
            return res.status(404).send("No Book found to Update");
        }
        
        const {title, author, status, description} = req?.body;
        const updates = {};
        if(title) updates.title = title;
        if(author) updates.author = author;
        if(status) updates.status = status;
        if(description) updates.description = description;
        
        if(Object.keys(updates).length === 0) {
            return res.status(400).send("No valid fields provided for update");
        }
        
        const updatedBook = await Book.findByIdAndUpdate(
            bookID, 
            updates, 
            { new: true, runValidators: true }
        );
        
        res.status(200).json(updatedBook);
    } catch(error) {
        res.status(400).send(error?.message || "Something went wrong!");
    }
})

router.delete('/book/:bookID', async(req, res)=>{
    const {bookID} = req.params;
    
    if(!bookID) {
        return res.status(400).send("Book ID is required");
    }
    
    try{
        const result = await Book.findByIdAndDelete(bookID);
        if (!result) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send("Book deleted");
    } catch(error){
        res.status(400).send(error?.message || "Something went wrong!");
    }
})

router.get('/books', async(req, res)=>{
    try{
        const { title, author, status } = req.query;
        
        // Build query object based on provided parameters
        const query = {};
        
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        
        if (author) {
            query.author = { $regex: author, $options: 'i' };
        }
        
        if (status && ['read', 'unread'].includes(status)) {
            query.status = status;
        }
        
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch(error){
        res.status(400).send(error?.message || "Something went wrong!");
    }
})

router.get('/book/:bookID', async(req, res)=>{
    const {bookID} = req.params;
    if(!bookID) {
        return res.status(400).send("Book ID is required");
    }
    
    try{
        const book = await Book.findById(bookID);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.status(200).json(book);
    } catch(error){
        res.status(400).send(error?.message || "Something went wrong!");
    }
})

module.exports = {router}; 