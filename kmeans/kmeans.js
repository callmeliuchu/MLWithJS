dataMat = [[1.658985, 4.285136], [-3.453687, 3.424321], [4.838138, -1.151539], [-5.379713, -3.362104], [0.972564, 2.924086], [-3.567919, 1.531611], [0.450614, -3.302219], [-3.487105, -1.724432], [2.668759, 1.594842], [-3.156485, 3.191137], [3.165506, -3.999838], [-2.786837, -3.099354], [4.208187, 2.984927], [-2.123337, 2.943366], [0.704199, -0.479481], [-0.39237, -3.963704], [2.831667, 1.574018], [-0.790153, 3.343144], [2.943496, -3.357075], [-3.195883, -2.283926], [2.336445, 2.875106], [-1.786345, 2.554248], [2.190101, -1.90602], [-3.403367, -2.778288], [1.778124, 3.880832], [-1.688346, 2.230267], [2.592976, -2.054368], [-4.007257, -3.207066], [2.257734, 3.387564], [-2.679011, 0.785119], [0.939512, -4.023563], [-3.674424, -2.261084], [2.046259, 2.735279], [-3.18947, 1.780269], [4.372646, -0.822248], [-2.579316, -3.497576], [1.889034, 5.1904], [-0.798747, 2.185588], [2.83652, -2.658556], [-3.837877, -3.253815], [2.096701, 3.886007], [-2.709034, 2.923887], [3.367037, -3.184789], [-2.121479, -4.232586], [2.329546, 3.179764], [-3.284816, 3.273099], [3.091414, -3.815232], [-3.762093, -2.432191], [3.542056, 2.778832], [-1.736822, 4.241041], [2.127073, -2.98368], [-4.323818, -3.938116], [3.792121, 5.135768], [-4.786473, 3.358547], [2.624081, -3.260715], [-4.009299, -2.978115], [2.493525, 1.96371], [-2.513661, 2.642162], [1.864375, -3.176309], [-3.171184, -3.572452], [2.89422, 2.489128], [-2.562539, 2.884438], [3.491078, -3.947487], [-2.565729, -2.012114], [3.332948, 3.983102], [-1.616805, 3.573188], [2.280615, -2.559444], [-2.651229, -3.103198], [2.321395, 3.154987], [-1.685703, 2.939697], [3.031012, -3.620252], [-4.599622, -2.185829], [4.196223, 1.126677], [-2.133863, 3.093686], [4.668892, -2.562705], [-2.793241, -2.149706], [2.884105, 3.043438], [-2.967647, 2.848696], [4.479332, -1.764772], [-4.905566, -2.91107]]

const shapeOfMat = (dataMat) => {
	return [dataMat.length,dataMat[0].length]
}
const numInArr = (arr,kind='min')=>{
	let flag = true;
	let return_num=-1;
	for(let val of arr){
		if(flag){
			return_num = val;
			flag = false;
		}else{
			if(kind=='min'){
				if(return_num>val){
					return_num = val;
				}
			}else if(kind=='max'){
				if(return_num<val){
					return_num=val;
				}
			}else{
				console.info('not support '+kind+' now');
				return return_num;
			}
		}
	}
	return return_num;
}

const maxInArr = (arr) => {
	return numInArr(arr,'max');
}

const minInArr = (arr) => {
	return numInArr(arr,'min');
}
const initArr = (n,val)=>{
	let arr = [];
	for(let i=0;i<n;i++){
		arr.push(val);
	}
	return arr;
}
const compareArrsNotEqual = (arr1,arr2) => {
	let arr = [];
	for(let i=0;i<arr1.length;i++){
		if(arr1[i] != arr2[i]){
			arr.push(1);
		}else{
			arr.push(0);
		}
	}
	return arr;
}
const sumOfArr = (arr) => {
	let returnVal = 0;
	for(let val of arr){
		returnVal = returnVal + val;
	}
	return returnVal;
} 
const operatorOfArrs = (arr1,arr2,op)=>{
	let arr = [];
	for(let i=0;i<arr1.length;i++){
		if(op=='+'){
			arr.push(arr1[i]+arr2[i]);
		}
		if(op=='-'){
			arr.push(arr1[i]-arr2[i]);
		}
		if(op=='*'){
			arr.push(arr1[i]*arr2[i]);
		}
		if(op=='/'){
			arr.push(arr1[i]/arr2[i]);
		}
	}
	return arr;
}
const multiplyArrs = (arr1,arr2)=>{
	return operatorOfArrs(arr1,arr2,'*');
}
const plusArrs = (arr1,arr2) => {
	return operatorOfArrs(arr1,arr2,'+');
}
const subtractArrs = (arr1,arr2) => {
	return operatorOfArrs(arr1,arr2,'-');
}


const shape = (dataMat) =>{
	return shapeOfMat(dataMat)
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

const centeriod = (dataMat,k) => {
	let [m,n] = shapeOfMat(dataMat)
	let minArr = []
	let maxArr = []
	for(let j=0;j<n;j++){
		let tmpArr = []
		for(let i=0;i<m;i++){
			tmpArr.push(dataMat[i][j]);
		}
		let minVal = minInArr(tmpArr);
		let maxVal = maxInArr(tmpArr);
		minArr.push(minVal);
		maxArr.push(maxVal);
	}
	let retArr = []
	for(let i=0;i<k;i++){
		let tmpArr = []
		for(let j=0;j<n;j++){
			let minVal = minArr[j];
			let maxVal = maxArr[j];
			let rangeVal = maxVal - minVal;
			tmpArr.push(minVal + Math.random()*rangeVal);
		}
		retArr.push(tmpArr);
	}
	return retArr;
}
const disEul = (arr1,arr2) => {
	let arr = subtractArrs(arr1,arr2)
	arr = arr.map((key)=>{return key*key})
	let sum = sumOfArr(arr)
	return Math.sqrt(sum)
}

const initMat = (m,n,val) => {
	let retMat = []
	for(let i=0;i<m;i++){
		let arr = initArr(n,val)
		retMat.push(arr)
	}
	return retMat
}
const meanArrOfMat = (dataMat) =>{
	[m,n] = shapeOfMat(dataMat)
	let retArr = []
	for(let i=0;i<n;i++){
		let tmpArr = []
		for(let vec of dataMat){
			tmpArr.push(vec[i])
		}
		let meanVal = sumOfArr(tmpArr)/tmpArr.length
		retArr.push(meanVal)
	}
	return retArr
}

const copyMat = (dataMat) => {
	let [m,n] = shapeOfMat(dataMat)
	let retMat = []
	for(let i=0;i<m;i++){
		let tmpArr = []
		for(let j=0;j<n;j++){
			tmpArr.push(dataMat[i][j]);
		}
		retMat.push(tmpArr);
	}
	return retMat;
}

const sumAxisOfMat = (dataMat,axis) => {
	let sum = 0;
	for(let i=0;i<dataMat.length;i++){
		sum = sum + dataMat[i][axis];
	}
	return sum;
}


const sumAxisOfMatByControl = (dataMat,axis,val,isColumn) => {
	let sum = 0;
	for(let i=0;i<dataMat.length;i++){
		if(dataMat[i][axis] == val){
			if(isColumn){
				sum = sum + dataMat[i][axis];
			}else{
				sum = sum + dataMat[i][axis];
			}
		}
	}
	return sum;
}


let resRecords = []
const kmeans = (dataMat,k,dis=disEul,createCenter=centeriod) =>{
	let [m,n] = shapeOfMat(dataMat)
	let center = createCenter(dataMat,k)
	let clusterAssement = initMat(m,2,0)
	let clusterChanges = true
	while(clusterChanges){
		clusterChanges = false
		let clusterArr = new Array(k)
		for(let i=0;i<m;i++){
			let minDis = -1
			let minIndex = -1
			let flag = true
			for(let j=0;j<k;j++){
				let distance = dis(center[j],dataMat[i])
				if(flag){
					flag = false
					minDis = distance
					minIndex = j
				}else{
					if(minDis > distance){
						minDis = distance
						minIndex = j						
					}
				}
			}
			if(clusterAssement[i][0] != minIndex){
				clusterChanges = true
			}
			clusterAssement[i][0] = minIndex
			clusterAssement[i][1] = minDis
			if(typeof clusterArr[minIndex] == 'undefined'){
				clusterArr[minIndex] = []
			}
			clusterArr[minIndex].push(i);
		}
		for(let cent=0;cent<k;cent++){
			let tmpMat = []
			for(let j=0;j<clusterArr[cent].length;j++){
				let index = clusterArr[cent][j]
				tmpMat.push(dataMat[index])
			}
			let meanArr = meanArrOfMat(tmpMat)
			center[cent] = meanArr
		}
		resRecords.push([copyMat(center),copyMat(clusterAssement)])
	}
	return [center,clusterAssement]
}


const getColumnArrOfMatByAxisValue = (dataMat,axis,val)=>{
	let arr = []
	for(let i=0;i<dataMat.length;i++){
		if(dataMat[i][axis] == val){
			arr.push(i);
		}
	}
	return arr;
}


const getMatByColumns = (dataMat,columnArr) => {
	let retMat = [];
	for(let index of columnArr){
		let tmpArr = []
		for(let j=0;j<dataMat[index].length;j++){
			tmpArr.push(dataMat[index][j])
		}
		retMat.push(tmpArr)
	}
	return retMat
}

const setMatValueByColumns = (dataMat,columnArr,axis,val)=>{
	for(let index of columnArr){
		dataMat[index][axis] = val
	}
}

const changeMatValueByAxisValue = (dataMat,axis,val,changeVal)=>{
	for(let i=0;i<dataMat.length;i++){
		if(dataMat[i][axis] == val){
			dataMat[i][axis] = changeVal;
		}
	}
} 

const putMatToMat = (mat1,mat2)=>{
	for(let i=0;i<mat1.length;i++){
		mat2[i][0] = mat1[i][0];
		mat2[i][1] = mat1[i][1];
	}
} 

const bikmeans = (dataMat,k,dis=disEul) => {
	let [m,n] = shapeOfMat(dataMat)
	let clusterAssement = initMat(m,2,0)
	let centeriod0 = meanArrOfMat(dataMat)
	let centList = [centeriod0]
	for(let j=0;j<m;j++){
		let val = dis(centeriod0,dataMat[j]);
		clusterAssement[j][1] = val*val;
	}
	while(centList.length < k){
		let minError = Number.POSITIVE_INFINITY;
		let bestIndex = -1
		let bestCluster = null;
		let bestCent = null;
		for(let i=0;i<centList.length;i++){

			let columns = getColumnArrOfMatByAxisValue(clusterAssement,0,i)
			// print(clusterAssement)
			// print(columns)
			print(clusterAssement)
			print(columns)
			let newMat = getMatByColumns(dataMat,columns)
			print(newMat)
			let [center,cluster] = kmeans(newMat,2,dis)
			let splitError = sumAxisOfMat(cluster,1);
			let notSplitError = sumAxisOfMatByControl(clusterAssement,0,i,false);
			let sumError = splitError+notSplitError
			if(minError > sumError){
				minError = sumError
				bestIndex = i;
				bestCluster = cluster;
				bestCent = center
			}
		}
		centList[bestIndex] = bestCent[0]
		centList.push(bestCent[1])
		changeMatValueByAxisValue(bestCluster,0,0,bestIndex)
		changeMatValueByAxisValue(bestCluster,0,1,centList.length)
		putMatToMat(bestCluster,clusterAssement)
	}
	return [centList,clusterAssement]
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



bikmeans(dataMat,4)