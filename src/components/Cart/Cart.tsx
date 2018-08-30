import * as React from 'react';
import { Route } from 'react-router-dom';

import { CartProps } from './CartProps';
import { CartState } from './CartState';
import './Cart.css';

export default class Cart extends React.Component<CartProps, CartState> {
    product: any = JSON.parse(localStorage.getItem("productDetail") || '{}');

    constructor(props: CartProps) {
        super(props);
        this.quantityChange = this.quantityChange.bind(this);

        this.state = {
            productDetails: this.product,
            quant: 1,
        }
    }

    componentDidMount() {
        this.setState({ productDetails: this.product })
    }

    quantityChange(event: React.FormEvent<HTMLInputElement>) {
        const value: any = event.currentTarget.value;
        if (value > 0) {
            this.setState({ quant: value });
        }
    }

    render() {
        const imgUrl: any = localStorage.getItem("productImage");

        return (
            <div>
                <div className="cartTitle">
                    <span>My Cart</span>
                </div>
                <div className="cartContainer">

                    <div className="pImage">
                        <img src={imgUrl} height="200" />
                    </div>
                    <div className="productInfo">
                        {this.state.productDetails &&
                            <div className="infoProduct">
                                <label>{this.state.productDetails.ProductTitle}</label>
                                <label>{this.state.productDetails.ProductBrand}</label>
                                <label>Size: {this.state.productDetails.ProductSize}</label>
                                <label>{this.state.productDetails.ProductSex}</label>
                                <label>Quantity: <input type="number" min='1' max='5' value={this.state.quant} onChange={this.quantityChange} /> </label>
                                {this.state.quant &&
                                    <label>Rs.{this.state.productDetails.ProductPrice * this.state.quant}</label>
                                }
                            </div>
                        }
                        <hr className="divider" />
                        <div className="cTALinks">
                            <Route render={({ history }) => (
                                <button
                                    className="cTAButtons"
                                    onClick={() => {
                                        history.push('/')
                                    }}
                                >Edit</button>
                            )} />
                            <Route render={({ history }) => (
                                <button
                                    className="cTAButtons"
                                    onClick={() => {
                                        localStorage.clear();
                                        history.push('/')
                                    }}>Cancel</button>
                            )} />

                            <button className="cTAButtons" onClick={() => {
                                alert("Order Submitted")
                            }}>
                                Submit
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}