const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'canvas' },
    { name: 'Figure Drawings' },
    { name: 'Portraits' },
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Fairytale',
      description: 'Full colour digital painting',
      image: '/Images/p1.jpg',
      category: categories[0]._id,
      price: 120,
      quantity: 10,
    },
    {
      name: 'Cabarete',
      description:
        'Black and white digital figure illustration with accented colours',
      image: '/Images/p2.jpg',
      category: categories[0]._id,
      price: 110,
      quantity: 10,
    },
    {
      name: 'Paloma',
      description: 'Full colour digital portrait of Paloma in No Time To Die',
      image: '/Images/p3.jpg',
      category: categories[0]._id,
      price: 100,
      quantity: 10,
    },
    {
      name: 'Odette',
      description: 'Full colour portrait of actress Odette Anabelle',
      image: '/Images/p4.jpg',
      category: categories[0]._id,
      price: 90,
      quantity: 10,
    },
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[0]._id],
      },
    ],
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
  });

  console.log('users seeded');

  process.exit();
});
