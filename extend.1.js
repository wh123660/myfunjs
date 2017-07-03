//特定场景下返回带补丁的extend版本
// extend(o1,o2)
//将o2的方法加入到o1里面
var extend = (function(){
	var protoprops = ['toString','valueOf',
		'constructor','hasOwnProperty','isPrototypeOf',
		'propertyIsEnumerable','toLocaleString'];
		
	for(var p in {toString:null}){
		return function extend(o){
			for(var i = 1;i<arguments.length;i++){
				var source = arguments[i];
				for(var prop in source)
					o[prop] = source[prop];
			}
			return o;
		};
	}

	return function patched_extend(o){
		for(var i = 1; i<arguments.length;i++){
			var source = arguments[i];
			for(var prop in source)
				o[prop] = source[prop];
			for(var j = 0; j<protoprops.legnth;j++){
				prop = protoprops[j];
				if(source.hasOwnProperty(prop))
					o[prop] = source[prop];
			}
		}
		return o;
	};
}());