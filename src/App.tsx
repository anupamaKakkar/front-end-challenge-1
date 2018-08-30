import * as React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact={true} render={this.renderProductDetails} />
          <Route path="/cart" render={this.renderCartView} />
        </div>
      </BrowserRouter>
    );
  }

  renderProductDetails() {
    return <ProductDetails />
  }

  renderCartView() {
    return <Cart />
  }
}
