// queries.js
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // --- Task 2: CRUD Operations ---
    console.log("📚 Books in Fiction:", await books.find({ genre: "Fiction" }).toArray());
    console.log("📖 Books published after 2015:", await books.find({ published_year: { $gt: 2015 } }).toArray());
    console.log("✍️ Books by John Doe:", await books.find({ author: "John Doe" }).toArray());

    await books.updateOne({ title: "The Great Adventure" }, { $set: { price: 25.99 } });
    await books.deleteOne({ title: "Old Tales" });

    // --- Task 3: Advanced Queries ---
    console.log("📦 In-stock & published after 2010:", await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());
    console.log("🔎 Projection:", await books.find({}, { projection: { _id: 0, title: 1, author: 1, price: 1 } }).toArray());
    console.log("⬆️ Sorted by price ascending:", await books.find().sort({ price: 1 }).toArray());
    console.log("⬇️ Sorted by price descending:", await books.find().sort({ price: -1 }).toArray());
    console.log("📄 Pagination (page 2, 5 per page):", await books.find().skip(5).limit(5).toArray());

    // --- Task 4: Aggregation ---
    console.log("💵 Average price by genre:", await books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]).toArray());
    console.log("🏆 Author with most books:", await books.aggregate([{ $group: { _id: "$author", totalBooks: { $sum: 1 } } }, { $sort: { totalBooks: -1 } }, { $limit: 1 }]).toArray());
    console.log("📅 Books grouped by decade:", await books.aggregate([
      { $addFields: { decade: { $concat: [{ $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } }, "s"] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray());

    // --- Task 5: Indexing ---
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: -1 });

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();