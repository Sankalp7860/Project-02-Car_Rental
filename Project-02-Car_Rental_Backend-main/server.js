require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const carRoutes = require('./routes/car.routes');
const rentalRoutes = require('./routes/rental.routes');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/rentals', rentalRoutes);

const PORT = process.env.PORT || 3000;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'car_rental' 
    });

    res.status(200).json({ message: 'Upload successful', result });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/images', async (req, res) => {
  try {
    
    const images = await cloudinary.api.resources({
      type: 'upload', 
      prefix: 'car_rental/', 
      max_results: 100 
    });

    const imageUrls = images.resources.map(image => image.secure_url);

    res.status(200).json({ images: imageUrls });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
