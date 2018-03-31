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
	constructor(leftNode,rightNode,nodeVal,split){
		this.leftNode = leftNode
		this.rightNode = rightNode
		this.nodeVal = nodeVal
		this.split = split
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
	return new Node(createRoot(newDataSet.slice(0,mid),(split+1)%k),createRoot(newDataSet.slice(mid+1),(split+1)%k),newDataSet[mid],split)
}

const preOrder = (node) => {
	if(node){
		print(node.nodeVal)
		preOrder(node.leftNode)
		preOrder(node.rightNode)
	}
}

const dis = (v1,v2) => {
	let len = v1.length
	let sum = 0
	for(let i=0;i<len;i++){
		sum += (v1[i]-v2[i])*(v1[i]-v2[i])
	}
	return Math.sqrt(sum)
}

const findNN = (node,target) => {
	let tmp_root = node
	let min_dis = dis(node.nodeVal,target)
	let retNN = node.nodeVal
	let nodeList = []
	while(tmp_root){
		nodeList.push(tmp_root)
		let tmp_dis = dis(tmp_root.nodeVal,target)
		if(min_dis > tmp_dis){
			min_dis = tmp_dis
			retNN = tmp_root.nodeVal
		}
		let split = tmp_root.split
		if(target[split] < tmp_root.nodeVal[split]){
			tmp_root = tmp_root.leftNode
		}else{
			tmp_root = tmp_root.rightNode
		}
	}
 	while(nodeList.length > 0){
		let back_node = nodeList.pop()
		let split = back_node.split
		let now_dis = dis(back_node.nodeVal,target)
		if(Math.abs(target[split] - back_node.nodeVal[split]) < min_dis){
			if(target[split] < back_node.nodeVal[split]){
				tmp_root = back_node.rightNode
			}else{
				tmp_root = back_node.leftNode
			}
			if(tmp_root){
				nodeList.push(tmp_root)
				let tmp_dis = dis(tmp_root.nodeVal,target)
				if(min_dis > tmp_dis){
					min_dis = tmp_dis
					retNN = tmp_root.nodeVal
				}
			}
		}
	}
	return [retNN,min_dis]
}