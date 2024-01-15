const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: [true, 'Please enter the product name'],
        trim: true,
        maxLength:[100, 'Product name cannot be exceed 100 characters']
    },
    price:{
        type: Number,
        required: [true, 'Please enter the product price'],
        maxLength:[5, 'Product name cannot be exceed 5 characters'],
        default: 0.0
    },
    description:{
        type: String,
        required: [true, 'Please enter the product description'],
        },
    rating:{
        type: Number,
        default: 0
        },
    images:[
        {
            product_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true, 'Please enter the product category'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select the correct category for the product'
        }
    },
    sellar:{
        type: String,
        required: [true, 'Please enter the product sellar']
    },
    stock:{
        type: Number,
        required: [true, 'Pleae enter the product stock'],
        maxLength:[5, 'Product name cannot be exceed 5 characters'],
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }

})
// module.exports = ['Product' , productSchema];
const Product = mongoose.model('Product', productSchema);
module.exports = Product;