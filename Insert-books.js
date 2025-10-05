
// insert_books.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // Remove old data
    await books.deleteMany({});

    // Insert 10 sample books
    const sampleBooks = [
      { title: "The Great Adventure", author: "John Doe", genre: "Fiction", published_year: 2018, price: 19.99, in_stock: true, pages: 320, publisher: "HarperCollins" },
      { title: "Secrets of the Universe", author: "Jane Smith", genre: "Science", published_year: 2020, price: 24.5, in_stock: true, pages: 410, publisher: "Penguin Books" },
      { title: "The Hidden Path", author: "Michael Brown", genre: "Mystery", published_year: 2015, price: 15, in_stock: false, pages: 280, publisher: "Simon & Schuster" },
      { title: "Cooking Made Easy", author: "Emily Clark", genre: "Cooking", published_year: 2012, price: 22, in_stock: true, pages: 200, publisher: "FoodHouse Press" },
      { title: "Ancient Civilizations", author: "Robert Johnson", genre: "History", published_year: 2009, price: 18.75, in_stock: false, pages: 350, publisher: "HistoryWorks" },
      { title: "Mind Over Matter", author: "Jane Smith", genre: "Self-Help", published_year: 2021, price: 27.5, in_stock: true, pages: 295, publisher: "InspirePress" },
      { title: "Old Tales", author: "John Doe", genre: "Fiction", published_year: 2005, price: 12.99, in_stock: false, pages: 220, publisher: "Classic Reads" },
      { title: "Modern Economics", author: "Linda Adams", genre: "Education", published_year: 2019, price: 30, in_stock: true, pages: 500, publisher: "Academic Press" },
      { title: "Gardening for All", author: "Sarah Lee", genre: "Lifestyle", published_year: 2016, price: 16.99, in_stock: true, pages: 180, publisher: "GreenLeaf Publications" },
      { title: "Digital Future", author: "Michael Brown", genre: "Technology", published_year: 2022, price: 28.99, in_stock: true, pages: 340, publisher: "TechWorld" }
    ];

    const result = await books.insertMany(sampleBooks);
    console.log(`Inserted ${result.insertedCount} books successfully.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();