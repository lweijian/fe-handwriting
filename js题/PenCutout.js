//抠图js
//需要设定 一个图片dom 一个canvas画布，然后都是绝对定位，图片在下，画布在上
export class PenCutout{
    isCut=false;
    defaults = {
        drawPanel: "drawPanel",
        canvasId: "canvas",
        imgId: "imgCut",
        width: 1000,
        height: 1000,
        imgSrc: "",
        imgBackSrc: "",
        penColor: "#0087C4",
        defaultPointList: [],
        showTip: function (msg) {
            alert(msg);
        }
    }
    //画布；
    canvas = {
        canvasContext: {},
        id: "",
        width: 0,
        height: 0,
        //坐标点集合
        pointList: [],
        //临时存储坐标点
        tempPointList:[],
        //圆点的触发半径：
        roundR: 10,
        //圆点的显示半径：
        roundRr: 10,
        //当前拖动点的索引值；
        curPointIndex: 0,
        //判断是否点击拖动
        paint: false,
        //判断是否点圆点拖动，并瞬间离开,是否拖动点；
        juPull: false,
        //判断是否闭合
        isClose: false,
        imgBack: new Image(),
        penColor: "#0087C4"
    }
    //图片
    img = {
        image: new Image(),
        id: "",
        width: 0,
        height: 0
    }

    //画线
    drawLine(startX, startY, endX, endY){
        this.canvas.canvasContext.strokeStyle = this.canvas.penColor;
        this.canvas.canvasContext.lineWidth = 1;
        this.canvas.canvasContext.moveTo(startX, startY);
        this.canvas.canvasContext.lineTo(endX, endY);
        this.canvas.canvasContext.stroke();
    }

    //画圈：
    drawArc(x, y) {
        this.canvas.canvasContext.fillStyle = this.canvas.penColor;
        this.canvas.canvasContext.beginPath();
        this.canvas.canvasContext.arc(x, y, this.canvas.roundRr, 360, Math.PI * 2, true);
        this.canvas.canvasContext.closePath();
        this.canvas.canvasContext.stroke();
    }
    //画小圈
    drawArcSmall(x,y){
        this.canvas.canvasContext.fillStyle = this.canvas.penColor;
        this.canvas.canvasContext.beginPath();
        this.canvas.canvasContext.arc(x, y, 0.1, 360, Math.PI * 2, true);
        this.canvas.canvasContext.closePath();
        this.canvas.canvasContext.stroke();
    }
    //画大圈
    drawArcBig(x,y){
        this.canvas.canvasContext.fillStyle = this.canvas.penColor;
        this.canvas.canvasContext.beginPath();
        this.canvas.canvasContext.arc(x, y, this.canvas.roundR + 2, 360, Math.PI * 2, true);
        this.canvas.canvasContext.closePath();
        this.canvas.canvasContext.stroke();
    }
    //更新画线
    drawAllLine(){
        for (let i = 0; i < this.canvas.pointList.length - 1; i++) {
            //画线
            let pointList = this.canvas.pointList;
            this.drawLine(pointList[i].pointx, pointList[i].pointy, pointList[i + 1].pointx, pointList[i + 1].pointy);
            //画圈
            this.drawArc(pointList[i].pointx, pointList[i].pointy);
        }
    }
    //动态线针：(光标的x,y)
    drawAllMove(x,y){
        if (!this.canvas.isClose) {
            if (this.canvas.pointList.length >= 1) {
                //重画：
                this.clearCanvas();
                let pointList = this.canvas.pointList;
                for (let i = 0; i < this.canvas.pointList.length - 1; i++) {
                    //画线
                    this.drawLine(pointList[i].pointx, pointList[i].pointy, pointList[i + 1].pointx, pointList[i + 1].pointy);
                    ////画圈
                    this.drawArc(pointList[i].pointx, pointList[i].pointy);
                    if (i == this.canvas.pointList.length - 2) {
                        this.drawArc(pointList[i + 1].pointx, pointList[i + 1].pointy);
                    }
                }
                if (pointList.length == 1) {
                    this.drawArc(pointList[0].pointx, pointList[0].pointy);
                }
                this.drawArcSmall(x, y);
                this.drawLine(pointList[this.canvas.pointList.length - 1].pointx, pointList[this.canvas.pointList.length - 1].pointy, x, y);

            }
        }
    }



    init (options) {
        if (notEmptyObj(options)) {
            // //对象合并
            Object.assign(this.defaults,options);
        }
        //输出化dom
        this.initElement();
        //初始化数据
        this.initData()
        //绑定事件
        this.eventBind();
    }
    initElement() {
        //    isCut为true显示要抠图的图片
        this.isCut=true;

    }

    initData (options) {
        if (notEmptyObj(options)) {
            // //对象合并
            Object.assign(this.defaults,options);
        }
        this.canvas.id = this.defaults.canvasId;
        this.canvas.roundR = 30;
        this.canvas.roundRr = 30;
        this.canvas.imgBack.src = this.defaults.imgBackSrc;
        this.canvas.penColor = this.defaults.penColor;
        this.canvas.canvasContext=document.getElementById(this.canvas.id).getContext("2d");
        this.canvas.width = this.defaults.width;
        this.canvas.height = this.defaults.height;

        let canvasDom=document.getElementById(this.canvas.id)
        canvasDom.height=this.defaults.height;
        canvasDom.width=this.defaults.width;




        this.canvas.curPointIndex = 0;
        //图片
        this.img.width = this.canvas.width;
        this.img.height = this.canvas.height;
        this.img.image.src = this.defaults.imgSrc;
        //给dom挂载src
        let imgDom=document.getElementById(`${this.defaults.imgId}`)
        imgDom.src=this.img.image.src;


        //加载事件：
        this.ReDo();
        if (notEmptyObj(this.defaults.defaultPointList) && this.defaults.defaultPointList.length > 0) {
            this.setOriPoints(this.defaults.defaultPointList);
        }
    }

    //函数：重做，清空
    ReDo () {
        this.clearCanvas();
        //清空listPoint();
        this.canvas.pointList.length = 0;
        //isClose闭合重新设为false;
        this.canvas.isClose = false;
    }

    //填充背景色
    fillBackColor () {
        for (let i = 0; i < this.img.width; i += 96) {
            for (let j = 0; j <= this.img.height; j += 96) {
                this.canvas.canvasContext.drawImage(this.canvas.imgBack, i, j, 96, 96);
            }
        }
        this.canvas.canvasContext.globalCompositeOperation = "destination-out";
        this.canvas.canvasContext.beginPath();
        for (let i = 0; i < this.canvas.pointList.length; i++) {
            this.canvas.canvasContext.lineTo(this.canvas.pointList[i].pointx, this.canvas.pointList[i].pointy);
        }
        this.canvas.canvasContext.closePath();
        this.canvas.canvasContext.fill();
        this.canvas.canvasContext.globalCompositeOperation = "destination-over";
    }

    //设置初始坐标点
    setOriPoints(pointObj){
        this.clearCanvas();
        if (pointObj != null && pointObj.length > 0) {
            this.canvas.pointList = pointObj.concat();
            if (pointObj.length > 1 && pointObj[pointObj.length - 1].pointx === pointObj[0].pointx) {
                this.canvas.isClose = true;
                this.fillBackColor();
            } else {
                this.drawAllLine();
            }
        }
    }

    //填充背景色
    fillBackColor(){
        for (let i = 0; i < this.img.width; i += 96) {
            for (let j = 0; j <= this.img.height; j += 96) {
                this.canvas.canvasContext.drawImage(this.canvas.imgBack, i, j, 96, 96);
            }
        }
        this.canvas.canvasContext.globalCompositeOperation = "destination-out";
        this.canvas.canvasContext.beginPath();
        for (let i = 0; i < this.canvas.pointList.length; i++) {
            this.canvas.canvasContext.lineTo(this.canvas.pointList[i].pointx, this.canvas.pointList[i].pointy);
        }
        this.canvas.canvasContext.closePath();
        this.canvas.canvasContext.fill();
        this.canvas.canvasContext.globalCompositeOperation = "destination-over";
    }

    //画线
    drawLine(startX, startY, endX, endY){
        this.canvas.canvasContext.strokeStyle = this.canvas.penColor;
        this.canvas.canvasContext.lineWidth = 1;
        this.canvas.canvasContext.moveTo(startX, startY);
        this.canvas.canvasContext.lineTo(endX, endY);
        this.canvas.canvasContext.stroke();
    }
    //清空画布
    clearCanvas(){
        this.canvas.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //判断结束点是否与起始点重合；
    equalStartPoint(pointList,x, y) {
        if (pointList.length > 2 && Math.abs((x - pointList[0].pointx) * (x - pointList[0].pointx)) + Math.abs((y - pointList[0].pointy) * (y - pointList[0].pointy)) <= this.canvas.roundR * this.canvas.roundR) {
            //如果闭合
            this.canvas.isClose = true;
            pointList[pointList.length - 1].pointx = pointList[0].pointx;
            pointList[pointList.length - 1].pointy = pointList[0].pointy;
        } else {
            this.canvas.isClose = false;
        }
    }
    //判断鼠标点是不是在圆的内部：
    roundIn(pointList,x,y){
        if (!this.canvas.juPull) {

            for (let i = 0; i < pointList.length; i++) {

                if (Math.abs((x - pointList[i].pointx) * (x - pointList[i].pointx)) + Math.abs((y - pointList[i].pointy) * (y - pointList[i].pointy)) <= 2*this.canvas.roundR * this.canvas.roundR) {

                    //说明点击圆点拖动了；
                    this.canvas.juPull = true;//拖动
                    this.canvas.curPointIndex = i;
                    pointList[i].pointx = x;
                    pointList[i].pointy = y;
                    //重画：
                    this.clearCanvas();
                    if (this.canvas.isClose) {
                        this.fillBackColor();
                    }
                    this.drawAllLine();
                    return;
                }
            }
        } else {//拖动中
            pointList[this.canvas.curPointIndex].pointx = x;
            pointList[this.canvas.curPointIndex].pointy = y;
            //重画：
            this.clearCanvas();
            if (this.canvas.isClose) {
                this.fillBackColor();
            }
            this.drawAllLine();
        }
    }
    //清空画布
    clearCanvas() {
        this.canvas.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //光标移到线上，临时数组添加新的节点：
    AddNewNode  (newX, newY) {
        //如果闭合
        let ii = 0;
        if (this.canvas.isClose) {
            //判断光标点是否在线上：
            let pointList = this.canvas.pointList;
            for (let i = 0; i < pointList.length - 1; i++) {
                //计算a点和b点的斜率
                // let k =(pointList[i + 1].pointy - pointList[i].pointy) / (pointList[i + 1].pointx - pointList[i].pointx);
                let result = false;
                if (parseFloat(pointList[i + 1].pointx) - parseFloat(pointList[i].pointx) != 0) {
                    let k = parseFloat((pointList[i + 1].pointy - pointList[i].pointy)) / (pointList[i + 1].pointx - pointList[i].pointx);
                    let b = pointList[i].pointy - k * pointList[i].pointx;
                    let userK = parseFloat(k * newX + b);
                    if (((userK < newY + 4 && userK > newY - 4) || (parseInt(userK) == parseInt(newY))) && (newX - pointList[i + 1].pointx) * (newX - pointList[i].pointx) <= 2 && (newY - pointList[i + 1].pointy) * (newY - pointList[i].pointy) <= 2) {
                        let aa = Math.abs(pointList[i + 1].pointx - pointList[i].pointx - 3);
                        let ab = Math.abs(pointList[i + 1].pointx - newX);
                        let ac = Math.abs(newX - pointList[i].pointx);
                        let ba = Math.abs(pointList[i + 1].pointy - pointList[i].pointy - 3);
                        let bb = Math.abs(pointList[i + 1].pointy - newY);
                        let bc = Math.abs(newY - pointList[i].pointy);
                        if (aa <= 2 || aa >= 4) {
                            if (ab <= aa && ac <= aa && bb <= ba && bc <= ba) {
                                result = true;
                            }
                        } else {
                            if (ab <= aa && ac <= aa) {
                                result = true;
                            }
                        }
                    }
                }
                //考虑接近垂直的情况
                if (parseFloat(pointList[i + 1].pointx) - parseFloat(pointList[i].pointx) == 0 || (Math.abs(parseFloat(pointList[i + 1].pointx) / parseFloat(pointList[i].pointx)) >= 15)) {
                    if (pointList[i].pointx + 3 >= newX && pointList[i].pointx - 3 <= newX) {
                        let ba = Math.abs(pointList[i + 1].pointy - pointList[i].pointy - 3);
                        let bb = Math.abs(pointList[i + 1].pointy - newY);
                        let bc = Math.abs(newY - pointList[i].pointy);
                        if (bb <= ba && bc <= ba) {
                            result = true;
                        }
                    }
                }
                if (result) {
                    //添加临时点：
                    this.canvas.tempPointList[0] = new Point(newX, newY);//新的坐标点
                    this.canvas.tempPointList[1] = new Point(i + 1, i + 1);//需要往pointlist中插入新点的索引；
                    i++;
                    //光标移动到线的附近如果是闭合的需要重新划线，并画上新添加的点；
                    if (this.canvas.tempPointList.length > 0) {
                        //重画：
                        this.clearCanvas();
                        //showImg();
                        if (this.canvas.isClose) {
                            this.fillBackColor();
                        }
                        this.drawAllLine();
                        this.drawArcBig(this.canvas.tempPointList[0].pointx, this.canvas.tempPointList[0].pointy);
                        return;
                    }
                    return;
                }
            }
            if (ii == 0) {
                if (this.canvas.tempPointList.length > 0) {
                    //清空临时数组；
                    this.canvas.tempPointList.length = 0;
                    //重画：
                    this.clearCanvas();
                    //showImg();
                    if (this.canvas.isClose) {
                        this.fillBackColor();
                    }
                    this.drawAllLine();
                }
            }
        } else {
            //防止计算误差引起的添加点，当闭合后，瞬间移动起始点，可能会插入一个点到临时数组，当再次执行时，
            //就会在非闭合情况下插入该点，所以，时刻监视：
            if (this.canvas.tempPointList.length > 0) {
                this.canvas.tempPointList.length = 0;
            }
        }
    }
    //移动点坐标数组
    movePointArray(pointArray) {
        let smallX = pointArray[0].pointx;
        let smallY = pointArray[0].pointy;
        let bigX = smallX;
        let bigY = smallY;
        let tempArray = new Array();
        for (let i = 1; i < pointArray.length; i++) {
            if (pointArray[i].pointx < smallX) {
                smallX = pointArray[i].pointx;
            }
            if (pointArray[i].pointx > bigX) {
                bigX = pointArray[i].pointx;
            }
            if (pointArray[i].pointy < smallY) {
                smallY = pointArray[i].pointy;
            }
            if (pointArray[i].pointy > bigY) {
                bigY = pointArray[i].pointy;
            }
        }
        for (let i = 0; i < pointArray.length; i++) {
            pointArray[i].pointx -= smallX;
            pointArray[i].pointy -= smallY;
        }
        tempArray[0] = new Point(smallX, smallY);
        tempArray[1] = new Point(bigX, bigY);
        return tempArray;
    }
    //裁剪图片
    createCutImg (fun) {
        let tempPointArray=[];
        let tempPointList=[];
        if (notEmptyObj(this.canvas.pointList) && this.canvas.pointList.length > 1) {
            tempPointList = JSON.parse(JSON.stringify(this.canvas.pointList));
            tempPointArray = this.movePointArray(tempPointList);
        } else {
            this.defaults.showTip("请先进行抠图操作");
            return;
        }
        let proxy = this;
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = this.defaults.imgSrc;
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = tempPointArray[1].pointx - tempPointArray[0].pointx;
            canvas.height = tempPointArray[1].pointy - tempPointArray[0].pointy;
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let i = 0; i < tempPointList.length; i++) {
                ctx.lineTo(tempPointList[i].pointx, tempPointList[i].pointy);
            }
            ctx.lineTo(tempPointList[0].pointx, tempPointList[0].pointy);
            ctx.clip();
            ctx.drawImage(img, tempPointArray[0].pointx * -1, tempPointArray[0].pointy * -1, proxy.img.width, proxy.img.height);
            fun(canvas.toDataURL("image/png"), canvas.width, canvas.height);
        };
    }
    //下载
    downLoad () {
        let tempPointArray=[];
        let tempPointList=[];
        if (notEmptyObj(this.canvas.pointList) && this.canvas.pointList.length > 1) {
            tempPointList = JSON.parse(JSON.stringify(this.canvas.pointList));
            tempPointArray = this.movePointArray(tempPointList);
        } else {
            this.defaults.showTip("请先进行抠图操作");
            return;
        }
        let proxy = this;
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = this.defaults.imgSrc;
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = tempPointArray[1].pointx - tempPointArray[0].pointx;
            canvas.height = tempPointArray[1].pointy - tempPointArray[0].pointy;
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let i = 0; i < tempPointList.length; i++) {
                ctx.lineTo(tempPointList[i].pointx, tempPointList[i].pointy);
            }
            ctx.lineTo(tempPointList[0].pointx, tempPointList[0].pointy);
            ctx.clip();
            ctx.drawImage(img, tempPointArray[0].pointx * -1, tempPointArray[0].pointy * -1, proxy.img.width, proxy.img.height);
            let fileName = "target.png";
            if (window.navigator.msSaveOrOpenBlob) {
                let imgData = canvas.msToBlob();
                let blobObj = new Blob([imgData]);
                window.navigator.msSaveOrOpenBlob(blobObj, fileName);
            } else {
                let imgData = canvas.toDataURL("image/png");
                let aTag = document.createElement('a');
                let event = new MouseEvent('click');
                aTag.download = fileName;
                aTag.href = imgData;
                aTag.dispatchEvent(event);
            }
        };
    }
    //保存：返回所有点的数组：
    SaveCut () {
        return this.canvas.pointList();
    }


    //按下屏幕事件
    touchStartEvent(){
        this.canvas.paint = true;

        //点击判断是否需要在线上插入新的节点：
        if (this.canvas.tempPointList.length > 0) {

            this.canvas.pointList.splice(this.canvas.tempPointList[1].pointx, 0, new Point(this.canvas.tempPointList[0].pointx, this.canvas.tempPointList[0].pointy));
            //
            //清空临时数组
            this.canvas.tempPointList.length = 0;
        }
    }
    //拖动事件
    touchMoveEvent(pointList,event,canvasDom) {

        if (this.canvas.paint) {//是不是按下了鼠标
            if (pointList.length > 0) {
                this.equalStartPoint(pointList,pointList[pointList.length - 1].pointx, pointList[pointList.length - 1].pointy);
            }
            this.roundIn(pointList,getOffsetX(event,canvasDom), getOffsetY(event,canvasDom));
        }
        //判断是否在直线上
        //光标移动到线的附近如果是闭合的需要重新划线，并画上新添加的点
        this.AddNewNode(getOffsetX(event,canvasDom), getOffsetY(event,canvasDom));
        //添加动态线：
        this.drawAllMove(getOffsetX(event,canvasDom), getOffsetY(event,canvasDom));
    }
    //手指抬起事件
    touchEndEvent(pointList,event,canvasDom){

        //拖动结束
        this.canvas.paint = false;

        //拖动结束；
        if (this.canvas.juPull) {
            this.canvas.juPull = false;
            this.canvas.curPointIndex = 0;
            //验证抠图是否闭合：闭合，让结束点=开始点；添加标记
            this.equalStartPoint(pointList,pointList[pointList.length - 1].pointx, pointList[pointList.length - 1].pointy);
        } else {

            //如果闭合：禁止添加新的点；
            if (!this.canvas.isClose) {//没有闭合
                pointList.push(new Point(getOffsetX(event,canvasDom), getOffsetY(event,canvasDom)));
                //验证抠图是否闭合：闭合，让结束点=开始点；添加标记
                this.equalStartPoint(pointList,pointList[pointList.length - 1].pointx, pointList[pointList.length - 1].pointy);
                //判断是否闭合：
                //重新画；
                if (pointList.length > 1) {
                    this.drawLine(pointList[pointList.length - 2].pointx, pointList[pointList.length - 2].pointy, pointList[pointList.length - 1].pointx, pointList[pointList.length - 1].pointy);
                    this.drawArc(pointList[pointList.length - 1].pointx, pointList[pointList.length - 1].pointy);
                } else {

                    this.drawArc(pointList[pointList.length - 1].pointx, pointList[pointList.length - 1].pointy);

                }
            } else {
                //闭合

            }
        }
        //验证是否填充背景：
        if (this.canvas.isClose) {
            this.fillBackColor();
            this.drawAllLine();
        }
    }


    //绑定事件
    eventBind(){
        let pointList = this.canvas.pointList;
        let canvasDom= document.getElementById(this.canvas.id);

        canvasDom.ontouchmove=(event)=>{
            this.touchMoveEvent(pointList,event,canvasDom)
        }
        canvasDom.ontouchend=(event)=>{
            this.touchEndEvent(pointList,event,canvasDom)
        }
        canvasDom.ontouchstart=()=>{
            this.touchStartEvent()
        }
    }
}


//得到移动端偏移量
function getVertexPosition(el) {
    let currentTarget = el
    let top = 0
    let left = 0
    while (currentTarget !== null) {
        top += currentTarget.offsetTop
        left += currentTarget.offsetLeft
        currentTarget = currentTarget.offsetParent
    }
    return { top, left }
}

//判断是否为空
function  notEmptyObj(obj){
    if (obj !== null && obj !== undefined && obj !== "") {
        return true;
    }
    return false;
}

//得到移动端的相对坐标
function getOffsetX(event,canvasDom) {
    return event.changedTouches[0].pageX - getVertexPosition(canvasDom).left;
}
function getOffsetY(event,canvasDom) {
    return event.changedTouches[0].pageY - getVertexPosition(canvasDom).top;
}
//设置点类 ，设置x坐标，y坐标
class Point {
    constructor(x,y) {
        this.pointx = x;
        this.pointy = y;
    }
}
