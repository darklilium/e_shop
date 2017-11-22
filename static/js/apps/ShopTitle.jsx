import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image, Button, Feed } from 'semantic-ui-react';

const ShopTitle = () => (
   <div className="wrapper_shopTitle"><Icon name='shopping cart' size='massive'/><h1>Shopping Cart</h1></div>
 )

/*
 var formatter = new Intl.NumberFormat('es-CL', {
   style: 'currency',
   currency: 'CLP',
   minimumFractionDigits: 0,
 });
*/

export default ShopTitle;
