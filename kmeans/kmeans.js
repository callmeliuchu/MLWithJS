dataMat = [[1.658985, 4.285136], [-3.453687, 3.424321], [4.838138, -1.151539], [-5.379713, -3.362104], [0.972564, 2.924086], [-3.567919, 1.531611], [0.450614, -3.302219], [-3.487105, -1.724432], [2.668759, 1.594842], [-3.156485, 3.191137], [3.165506, -3.999838], [-2.786837, -3.099354], [4.208187, 2.984927], [-2.123337, 2.943366], [0.704199, -0.479481], [-0.39237, -3.963704], [2.831667, 1.574018], [-0.790153, 3.343144], [2.943496, -3.357075], [-3.195883, -2.283926], [2.336445, 2.875106], [-1.786345, 2.554248], [2.190101, -1.90602], [-3.403367, -2.778288], [1.778124, 3.880832], [-1.688346, 2.230267], [2.592976, -2.054368], [-4.007257, -3.207066], [2.257734, 3.387564], [-2.679011, 0.785119], [0.939512, -4.023563], [-3.674424, -2.261084], [2.046259, 2.735279], [-3.18947, 1.780269], [4.372646, -0.822248], [-2.579316, -3.497576], [1.889034, 5.1904], [-0.798747, 2.185588], [2.83652, -2.658556], [-3.837877, -3.253815], [2.096701, 3.886007], [-2.709034, 2.923887], [3.367037, -3.184789], [-2.121479, -4.232586], [2.329546, 3.179764], [-3.284816, 3.273099], [3.091414, -3.815232], [-3.762093, -2.432191], [3.542056, 2.778832], [-1.736822, 4.241041], [2.127073, -2.98368], [-4.323818, -3.938116], [3.792121, 5.135768], [-4.786473, 3.358547], [2.624081, -3.260715], [-4.009299, -2.978115], [2.493525, 1.96371], [-2.513661, 2.642162], [1.864375, -3.176309], [-3.171184, -3.572452], [2.89422, 2.489128], [-2.562539, 2.884438], [3.491078, -3.947487], [-2.565729, -2.012114], [3.332948, 3.983102], [-1.616805, 3.573188], [2.280615, -2.559444], [-2.651229, -3.103198], [2.321395, 3.154987], [-1.685703, 2.939697], [3.031012, -3.620252], [-4.599622, -2.185829], [4.196223, 1.126677], [-2.133863, 3.093686], [4.668892, -2.562705], [-2.793241, -2.149706], [2.884105, 3.043438], [-2.967647, 2.848696], [4.479332, -1.764772], [-4.905566, -2.91107]]
class Vector{
	constructor(arr){
		this.arr = arr;
	}
	static ones(n){
		return new Vector(this.genArr(n,1));
	}
	static genArr(n,num){
		let arr = []
		for(let i=0;i<n;i++){
			arr.push(num);
		}
		return arr;
	}
	operator(that,op){
		let new_arr = []
		for(let i=0;i<this.arr.length;i++){
			if(op == '+'){
                new_arr.push(this.arr[i]+that.arr[i])
			}
			if(op == '-'){
				new_arr.push(this.arr[i]-that.arr[i])
			}
			if(op == '*'){
                new_arr.push(this.arr[i]*that.arr[i])
			}
			if(op == '/'){
				new_arr.push(this.arr[i]/that.arr[i])
			}
			
		}
		return new_arr
	}
	multiply(that){
		let new_arr = this.operator(that,'*')
		return new Vector(new_arr)
	}
	substract(that){
		let new_arr  = this.operator(that,'-')
		return new Vector(new_arr)		
	}
	plus(that){
		let new_arr  = this.operator(that,'+')
		return new Vector(new_arr)		
	}	
	div(that){
		let new_arr  = this.operator(that,'/')
		return new Vector(new_arr)		
	}	
	toString(){
		let res = "[";
		let flag = true;
		for(let val of this.arr){
			if(flag){
				flag = false;
				res = res  +  val;
			}else{
				res = res + "," +  val;
			}
		}
		res = res + "]";
		return res
	}
	map(f){
		this.arr = this.arr.map(f)
	}
	sum(){
		let res = 0;
		for(let val of this.arr){
			res = res + val;
		}
		return res;
	}
	dot(that){
		let v = this.multiply(that)
		return v.sum()
	}
	multiplyNum(num){
		let new_arr = []
		for(let i=0;i<this.arr.length;i++){
			new_arr.push(this.arr[i]*num);
		}
		return new Vector(new_arr)
	}
}
const shape = (dataMat) =>{
	return [dataMat.length,dataMat[0].length]
}
const sigmoid = (val)=>{
	return 1.0/(1+Math.exp(-val));
}
const print = (val)=>{
	console.log(val)
}
const shuffle = (array)=>{
    var i,x,j;
    for(i=array.length;i>0;i--){
        j = Math.floor(Math.random()*i);
        x = array[j];
        array[j] = array[i-1];
        array[i-1] = x;
    }
}
const range = (n)=>{
	let arr = []
	for(let i=0;i<n;i++){
		arr.push(i)
	}
	return arr
}

class TwoDData{
	constructor(dataMat){
		this.dataMat = dataMat
		this.n = dataMat.length
		this.m = dataMat[0].length
		this.initRange()
	}
	initRange(){
		let min_x = -1
		let max_x = -1
		let min_y = -1
		let max_y = -1
		let flag = true;
		for(let vec of dataMat){
			let x = vec[0];
			let y = vec[1];
			if(flag){
				min_x = x
				min_y = y
				max_x = x
				max_y = y
				flag = false
			}else{
				if(min_x > x){
					min_x = x
				}
				if(max_x < x){
					max_x = x
				}
				if(min_y > y){
					min_y = y
				}
				if(max_y < y){
					max_y = y
				}
			}
		}
		this.range = {x_range:(max_x-min_x)*2,y_range:(max_y-min_y)*2}
		this.min_x = min_x
		this.max_x = max_x
	}
	getDot(i){
		return dataMat[i]
	}
}

// data = new TwoDData(dataMat)
// print(data.range)