const express = require('express');
const router = express.Router();
const mongoDB = require('mongodb');

const mongoClient = mongoDB.MongoClient;
const dbUrl = 'mongodb://localhost:27017';

router.get('/api/categories', (request, response) => {
  getCategories(response);
});

router.post('/api/add-category', (request, response) => {
  addCategory(request, response);
});

router.post('/api/delete-category', (request, response) => {
  deleteCategory(request, response);
});

router.put('/api/update-category', (request, response) => {
  updateCategory(request, response);
});

function getCategories(response) {
  mongoClient.connect(dbUrl,
    { useNewUrlParser: true }, (error, client) => {
      if (error) {
        return error;
      } else {
        let db = client.db('categoriesDatabase');
        let collection = db.collection('categories');
        collection.find({}).toArray((error, categories) => {
          if (error) {
            response.send(error);
          }
          response.json({categories: categories});
          client.close();
        });
      }
    });
}

function addCategory(request, response) {
  mongoClient.connect(dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if (error) {
        return error;
      } else {
        const category = request.body.category;
        let db = client.db('categoriesDatabase');
        let collection = db.collection('categories');
        collection.insertOne(category)
          .then(() => {
            response.json({ message: 'Category has been added successfully' });
            client.close();
          })
          .catch((error) => console.log(`Error: ${error}`));
      }
    });
}

function deleteCategory(request, response) {
  mongoClient.connect(dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if (error) {
        return error;
      } else {
        const id = request.body.id;
        let db = client.db('categoriesDatabase');
        let collection = db.collection('categories');
        collection.deleteMany({ '_id': new mongoDB.ObjectID(id) })
          .then(() => {
            response.json({ message: 'Category has been deleted successfully' });
            client.close();
          })
          .catch((error) => console.log(`Error: ${error}`));
      }
    });
}

function updateCategory(request, response) {
  mongoClient.connect(dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if (error) {
        return error;
      } else {
        let db = client.db('categoriesDatabase');
        let collection = db.collection('categories');
        const updatedCategory = request.body.category;
        const id = request.body.category._id;
        delete updatedCategory._id;
        collection.findOneAndUpdate(
          { '_id': new mongoDB.ObjectID(id) },
          { $set: updatedCategory },
          { new: true, upsert: true },
        )
          .then(() => {
            response.json({ message: 'Category has updated successfully' });
            client.close();
          })
          .catch((error) => console.log(`Error: ${error}`));
      }
    });
}

module.exports = router;