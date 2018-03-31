const print = (obj) => {
	console.log(obj)
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
const loadDataSet = ()=>{
    postingList=[['my', 'dog', 'has', 'flea', 'problems', 'help', 'please'],
                 ['maybe', 'not', 'take', 'him', 'to', 'dog', 'park', 'stupid'],
                 ['my', 'dalmation', 'is', 'so', 'cute', 'I', 'love', 'him'],
                 ['stop', 'posting', 'stupid', 'worthless', 'garbage'],
                 ['mr', 'licks', 'ate', 'my', 'steak', 'how', 'to', 'stop', 'him'],
                 ['quit', 'buying', 'worthless', 'dog', 'food', 'stupid']]
    classVec = [0,1,0,1,0,1]
    return [postingList,classVec]
}

const createVocabulary = (dataSet) => {
	let set = new Set()
	for(let vec of dataSet){
		for(let word of vec){
			set.add(word)
		}
	}
	return Array.from(set)
}

const wordOfBag = (vocabulary,words) => {
	let vocaLen = vocabulary.length
	let arr = initArr(vocaLen,0)
	for(let word of words){
		let index = vocabulary.indexOf(word)
		arr[index] += 1
	}
	return arr
}

const genClassifyP = (dataSet,labels) => {
	let vocabulary = createVocabulary(dataSet)
	let vocaLen = vocabulary.length
	let p0V = initArr(vocaLen,1)
	let p1V = initArr(vocaLen,1)
	for(let i=0;i<labels.length;i++){
		let tag = labels[i];
		let vec = wordOfBag(vocabulary,dataSet[i])
		if(tag == 1){
			p1V = plusArrs(p1V,vec)
		}else{
			p0V = plusArrs(p0V,vec)
		}
	}
	let sumP0V = sumOfArr(p0V)
	p0V = p0V.map((key)=>{return Math.log(key/sumP0V)})
	let sumP1V = sumOfArr(p1V)
	p1V = p1V.map((key)=>{return Math.log(key/sumP1V)})
	p1 = sumOfArr(labels) / labels.length
	return [p0V,p1V,p1]
}



const classify = (vec,p0V,p1V,p1) => {
	let pC0 = sumOfArr(multiplyArrs(vec,p0V)) + Math.log(1-p1)
	let pC1 = sumOfArr(multiplyArrs(vec,p1V)) + Math.log(p1)
	if(pC0 > pC1){
		return 0
	}else{
		return 1
	}
}



[dataSet,labels] = loadDataSet()
let vocabulary = createVocabulary(dataSet)
pArr = genClassifyP(dataSet,labels)
for(let words  of dataSet){
	let vec = wordOfBag(vocabulary,words)
	let tag = classify(vec,pArr[0],pArr[1],pArr[2])
	print(tag)
}



// print(Math.log(2.71))


// [dataSet,lables]= loadDataSet()
// resList = createVocabulary(dataSet)


// for(let vec of dataSet){
// 	let arr = wordOfBag(resList,vec)
// 	print(arr)
// }
// print(resList)
// print(resList.indexOf('my'))
// print(dataSet[0])
// let s = new Set()
// for(let word of dataSet[0]){
// 	s.add(word)
// }
// print(s)
// arr = Array.from(s)
// print(arr)