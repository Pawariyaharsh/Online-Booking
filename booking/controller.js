
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
  return res.send("Welcome");
};

const signUp = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const coll = client.db('book').collection('signup');
    const oldUser = await coll.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(400).json({ success: false, message: 'User Already Exists' });
    }

    const data = req.body;
    data.password = await bcrypt.hash(data.password, 5);

    await coll.insertOne(data);
    client.close();

    return res.status(201).json({ success: true, message: 'Signup successful', user: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const signIn = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/');
    const coll = client.db('book').collection('signup');
    const result = await coll.findOne({ email: req.body.email });
    client.close();
    if (result) {
      const isValidUser = await bcrypt.compare(req.body.password, result.password);
      if (isValidUser) {
        console.log('User authenticated successfully');
        return res.json({ valid: 1, user: { _id: result._id, name: result.name, email: result.email } });
      } else {
        console.log('Invalid password');
        return res.json({ valid: 0, error: 'Invalid password' });
      }
    } else {
      console.log('User not found');
      return res.json({ valid: 0, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const adminSignUp = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const coll = client.db('book').collection('admin');
    const oldAdmin = await coll.findOne({ email: req.body.email });

    if (oldAdmin) {
      return res.status(400).json({ success: false, message: 'Admin Already Exists' });
    }

    const data = req.body;
    data.password = await bcrypt.hash(data.password, 5);

    await coll.insertOne(data);
    client.close();

    return res.status(201).json({ success: true, message: 'Admin signup successful', admin: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const adminSignIn = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/');
    const coll = client.db('book').collection('admin');
    const result = await coll.findOne({ email: req.body.email });
    client.close();
    if (result) {
      const isValidAdmin = await bcrypt.compare(req.body.password, result.password);
      if (isValidAdmin) {
        console.log('Admin authenticated successfully');
        const token = jwt.sign({ id: result._id }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.json({ valid: 1, admin: { _id: result._id, username: result.username, email: result.email }, token });
      } else {
        console.log('Invalid password');
        return res.json({ valid: 0, error: 'Invalid password' });
      }
    } else {
      console.log('Admin not found');
      return res.json({ valid: 0, error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addProduct = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const coll = client.db('grocery').collection('products');

    const productData = req.body;
    await coll.insertOne(productData);
    client.close();
    res.send("Product added successfully");
  } catch (error) {
    res.send("Internal server error.");
  }
};


const updateProduct = async (req, res) => {
  const { _id, ProductID, ProductName, Category, Price, Stock } = req.body;

  try {
    
    if (!_id || !ProductID || !ProductName || !Category || Price === undefined || Stock === undefined) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
    const db = client.db('grocery');
    const coll = db.collection('products');

    
    const updateData = { ProductID, ProductName, Category, Price, Stock };

    
    const result = await coll.updateOne(
      { _id: new ObjectId(_id) }, 
      { $set: updateData } 
    );

    client.close();

    
    if (result.matchedCount > 0) {
      return res.status(200).json({ message: 'Product updated successfully' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUser = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/');
    const coll = client.db('book').collection('signup');
    const user = await coll.findOne({ _id: new ObjectId(req.params.userId) });
    client.close();
    if (user) {
      res.json({ name: user.name, email: user.email });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const coll = client.db('book').collection('signup');
    const userId = req.params.userId;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const updateData = {};
    if (req.body.fullName) {
      updateData.fullName = req.body.fullName;
    }
    if (req.body.email) {
      updateData.email = req.body.email;
    }

    const result = await coll.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );
    
    if (result.matchedCount > 0) {
      // Fetch the updated user document and return it
      const updatedUser = await coll.findOne({ _id: new ObjectId(userId) });
      client.close();
      res.json({ success: true, message: "User updated successfully", user: updatedUser });
    } else {
      client.close();
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/');
    const coll = client.db('grocery').collection('products');
    const products = await coll.find().toArray();
    client.close();
    res.json(products);
  } catch (error) {
    res.send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const coll = client.db('grocery').collection('products');
    const { productId } = req.body;

    const result = await coll.deleteOne({ _id: new ObjectId(productId) });

    client.close();

    if (result.deletedCount > 0) {
      res.send("Product deleted successfully");
    } else {
      res.send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const addToCart = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const cartColl = client.db('book').collection('carts');
    const { userId, product } = req.body;

    let cart = await cartColl.findOne({ userId });
    if (!cart) {
      cart = { userId, items: [] };
    }

    const existingProduct = cart.items.find(item => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.items.push({ ...product, quantity: 1 });
    }

    await cartColl.updateOne({ userId }, { $set: cart }, { upsert: true });
    return res.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      client.close();
    }
  }
};


const removeFromCart = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const cartColl = client.db('book').collection('carts');
    const { userId, productName } = req.body;

    // Find the user's cart
    let cart = await cartColl.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(item => item.name !== productName);
    await cartColl.updateOne({ userId }, { $set: cart });
    client.close();
    res.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCart = async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const cartColl = client.db('book').collection('carts');
    const { userId, productName, quantity } = req.body;

    // Find the user's cart
    let cart = await cartColl.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Update the quantity of the product
    const product = cart.items.find(item => item.name === productName);
    if (product) {
      product.quantity = quantity;
      if (product.quantity <= 0) {
        cart.items = cart.items.filter(item => item.name !== productName);
      }
    }

    await cartColl.updateOne({ userId }, { $set: cart });
    client.close();
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCart = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const cartColl = client.db('book').collection('carts');
    const { userId } = req.params;

    const cart = await cartColl.findOne({ userId });
    if (cart) {
      return res.json(cart);
    } else {
      return res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error getting cart:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      client.close();
    }
  }
};

const placeOrder = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const ordersColl = client.db('grocery').collection('orders');
    const { user, items, total } = req.body;

    if (!user || !items || !total) {
      console.log('Missing required fields:', { user, items, total });
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const orderData = {
      user,
      items,
      total,
      date: new Date()
    };

    await ordersColl.insertOne(orderData);
    res.status(201).json({ success: true, message: 'Order placed successfully', order: orderData });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    if (client) {
      client.close();
    }
  }
};

const getOrders = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    const ordersColl = client.db('grocery').collection('orders');
    const orders = await ordersColl.find().toArray();

    if (orders.length > 0) {
      res.json({ success: true, orders });
    } else {
      res.json({ success: true, message: 'No orders found' });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    if (client) {
      client.close();
    }
  }
};


module.exports = { home, signUp, signIn, adminSignUp, adminSignIn, addProduct, updateProduct, deleteProduct, getUser,addToCart,removeFromCart,updateCart,getCart, updateUser, getProducts ,placeOrder, getOrders};

