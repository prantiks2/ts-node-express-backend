import { Request, Response } from "express";
import { findAllProduct, findAllProductCount } from "../repositories/products.repository";


export async function fetchAllProducts(req: Request, res: Response) {
    try {
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        const condition = {};
        const options = {limit, skip: (page-1)*limit};
        const products = await findAllProduct(condition, options);
        const totalProducts = await findAllProductCount(condition, options);
        return res.status(200).json({ message: 'All products', data: {products, totalResults: totalProducts}});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Something went wrong, try again later', error: error });
    }
}