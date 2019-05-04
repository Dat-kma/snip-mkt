import React, {Component} from 'react';
import MemberItem from "./MemberItem";
import { addOrderMember} from "./redux/action";
import connect from "react-redux/es/connect/connect";
import {DataBaseName} from "../firebase/fireBase";

class Addmember extends Component {
    constructor(props){
        super(props);
        this.state={
            nameMember:"",
            time:"",
            id:"",
            dataFireBaseName:[]
        }
    }
    isChangeMember =(event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        })
    }
    addOrderMember=(name,time)=>{
        let item={};
        item.nameMember =name;
        item.time =time;
        this.props.dispatch(addOrderMember(item))

    }
    componentWillMount() {
        DataBaseName.on('value',(notes) =>{
            var arrayData=[];
            notes.forEach(element =>{
                const key=element.key;
                const nameMember=element.val().nameMember;
                const time=element.val().time;
                arrayData.push({
                    id:key,
                    nameMember:nameMember,
                    time:time
                })
            });
            this.setState({
                dataFireBaseName:arrayData
            });

        })
    }

    getData =() => {
        if (this.state.dataFireBaseName) {
            return this.state.dataFireBaseName.map((value, key) => {
                return (
                    <MemberItem
                        key={key}
                        id={value.id}
                        time={value.time}
                        member={value}
                        nameMember={value.nameMember}
                        handleCloseRotate={()=>this.props.handleCloseRotate()}
                    />
                )
            })
        }
    }

    render() {
        return (

            <div className="col-4">
                <h4>Bảng thành viên</h4>
                <div className="add-member">
                    <input autoComplete="off" onChange={(event)=> this.isChangeMember(event)} type="text" className="form-control" name="nameMember" id="nameMember" />
                    <button className="btn btn-primary" onClick={()=>this.addOrderMember(this.state.nameMember,this.state.time)} >Thêm</button>
                </div>
                <div className="funkyradio">
                    {this.getData()}
                </div>
            </div>
        );
    }
}
export default connect(state => {
    return {
        RotateReducer: state.RotateReducer,
    }
})(Addmember);

