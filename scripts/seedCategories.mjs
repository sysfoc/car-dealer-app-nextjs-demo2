// // scripts/seedCurrencies.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';

dotenv.config();

const currencies = JSON.parse(
  await readFile(new URL('./categories.json', import.meta.url))
);

async function seedDB() {
  try {
    await mongoose.connect("mongodb+srv://sysfoc:obQNWb1ZqnNnqhfO@cardealor.7w3ln.mongodb.net/?retryWrites=true&w=majority&appName=cardealor");
    // await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const Currency = mongoose.model('Currency', new mongoose.Schema({
      name: { type: String, required: true, unique: true },
      symbol: { type: String, required: true },
      value: { type: Number, required: true },
      isDefault: { type: Boolean, default: false }
    }));

    await Currency.deleteMany({});
    const inserted = await Currency.insertMany(currencies);
    console.log(`Seeded ${inserted.length} currencies`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();
