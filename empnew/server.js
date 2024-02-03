const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const mongoURI = 'mongodb+srv://hey:babe@cluster0.ybhddin.mongodb.net/empdb';
const dbName = 'employeeManagement';
const collectionName = 'employees';

app.get('/api/getEmployees', async (req, res) => {
    try {
        const client = new MongoClient(mongoURI);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const employees = await collection.find().toArray();

        client.close();

        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
