const { Router } = require('express');
const router = Router();
const menuService = require('../services/menuService');
const formidable = require('formidable');
const { parseForm } = require('../utils/parseForm');
const { deleteImageFromCloudinary } = require('../services/cloudinaryService');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const isWorker = require('../middlewares/isWorker');

router.get('/all-products' , auth , isWorker , async (req,res) => { 
    try {
        const data = await menuService.getAllProducts();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/:category', async (req, res) => {
    try {
        const data = Number(req.query.page) ? await menuService.getNext( req.params.category , Number(req.query.page)) : await menuService.getProductsByMenuCategory(req.params.category);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/product-name/:product' , auth , isWorker , async (req,res) => { 
    try {
        const data = await menuService.getProductByName(req.params.product);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.post('/create-product', auth , isAdmin , async (req, res) => {
    try {
        const form = formidable({ multiples: true });
        const [fields, files] = await parseForm(req, form);
        
        const data = await menuService.createProduct(JSON.parse(fields['inputs']) , files);
        res.status(200).json([data, [files]]);
    } catch (error) {
        res.status(400).json(error);
    }
})


router.post('/delete-product/:id' , auth , isAdmin ,  async (req,res) => { 
    try {
        const data = menuService.deleteProduct(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/product/:id' , async (req,res) => { 
    try {
        const data = await menuService.getProductByID(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error)
    }
})


router.post('/edit-product/:id' , auth , isAdmin ,  async (req,res) => { 
    try {
        const data = await menuService.editProduct(req.params.id , req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.post('/delete-image/:imageID/:productID' , auth , isAdmin , async (req,res) => { 
    try {
        const data = await menuService.deleteImage(req.params.imageID , req.params.productID);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.patch('/update-product/:id' , auth , isAdmin ,  async (req,res) => { 
    try {
        const data = await menuService.updateProduct(req.params.id , req.body[0]);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
})


module.exports = router;