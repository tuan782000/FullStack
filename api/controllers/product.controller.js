import Product from '../models/Product.model.js';

// Tạo mới sản phẩm
const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct); // Trả về mã 201 cho việc tạo mới thành công
    } catch (err) {
        console.error('Error creating product:', err);
        return res
            .status(500)
            .json({
                message: 'An error occurred while creating the product',
                error: err.message
            });
    }
};

// Cập nhật thông tin sản phẩm
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        return res
            .status(500)
            .json({
                message: 'An error occurred while updating the product',
                error: err.message
            });
    }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product has been deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        return res
            .status(500)
            .json({
                message: 'An error occurred while deleting the product',
                error: err.message
            });
    }
};

// Lấy thông tin một sản phẩm
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        return res
            .status(500)
            .json({
                message: 'An error occurred while fetching the product',
                error: err.message
            });
    }
};

// Lấy tất cả sản phẩm hoặc lọc theo tiêu chí
const getAllProduct = async (req, res) => {
    const { new: qNew, category: qCategory } = req.query;

    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5); // Lấy 5 sản phẩm mới nhất
        } else if (qCategory) {
            products = await Product.find({
                categories: { $in: [qCategory] }
            });
        } else {
            products = await Product.find();
        }

        return res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        return res
            .status(500)
            .json({
                message: 'An error occurred while fetching products',
                error: err.message
            });
    }
};

export {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProduct
};
