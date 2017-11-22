import React from 'react';
import ReactDOM from 'react-dom';
import data from '../../../data/mock.json';
import { Card, Icon, Image, Button, Feed } from 'semantic-ui-react';

class ShoppingCart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cartItems: [],
      totalAmount: 0

    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({cartItems: nextProps.onTheList, totalAmount: nextProps.totalAmount});
  }

  render(){
    const {cartItems, totalAmount} = this.state;
    const inTheCart = cartItems.map((otl, index)=>{

      return (
        <Card.Content key={index}>
          <Feed>
            <Feed.Event>
              <Feed.Label image={otl.imageURL} />
              <Feed.Content>
              <Feed.Summary>
                 <a>Price: {otl.price}</a>.
              </Feed.Summary>
                <Feed.Summary>
                  You added <a>{otl.name}</a> to your <a>shopping list</a>.
                </Feed.Summary>
                <Feed.Summary>
                   <Button onClick={this.props.removeItem.bind(this,{otl,index})}basic color='red'>Remove</Button>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      );
    });

    return (
      <div>
        <Card>
            <Card.Content>
              <Card.Header>
                On the List
              </Card.Header>
            </Card.Content>

            <Card.Content>
              <Card.Header>
                <b>Total: $ {totalAmount}</b>
              </Card.Header>
            </Card.Content>

            {inTheCart}
        </Card>

      </div>
    );

  }
}

var formatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
});


const ShopTitle = () => (
   <div className="wrapper_shopTitle"><Icon name='shopping cart' size='massive'/><h1>Shopping Cart</h1></div>
 )

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
