import React from 'react';
import ReactDOM from 'react-dom';
import data from '../../../data/mock.json';
import { Card, Icon, Image, Button, Feed } from 'semantic-ui-react';

import ShopTitle from './ShopTitle';
import ShoppingCart from './ShoppingCart';

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        data : data,
        itemsAdded: [],
        totalAmount: 0,
      }
    }

    addItem(item){
      this.setState({itemsAdded: [...this.state.itemsAdded, item.dc], totalAmount: this.state.totalAmount + item.dc.price});
    }

    removeItem(item, index){
      var iAdded = this.state.itemsAdded;
      iAdded.splice(item.index,1);
      this.setState({itemsAdded: iAdded, totalAmount: this.state.totalAmount - item.otl.price});
    }

    render() {
      const {data, itemsAdded, totalAmount} = this.state;

      var items = data.catalog.map((dc, index)=>{
        return <div key={index} className="div_item"><Card key={index}><Image src={dc.imageURL} />
          <Card.Content>
            <Card.Header>{dc.name}</Card.Header>
            <Card.Description> Price: {dc.price}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
               <Button onClick={this.addItem.bind(this,{dc})} basic color='green'>Add</Button>
             </div>
          </Card.Content></Card></div>;
      });

      return (
        <div className="wrapper">
          <ShopTitle />
          <div className="wrapper_">
            <div className="wrapper_items">{items}</div>
            <div className="wrapper_shoppingList"><ShoppingCart onTheList={itemsAdded} totalAmount={totalAmount} removeItem={this.removeItem.bind(this)}/></div>
          </div>
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
