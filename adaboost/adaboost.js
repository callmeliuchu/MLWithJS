const loadDataSet = ()=>{
	dataMat =[[1,2.1],
              [2,1.1],
              [1.3,1],
              [1,1],
              [2,1]]
	classLabels = [1.0,1.0,-1.0,-1.0,1.0]
	return [dataMat,classLabels]
}
const print = (obj)=>{
	console.log(obj)
}
const shapeOfMat = (dataMat) => {
	return [dataMat.length,dataMat[0].length]
}
const stumpClassify = (dataMat,dim,thresh,inequal)=>{
	let [m,n] = shapeOfMat(dataMat);
	let classLabels = initArr(m,1);
	for(let i=0;i<m;i++){
		if(inequal == 'lt'){
			if(dataMat[i][dim]<=thresh){
				classLabels[i] = -1;
			}
		}else{
			if(dataMat[i][dim]>thresh){
				classLabels[i] = -1;
			}
		}
	}
	return classLabels
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
const buildStump = (dataMat,classLabels,D)=>{
	let [m,n] = shapeOfMat(dataMat)
	let returnLabels = initArr(m,1);
	let flag = true;
	let minError = 1;
	let bestStump = {}
	for(let j=0;j<n;j++){
		let tmpArr = [];
		for(let vec of dataMat){
			tmpArr.push(vec[j]);
		}
		let minVal = minInArr(tmpArr);
		let maxVal = maxInArr(tmpArr);
		let rangeVal = maxVal - minVal;
		let stepNums = 10.0;
		let stepSize = rangeVal/stepNums;
		const inequals = ['lt','gt'];
		for(let k=-1;k<(stepNums+1);k++){
			for(let ineq of inequals){
				let tmpVal = minVal + parseFloat(k)*stepSize;
				let bestLabels = stumpClassify(dataMat,j,tmpVal,ineq)
				let arr = multiplyArrs(compareArrsNotEqual(bestLabels,classLabels),D);
				let error = sumOfArr(arr);
				if(minError>error){
					minError = error;
					returnLabels = bestLabels;
					bestStump['thresh'] = tmpVal;
					bestStump['ineq'] = ineq;
					bestStump['dim'] = j;
				}

			}
		}
	}
	return [bestStump,minError,returnLabels]
}

const sign = (val) => {
	if(val < 0){
		return -1
	}else if(val == 0){
		return 0;
	}else{
		return 1;
	}
}


const adaBoostTrainDS = (dataMat,classLabels,numIt=40) => {
	[m,n] = shapeOfMat(dataMat)
	let D = initArr(m,1).map((key)=>{return key/m;})
	let aggClass = initArr(m,0)
	let weakArr = []
	for(let i=0;i<numIt;i++){
		[bestStump,minError,returnLabels] = buildStump(dataMat,classLabels,D)
		let alpha = 0.5*Math.log((1-minError)/Math.max(1e-16,minError))
		bestStump['alpha'] = alpha
		// bestStump['stump'] = returnLabels
		let alphaClass = returnLabels.map((key)=>{return key*alpha})
		let newClassLabels = classLabels.map((key)=>{return key*(-1)*alpha})
		let tmpArr = multiplyArrs(returnLabels,newClassLabels)
		let exponArr = tmpArr.map((key)=>{return Math.exp(key);});
		let W = multiplyArrs(exponArr,D)
		let sumW = sumOfArr(W)
		D = W.map((key)=>{return key/sumW;});
		aggClass = plusArrs(aggClass,alphaClass);
		let tmpAggClass = aggClass.map(sign)
		let errorArr = compareArrsNotEqual(tmpAggClass,classLabels)
		let errorVal = sumOfArr(errorArr)
		weakArr.push(bestStump)
		if(errorVal == 0){
			break;
		}
	}
	return weakArr
}

const classify = (arr,weakArr) => {
	let sum = 0;
	for(let stump of weakArr){
		let ineq  = stump['ineq'];
		let dim = stump['dim'];
		let thresh = stump['thresh'];
		let alpha = stump['alpha'];
		if(ineq == 'lt'){
			if(arr[dim] <= thresh){
				sum = sum + alpha*(-1);
			}else{
				sum = sum + alpha;
			}
		}else{
			if(arr[dim] > thresh){
				sum = sum + alpha*(-1);
			}else{
				sum = sum + alpha;
			}
		}
	}
	return sign(sum);
}

[dataMat,classLabels] = loadDataSet()
weakArr = adaBoostTrainDS(dataMat,classLabels)
let res = classify([1.4,1],weakArr)
print(res)
// [{'dim': 0, 'thresh': 1.3, 'ineq': 'lt', 'alpha': 0.6931471805599453}, 
// {'dim': 1, 'thresh': 1.0, 'ineq': 'lt', 'alpha': 0.9729550745276565}, 
// {'dim': 0, 'thresh': 0.90000000000000002, 'ineq': 'lt', 'alpha': 0.8958797346140273}]


// [ { thresh: 1.3, ineq: 'lt', dim: 0, alpha: 0.6931471805599453 },
//   { thresh: 1, ineq: 'lt', dim: 1, alpha: 0.9729550745276565 },
//   { thresh: 0.9, ineq: 'lt', dim: 0, alpha: 0.8958797346140273 } ]