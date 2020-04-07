import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildConrols/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES={
    salad: 0.34,
    cheese: 0.75,
    meat: 1.26,
    bacon: 0.95
}

class BurgerBuilder extends Component{

    state={
        ingredients:{
            bacon:0,
            cheese:0,
            salad:0,
            meat:0
        },
        total_price: 4.00,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState=(updatedIngredients)=>{
        const ingredients={...updatedIngredients};
        const sum=Object.keys(ingredients)
        .map((igKey)=>{
            return ingredients[igKey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable:sum>0});
    }
    
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }

    purchaseCountinueHandler=()=>{
        alert('You continue');
    }

    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={...this.state.ingredients};
         updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.total_price;
        const newPrice=oldPrice+priceAddition;
        this.setState({total_price:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount-1;
        if(updatedCount>=0){
            const updatedIngredients={...this.state.ingredients};
            updatedIngredients[type]=updatedCount;
           const priceAddition=INGREDIENT_PRICES[type];
           const oldPrice=this.state.total_price;
           const newPrice=oldPrice-priceAddition;
           this.setState({total_price:newPrice,ingredients:updatedIngredients});
           this.updatePurchaseState(updatedIngredients);
        }
    
    }

    render(){
        const disabledInfo={...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    price={this.state.total_price}
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseCountinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.total_price}
                ordered={this.purchaseHandler}/>
            </Aux>
        );
    }


}

export default BurgerBuilder;