import React, {Component} from 'react';
class SpinItem extends Component {
    constructor(props){
        super(props);
        this.state={
            stt:this.props.id,
            orderName:[]
        }
    }
    // hàm xử lí tính ra độ
    deg2rad=(deg) =>{
        return deg * Math.PI/180;
    }
    // hàm xử lí tính ra độ


    // hàm xử lí in ra màn hình
    drawImg=() =>{
        let width = this.refs.canvas.width; // size
        let center = width/2;
        let color = ["#e056fd","#ffbe76","#ff7979","#badc58","#dff9fb","#f9ca24","#f0932b","#eb4d4b","#6ab04c","#c7ecee","#7ed6df","#686de0","#30336b","#95afc0","#22a6b3","#be2edd","#4834d4","#130f40","#535c68"];
        let name =this.props.length;
        let label=this.props.length;
        let slices = name.length;
        let ctx =this.refs.canvas.getContext('2d');
        let deg = this.Random(0, 1);
        let sliceDeg = 360/slices;

        ctx.clearRect(0, 0, width, width);
        for(let i=0; i< slices; i++){
            // xử lí phần hiện màu //
            ctx.beginPath();
            ctx.fillStyle = color[i];
            ctx.moveTo(center, center);
            ctx.arc(center, center, width/2, this.deg2rad(deg), this.deg2rad(deg+sliceDeg));
            ctx.lineTo(center, center);
            ctx.fill();
            // xử lí phần hiện màu //

            // xử lí phần hiện//
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(this.deg2rad(deg+sliceDeg/2));
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = 'bold 20px sans-serif';
            ctx.fillText(label[i], 200, 10);
            ctx.restore();
            // xử lí phần hiện//
            deg += sliceDeg;

        }

    }

    // hàm xử lí in ra màn hình

    componentDidMount() {
        this.drawImg();

    }
    componentDidUpdate() {
        this.drawImg();
    }
    Random=(min, max)=>{
        return Math.floor(Math.random() * (max - min)) + min;
    };
    render() {

        return (
            <canvas id="canvas" ref="canvas" width="500" height="500"></canvas>
        );
    }
}

export default SpinItem;
