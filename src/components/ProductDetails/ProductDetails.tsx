import * as React from 'react';
import { Route } from 'react-router-dom';
import './ProductDetails.css';

import { ProductDetailsProps } from './ProductDetailsProps';
import ProductDetailsState from './ProductDetailsState';

const productList = require('../../mocks/products.json');

export default class ProductDetails extends React.Component<ProductDetailsProps, ProductDetailsState> {

    productSize: any[];
    productImage: any;
    productDetail: any;

    constructor(props: ProductDetailsProps) {
        super(props);
        this.state = new ProductDetailsState();
        this.state = {
            cartBtnDisable: true,
            price: "999",
            product: productList,
            size: "L",
            source: "Suvidha Karnal"
        }
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.getPrice = this.getPrice.bind(this);
    }

    componentDidMount() {
        this.setState({ product: productList })
    }

    getImage() {
        this.productImage = productList.product.image;
        localStorage.setItem("productImage", this.productImage);
    }

    handleSelectChange(event: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            size: event.currentTarget.value
        });
    }

    handleSourceChange(event: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            source: event.currentTarget.value
        });
        this.forceUpdate();
        this.getPrice(event.currentTarget,value);
    }

    getProduct(product: any) {
        if (this.state.size) {
            const pSource = product.sizes[this.state.size].sources;
            return pSource.map((source: any) => <option key={source.host} value={source.host}>{source.host}</option>);
        }
    }

    getPrice(source: string) {
        let i = 0;
        while (i < productList.product.sizes[this.state.size].sources.length) {
            if (source === productList.product.sizes[this.state.size].sources[i].host) {
                this.setState({
                    price: productList.product.sizes[this.state.size].sources[i].discounted_price
                });
                this.forceUpdate();
            }
            i++;
        }
    }

    getDetails() {
        this.productSize = productList.product.sizes;
        return Object.keys(this.productSize).map(size => <option key={size} value={size}>{size}</option>);
    }

    render() {
        this.productDetail = {
            ProductBrand: this.state.product.product.brand,
            ProductPrice: this.state.price,
            ProductSex: this.state.product.product.sex,
            ProductSize: this.state.size,
            ProductTitle: this.state.product.product.title
        }

        return (
            <div className="mainContainer">
                <div className="leftWrapper">
                    {this.getImage()}
                    <img src={this.productImage} height="500" width="300" />
                </div>
                {this.state.product &&
                    <div className="rightWrapper">
                        <label className="pTitle">{this.state.product.product.title}</label>
                        <hr className="divider" />
                        <div className="pId">
                            <span className="spanTitle">ID: </span>
                            <span className="spanSubtitle">{this.state.product.product.product_id} </span>
                        </div>
                        <div className="pSex">
                            <span className="spanTitle">Sex: </span>
                            <span className="spanSubtitle">{this.state.product.product.sex} </span>
                        </div>
                        <div className="pBrand">
                            <span className="spanTitle">Brand: </span>
                            <span className="spanSubtitle">{this.state.product.product.brand}</span>
                        </div>
                        <div className="pSize">
                            <span className="spanTitle">Size: </span>
                            <span className="spanSubtitle">
                                <select value={this.state.size} onChange={this.handleSelectChange}>
                                    {this.getDetails()}
                                </select>
                            </span>
                        </div>
                        <div className="pSource">
                            <span className="spanTitle">Source: </span>
                            <select onChange={this.handleSourceChange}>
                                <option>---Select Source---</option>
                                {this.getProduct(productList.product)}

                            </select>
                        </div>
                        <div className="pPrice">
                            <span className="spanTitle">Price: </span>

                            <span className="spanSubtitle">{this.state.price}</span>
                        </div>
                        <hr className="divider" />
                        <div>
                            <button className="addToCart" onClick={() => {
                                if (this.productDetail) {
                                    localStorage.setItem("productDetail", JSON.stringify(this.productDetail));
                                    this.setState({
                                        cartBtnDisable: false
                                    })
                                }
                            }}> Add to Cart
                            </button>
                            <Route render={({ history }) => (
                                <button
                                    className={this.state.cartBtnDisable ? "goToCartDisable" : "goToCartEnable"}
                                    onClick={() => {
                                        history.push('/cart');
                                    }}
                                    disabled={this.state.cartBtnDisable}
                                >
                                    Go To Cart
                                </button>
                            )} />
                        </div>
                    </div>
                }
            </div >
        );
    }
}