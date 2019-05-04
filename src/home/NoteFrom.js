import React, {Component} from 'react';
import {addOrder, changeNoteForm, editDataStore, openRotate} from "./redux/action";
import connect from "react-redux/es/connect/connect";
import swal from 'sweetalert';
class NoteFrom extends Component {
    constructor(props){
        super(props);
        this.state={
            orderName:"",
            id:""
        }
    }
    isChange =(event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value)
        this.setState({
            [name]:value
        })
    }
    addOrder=(title)=>{
        // if(this.state.orderName.length)
        if(this.state.orderName === ""){
            swal("Vui lòng nhập mức phạt ");
        }
        else {
            if(this.state.id){
                let editObject={};
                editObject.id= this.state.id;
                editObject.orderName=this.state.orderName;
                this.props.dispatch(editDataStore(editObject));
                this.props.dispatch(changeNoteForm());
            }
            else {
                let item={};
                item.orderName =title;
                this.props.dispatch(addOrder(item));
                this.props.dispatch(changeNoteForm());
                this.props.dispatch(openRotate(false));
            }
            this.setState({
                orderName:""
            })
        }


    }
    componentWillMount () {
        if (this.props.editItem) {
            this.setState({
                orderName: this.props.editItem.orderName,
                id: this.props.editItem.id,
            })
        }
        else{this.setState({
            orderName: ""

        })}
    }

    render() {
        return (
            <div className="col-4">
                <h2> Thêm,Sửa Mức Phạt</h2>
                <div className="form-group add-choice">
                    <span  className="text-center" htmlFor="orderName">Add mức phạt</span>
                    <input autoComplete="off" onChange={(event)=> this.isChange(event)} type="text" className="form-control" name="orderName" id="orderName" value={this.state.orderName}  />
                    <button type="reset" onClick={()=>this.addOrder(this.state.orderName)} className="btn btn-primary">Submit</button>
                </div>

            </div>
        );
    }
}
export default connect(state => {
    return {
        RotateReducer: state.RotateReducer,
        editItem: state.RotateReducer.editItem
    }
})( NoteFrom);