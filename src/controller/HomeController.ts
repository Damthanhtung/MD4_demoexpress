import {Request, Response} from "express";
import productService from "../service/ProductService";
import categoryService from "../service/CategoryService";

class HomeController {
    private productService;
    private categoryService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    showHome = async (req: Request, res: Response) => {
        let products = await productService.getAll();
        res.render('home', {products: products})
    }

    showFormCreate = async (req: Request, res: Response) => {
        let categories = await this.categoryService.getAll();
        res.render('products/create',{categories:categories});
    }

    create = async (req: Request, res: Response) => {
        if (req.files) {
            let image = req.files.image;
            if ("mv" in image) {
                await image.mv('./public/storage/' + image.name)
                let product = req.body;
                product.image = '/storage/' + image.name;
                await productService.save(product);
                res.redirect(301, '/home');
            }
        }
    }
    showFormEdit =  async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await this.productService.findById(id);
        res.render('products/edit', {product: product});
    }
    updateProduct = async (req: Request, res: Response) => {
        let id = req.params.id;
        if (req.files) {
            let image = req.files.image;
            if ("mv" in image) {
                await image.mv('./public/storage/' + image.name)
                let product = req.body;
                product.image = '/storage/' + image.name;
                await this.productService.update(id,req.body);
                res.redirect(301, '/home');
            }
        }
    }
    showFormDelete = async (req: Request, res: Response) => {
        let idDelete = req.params.id;
        res.render('products/delete', {idDelete: idDelete});
    }
    remove =  async (req: Request, res: Response) => {
        let id = req.params.id;
        await this.productService.remove(id);
        res.redirect(301, '/home');
    }
}

export default new HomeController();