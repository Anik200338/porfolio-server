const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://porfolio-745f0.web.app',
      'https://porfolio-745f0.firebaseapp.com',
    ],
  })
);
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://portfolio:EdYw36xCKt7FICfD@cluster0.scvnlgi.mongodb.net/?appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const db = client.db('portfolio');
    const userDetailsCollection = db.collection('userdeatails');
    const SkillCollection = db.collection('Skills');
    const ProjectsCollection = db.collection('Projects');
    const EducationCollection = db.collection('Education');
    app.get('/user', async (req, res) => {
      const user = await userDetailsCollection.findOne();
      res.json(user);
    });
    app.get('/skills', async (req, res) => {
      const skill = await SkillCollection.findOne();
      res.json(skill);
    });
    app.get('/Projects', async (req, res) => {
      const projects = await ProjectsCollection.find().toArray(); // Fetching multiple projects
      res.json({ projects }); // Wrapping in an object to match the front-end structure
    });
    app.get('/Education', async (req, res) => {
      const Education = await EducationCollection.find().toArray(); // Fetching multiple projects
      res.json({ Education }); // Wrapping in an object to match the front-end structure
    });

    // Send a ping to confirm a successful connection
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('portfolio is sitting');
});

app.listen(port, () => {
  console.log(`portfolio is sitting on port ${port}`);
});
