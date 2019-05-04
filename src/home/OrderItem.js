import React, {Component} from 'react';
import {DataBase} from "../firebase/fireBase";
import connect from "react-redux/es/connect/connect";
import ItemOrder from "./ItemOrder";

class  OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataFirebase:[],
            id:""
        }
    }
    componentWillMount=() =>{
        DataBase.on('value',(notes) =>{
            let arrayData=[];
            notes.forEach(element =>{
                const key=element.key;
                const orderName=element.val().orderName;
                arrayData.push({
                    id:key,
                    orderName:orderName
                })
            });
            this.setState({
                dataFirebase:arrayData
            });

        })


    }

    getData =() => {
        if (this.state.dataFirebase) {
            return this.state.dataFirebase.map((value, key) => {
                return (
                   <ItemOrder
                       key={key}
                       id={this.state.id}
                       order={value}
                       orderName={value.orderName}
                   />
                )
            })
        }
    }

    render() {
        return (
            <ul>
                {this.getData()}
            </ul>
        );
    }
}

export default connect(state => {
    return {
        RotateReducer: state.RotateReducer,
        editItem: state.RotateReducer.editItem
    }
})(  OrderItem);