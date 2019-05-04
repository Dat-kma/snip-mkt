import React, {Component} from 'react';
import '../css/index.css';
import '../css/fontawesome.css';
import '../css/commom.css';
import {changeNoteForm, deleteAllOrder, openRotateCheck, openRotate, RotateCheck, editDataTime, addHistory,} from "./redux/action";
import connect from "react-redux/es/connect/connect";
import { DataBase,DataHistory} from "../firebase/fireBase.js"
import OrderItem from "./OrderItem";
import NoteFrom from "./NoteFrom";
import SpinItem from "./SpinItem";
import Addmember from "./Addmember";
import moment from 'moment';
import "moment/min/locales.min";
import swal from 'sweetalert';
import MemberItem from "./MemberItem";
class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataFireBase:[],
            dataFirebaseName:[],
            dataHistory:[],
            time:"",
            nameNumber:"",
            id:"",
            isStopped:false,
            result:"",
            historyName:this.props.editTime.nameMember,
            historyTime:this.props.editTime.time
        }
    }
    handleClickRotate=(timeMb,time,name)=>{
        const checkDate=moment().format("DD/MM/YYYY");
        if(this.props.check===true) {
            let box_active = document.querySelectorAll(".box");
            for (let i = 0; i < box_active.length; i++) {
                box_active[i].classList.remove("active");
            }
            this.props.dispatch(RotateCheck(false));
            if (this.props.editTime) {
                if (this.props.editTime.time === checkDate) {
                    swal("Mỗi người chỉ được quay 1 lần 1 ngày, please");
                }
                else {
                    this.props.dispatch(openRotate(false))
                    this.props.dispatch(openRotate(true))

                    let arrayOrderName= this.state.dataFireBase.map(value =>{
                        return value.orderName;
                    }) //
                    let deg=360/arrayOrderName.length;
                    let deg2=deg/2;
                    var rndAngle;
                    var count=this.Random(1,10);
                    const x=arrayOrderName;
                    var wheel=document.getElementById("wheel")
                    let phantu=this.Random(0,(arrayOrderName.length-1));
                    rndAngle=Math.floor(Math.abs(((phantu*deg)+deg2)+3600*count));
                    wheel.style.transform="rotate(-"+rndAngle+"deg)";
                    let ahi = x[phantu] ;
                    this.setState({
                        result:ahi
                    });
                    setTimeout(function(){ swal(ahi)},5000);
                    let history={};
                    history.name =this.props.editTime.nameMember;
                    history.time =this.props.editTime.time;
                    history.result =ahi;
                    this.props.dispatch(addHistory(history));
                    this.props.dispatch(openRotateCheck(true));
                }
            }
            else {
                this.props.dispatch(openRotate(false))
                this.props.dispatch(openRotate(true))
            }

            if(this.props.editTime.id){
                let time={};
                time.time=timeMb;
                time.id= this.props.editTime.id;
                time.nameMember= this.props.editTime.nameMember;
                this.props.dispatch(editDataTime(time));
            }

        }
        else{
            swal(" vui lòng chọn thành viên");
        }
    };
    handleCloseRotate=()=>{
       if(this.props.OpenRotate ===true) this.props.dispatch(openRotate(false))
    };
    deleteAll=()=>{
        this.props.dispatch(deleteAllOrder())
    };
    getSpinData=()=>{
        if (this.state.dataFireBase) {
            // xử lý tạo ra mảng tên
            let arrayOrderName= this.state.dataFireBase.map(value =>{
                return value.orderName;
            }) // xử lý tạo ra mảng tên
            return (
                <SpinItem
                    length={arrayOrderName}
                    isStopped={this.state.isStopped }
                />
            )

        }
    };
    handleRotate=()=>{
        this.props.dispatch(openRotateCheck(false));
        if(this.props.Rotate===false){
            swal("vui lòng chọn thành viên")
        }
        else {
            this.handleClickRotate();
        }
    };
    componentWillMount() {
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
                dataFireBase:arrayData
            });

        });
        DataHistory.on('value',(notes) =>{
            let arrayHistory=[];
            notes.forEach(element =>{
                const key=element.key;
                const name=element.val().name;
                const result=element.val().result;
                arrayHistory.push({
                    id:key,
                    name:name,
                    result:result
                })
            });
            this.setState({
                dataHistory:arrayHistory
            });

        });


        let Date=moment().format("DD/MM/YYYY");
        this.setState({
            time:Date
        });


    }
    Random=(min, max)=>{
            return Math.floor(Math.random() * (max - min)) + min;
    };
    getNoteForm=()=>{
        if(this.props.editAdd){
            return <NoteFrom/>
        }
    };
    openAddItem=()=>{
        this.props.dispatch(changeNoteForm());
        this.props.dispatch(openRotate(false));
    };
    getHistory=()=>{
        if (this.state.dataHistory) {
            return this.state.dataHistory.map((value, key) => {
                return (
                   <p key={key}>{value.name}: {value.result}</p>
                )
            })

        }
    };
    render() {
        let arrayOrderName= this.state.dataFireBase.map(value =>{
            return value.orderName;
        }) //
        console.log(arrayOrderName);
        return (
            <div className="Content">
                <div className="Content-one">
                    <div className="container">
                        <h1>Marketing</h1>
                        <div className="row">
                            <div className="col-8">
                                <div className="spin ">
                                    <div id="wheel"  className="cicle" style={{ transition:"5s"}}>
                                        {this.getSpinData()}
                                    </div>
                                    <div className="arrow" onClick={()=>this.handleClickRotate(this.state.time)} >
                                        <div className="arrow-spin" />
                                    </div>
                                    <div className={`cicle-bg ${this.props.Rotate?"hidden":""}`}  onClick={()=>this.handleRotate()}></div>
                                    </div>
                                </div>
                               <Addmember
                                   handleCloseRotate={()=>this.handleCloseRotate()}
                               />
                        </div>
                    </div>
                </div>
                <div className="Content-two">
                    <div className="container">
                        <div className="row">
                            <div className="col" >
                                <h2>Danh sách mức phạt</h2>
                                <div className="listChoice">
                                    <OrderItem/>
                                    <div className="list-button">
                                        <button className="btn btn-success" onClick={()=>this.openAddItem()}> Thêm mức phạt</button>
                                        <button className="btn btn-info" onClick={()=>this.deleteAll()}> Xóa cho sạch</button>
                                    </div>
                                </div>
                            </div>

                            {this.getNoteForm()}

                        </div>
                    </div>
                </div>
                <div className="content-three">
                    <div className="container">
                        <h2>History</h2>
                        {this.getHistory()}
                    </div>
                </div>

            </div>

        );
    }
}

export default connect(state => {
    return {
        OpenRotate: !!state.RotateReducer.OpenRotate,
        Rotate: !!state.RotateReducer.Rotate,
        editAdd:!!state.RotateReducer.editAdd,
        check:!!state.RotateReducer.check,
        editTime:state.RotateReducer.editTime,
        RotateReducer:state.RotateReducer

    }
})( HomeComponent);