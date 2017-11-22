import React ,{Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICE={
    salad:5,
    cheese:4,
    meat:15,
    beef:8
}
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            beef:0,
            cheese:0,
            meat:0
        },
        totalPrice:40,
        purchasable:false,
        purchasing:false
    }

    updatePurchasableState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0);
        this.setState({purchasable:sum>0})
    }
    purchaseHandler =()=>{
        this.setState({purchasing:true})
    }
    addIngredientHandler =(type)=>{
        const oldCount =this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICE[type];
        const oldPrice =this.state.totalPrice;
        const newPrice =oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
        this.updatePurchasableState(updatedIngredients)
    }
    removeIngredientHandler=(type)=>{
        const oldCount =this.state.ingredients[type];
        if(oldCount<=0){
            return
        }
        const updatedCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENT_PRICE[type];
        const oldPrice =this.state.totalPrice;
        const newPrice =oldPrice+priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
        this.updatePurchasableState(updatedIngredients)
    };

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
        alert('u continue!')
    }
    render(){
        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;