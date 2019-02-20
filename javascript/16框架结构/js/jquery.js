function addListener(obj,event,fn){
	if(obj.addEventListener){
		obj.addEventListener(event,function(ev){
			if(fn.call(obj)==false){
				ev.stopPropagation();
				ev.preventDefault();
			}
		},false)
	}else if(obj.attachEvent){	//this指向window 改变this指向 call
		obj.attachEvent("on"+event,function(){
			if(fn.call(obj)==false){
				window.event.cancelBubble=true;
				return false;
			}
			
		})
	}else{
		obj["on"+event]=fn;
	}
}

function getByClass(obj,className){
	var arr=[];
	var reg=new RegExp("\\b"+className+"\\b");
	var elements=obj.getElementsByTagName("*");
	for(var i=0;i<elements.length;i++){
		if(reg.test(elements[i].className)){
			arr.push(elements[i])
		}
	}
	return arr;
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}

function myQuery(arg){
	this.eles=[];
	switch(typeof arg){
		case "function":
			addListener(window,"load",arg);
		break;
		case "string":
			switch(arg.charAt(0)){
				
				case '.':
					var className=arg.substring(1);
					this.eles=getByClass(document,className);
					break;
				case "#":
					var className=arg.substring(1);
					this.eles.push(document.getElementById(className))
					break;
				default:
				this.eles=document.getElementsByTagName(arg);
			}
		break;
		case "object":
			this.eles.push(arg);
	}
}

function $(arg){
	return new myQuery(arg);
}

myQuery.prototype.bindEvent=function(event,fn){
	for(var i=0;i<this.eles.length;i++){
		addListener(this.eles[i],event,fn);
	}
	return this;
}

myQuery.prototype.remove=function(){
	this.eles[0].parentNode.removeChild(this.eles[0]);
	return this;
}

myQuery.prototype.append=function(obj){
	for(var i=0;i<obj.eles.length;i++){
		this.eles[0].appendChild(obj.eles[i]);
	}
	
	return this;
}

myQuery.prototype.extend=function(name,fn){
	//this.extend[name]=fn;
	myQuery.prototype[name]=fn;
}

myQuery.prototype.eq=function(n){ //第几个元素 用到了case object
	return $(this.eles[n]);		// 把dom对象转化为myQuery的实例对象
}
myQuery.prototype.html=function(){
	return this.eles[0].innerHTML;
}
myQuery.prototype.click=function(fn){
	for(var i=0;i<this.eles.length;i++){
		addListener(this.eles[i],"click",fn)
	}
	return this;
}
myQuery.prototype.hover=function(fn,fn1){
	 for(var i=0;this.eles[i];i++){
	 	 	 addListener(this.eles[i],"mouseover",fn);
	 	 	 addListener(this.eles[i],"mouseout",fn1);
	 }
	 return this;
}
myQuery.prototype.show=function(){
	for(var i=0;i<this.eles.length;i++){
		this.eles[i].style.display="block";	
	}
	return this;
}
myQuery.prototype.hide=function(){
	for(var i=0;i<this.eles.length;i++){
		this.eles[i].style.display="none";	
	}
	return this;
}
myQuery.prototype.css=function(attr,value){
	if(arguments.length==2){
		for(var i=0;i<this.eles.length;i++){
			this.eles[i].style[attr]=value;
		}
	}else{
		if(typeof attr=="string"){
			return getStyle(this.eles[0],attr)
		}else{
			for(var i=0;this.eles[i];i++){
				for(var t in attr){
					this.eles[i].style[t]=attr[t];
				}
			}
		}
	}
	return this;
}
myQuery.prototype.attr=function(attr,value){
	if(arguments.length==2){
		for(var i=0;this.eles[i];i++){
			this.eles[i][attr]=value;
		}
	}else{
		return this.eles[0][attr];
	}
	return this;
}
myQuery.prototype.find=function(str){
	var arr=[];
	for(var i=0;i<this.eles.length;i++){
		switch(str.charAt(0)){
			case ".":
				arr=arr.concat(getByClass(this.eles[i],str.substring(1)));
				break;
			default:
				var list=this.eles[i].getElementsByTagName(str);
				for(var j=0;j<list.length;j++){
					arr.push(list[j]);
				}
		}
	}
	var newQuery=$();
	newQuery.eles=arr;
	return newQuery;
}

function getIndex(obj){
	var oBrothers=obj.parentNode.children;
	for(var i=0;i<oBrothers.length;i++){
		if(oBrothers[i]==obj){
			return i;
		}
	}
}
myQuery.prototype.index=function(){
	return getIndex(this.eles[0])
}