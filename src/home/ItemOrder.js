import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {changeNoteForm, deleteOrder, getEditData, openRotate} from "./redux/action";

class ItemOrder extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    deleteData =() => {
        this.props.dispatch(deleteOrder(this.props.order.id));
    }
    openEditItem=() => {
        this.props.dispatch(getEditData(this.props.order));
        this.props.dispatch(changeNoteForm());
        this.props.dispatch(openRotate(false));
    }



    render() {
        return (
            <li >
                <p type="text"  name="orderName" id="orderName" className="form-control"> {this.props.orderName}</p>
                <button className="btn btn-danger" onClick={()=>this.deleteData()}>x</button>
                <button className="btn btn-danger" onClick={()=>this.openEditItem()} >SỬA</button>
            </li>
        );
    }
}
export default connect(state => {
    return {
        RotateReducer: state.RotateReducer,
        editItem: state.editItem
    }
})( ItemOrder);
