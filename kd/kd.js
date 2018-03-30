dataSet = [[2, 3],  
           [5, 4],  
           [9, 6],  
           [4, 7],  
           [8, 1],  
           [7, 2]]
const print = (obj) => {
	console.log(obj)
}

const copyArr = (arr) => {
	let retArr = []
	for(let i=0;i<arr.length;i++){
		let tmp = []
		for(let j=0;j<arr[i].length;j++){
			tmp.push(arr[i][j])
		}
		retArr.push(tmp)
	}
	return retArr
}

class Node{
	constructor(leftNode,rightNode,nodeVal){
		this.leftNode = leftNode
		this.rightNode = rightNode
		this.nodeVal = nodeVal
	}
}

const createRoot = (dataSet,split) => {
	if(dataSet.length == 0){
		return null;
	}
	let mid = Math.floor(dataSet.length / 2)
	let k = dataSet[0].length
	let newDataSet = copyArr(dataSet)
	newDataSet.sort((a,b) => {return a[split] - b[split]})
	return new Node(createRoot(newDataSet.slice(0,mid),(split+1)%k),createRoot(newDataSet.slice(mid+1),(split+1)%k),newDataSet[mid])
}

const preOrder = (node) => {
	if(node){
		print(node.nodeVal)
		preOrder(node.leftNode)
		preOrder(node.rightNode)
	}
}


node = createRoot(dataSet,0)
preOrder(node)