window.onload=function(){
	var parent=document.getElementById('container');
    setImgLocation(parent);

    var data=["0.jpg","1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","1.jpg","0.jpg"];
     window.onscroll=function(){
            if(needLoad(parent)){
  
      for(var j=0;j<data.length;j++){

        var box_div=document.createElement("div");
        box_div.className="box";
        var img_div=document.createElement("div");
        img_div.className="img_box";
        var img=document.createElement("img");
        img.src=data[j];
        img.className=".img_box img";
        img_div.appendChild(img);
        box_div.appendChild(img_div);
        parent.appendChild(box_div);
      }
      setImgLocation(parent);
      }
     }
}
function needLoad(cparent){
  var boxs=getChildNodes(cparent);
  var lastHeight=boxs[boxs.length-1].offsetTop;
  var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
  var screenHeight=document.documentElement.clientHeight;
  if(lastHeight<scrollHeight+screenHeight){
    return true;
  }else{
    return false;
  }
}
function setImgLocation(cparent){
	
    var boxs=getChildNodes(cparent);
    var screenWidth=document.body.clientWidth;
    var num=Math.floor(screenWidth/boxs[0].offsetWidth);
    cparent.style.cssText="width:"+num*boxs[0].offsetWidth+"px;margin:0 auto;";
    var heightArray=[];
    for(var i=0;i<boxs.length;i++){
      if(i<num){
        heightArray[i]=boxs[i].offsetHeight;
      }else{
        var minHeight=Math.min.apply(null,heightArray);
        var minHIndex=getMinHIndex(heightArray,minHeight);
        boxs[i].style.position="absolute";
        boxs[i].style.top=minHeight+"px";
        boxs[i].style.left=boxs[minHIndex].offsetLeft+"px";
        heightArray[minHIndex]+=boxs[i].offsetHeight;
      }
    }
    
}
function getMinHIndex(heightArray,minHeight){
  for(var i=0;i<heightArray.length;i++){
    if(heightArray[i]==minHeight){
      return i;
    }
  }
}
function getChildNodes(cparent){
   var result=[];
   for(var i=0;i<cparent.childNodes.length;i++){
      if(cparent.childNodes[i].className=="box"){
      	result.push(cparent.childNodes[i]);
      }
   }
   return result;
}