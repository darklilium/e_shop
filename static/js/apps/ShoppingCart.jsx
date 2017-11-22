import React from 'react';
import ReactDOM from 'react-dom';
import data from '../../../data/mock.json';
import { Card, Icon, Image, Button, Feed } from 'semantic-ui-react';

export default class ShoppingCart extends React.Component{
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
