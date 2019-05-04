import React, {Component} from 'react';
import {editDataTime, openRotateCheck,getEditDataTime,RotateCheck,deleteMember} from "./redux/action";
import connect from "react-redux/es/connect/connect";
import moment from 'moment';
import "moment/min/locales.min";
class MemberItem extends Component {
    constructor(props){
        super(props);
        this.state={
            time:"",
            id:""
        }
    }

    updateTime=(timeMb,event)=>{
        let box_active= document.querySelectorAll(".box");
        event.currentTarget.classList.add("active");

            for( let i=0;i< box_active.length;i++){
                box_active[i].classList.remove("active");
            }
            event.currentTarget.classList.add("active");

        if(this.state.id){
            let time={};
            time.time=timeMb;
            time.id= this.state.id;
            time.nameMember= this.state.nameMember;
            this.props.dispatch(editDataTime(time));
            this.props.handleCloseRotate()
        }
        this.props.dispatch(openRotateCheck(true));
        this.props.dispatch(RotateCheck(true));
        this.props.dispatch(getEditDataTime(this.props.member));
        this.props.handleCloseRotate()

    }
    deleteMember=()=>{
        this.props.dispatch(deleteMember(this.props.id))
    }
    render() {
        // console.log(this.props.editTime)
        return (
            <div className="funkyradio-warning" >

                <div className="checkbox">
                    <div className="box" onClick={(e)=>this.updateTime(this.state.time,e)}></div>
                    <div className="checkbox-text">{this.props.nameMember}</div>
                </div>
                <i className="fas fa-times-circle close-member" onClick={()=>this.deleteMember()}></i>
            </div>

        );
    }
}

export default connect(state => {
    return {
        RotateReducer: state.RotateReducer,
        editTime:state.RotateReducer.editTime,
        check:!!state.RotateReducer.check,
    }
})(MemberItem);