const print = (obj) => {
	console.log(obj)
}
const loadSimpDat = ()=>{
    simpDat = [['r', 'z', 'h', 'j', 'p'],
               ['z', 'y', 'x', 'w', 'v', 'u', 't', 's'],
               ['z'],
               ['r', 'x', 'n', 'o', 's'],
               ['y', 'r', 'x', 'z', 'q', 't', 'p'],
               ['y', 'z', 'x', 'e', 'q', 's', 't', 'm']]
    return simpDat
}
const empty = (n) => {
	let str = '';
	for(let i=0;i<n;i++){
		str += '  ';
	}
	return str;
}
class TreeNode{
	constructor(name,count,parent){
		this.name = name
		this.count = count
		this.parent = parent
		this.children = {}
		this.nodeLink = null
	}
	inc(count){
		this.count += count
	}
	disp(ind=1){
		print(empty(ind)+"  "+this.name+"  "+this.count)
		for(let key in this.children){
			this.children[key].disp(ind+1)
		}
	}
}


class CustomSet{
    constructor(arr){
        this.arr = arr;
    }
    size(){
        return this.arr.length;
    }
    containsElement(val){
        if(this.arr.indexOf(val) > -1){
            return true;
        }
        return false;
    }
    getVal(index){
        return this.arr[index]
    }
    contains(that){
        for(let i=0;i<that.size();i++){
            if(!this.containsElement(that.getVal(i))){
                return false;
            }
        }
        return true;
    }
    copy(){
        let tmpArr = []
        for(let i=0;i<this.arr.length;i++){
            tmpArr.push(this.arr[i]);
        }
        return tmpArr;
    }
    hashCode(){
        let tmpArr = this.copy()
        tmpArr.sort()
        return tmpArr.join('_')
    }
    substract(that){
        let tmpSet = new Set(that.arr)
        let tmpArr = []
        for(let val of this.arr){
            if(!tmpSet.has(val)){
                tmpArr.push(val)
            }
        }
        return new CustomSet(tmpArr)
    }
}
const initSet = (dataSet) => {
    let newData = dataSet.map((key) => {return new CustomSet(key)})
    let retData = {}
    for(let data of newData){
    	if(data.hashCode() in retData){
    		retData[data.hashCode()].count += 1
    	}else{
    		retData[data.hashCode()] = {'obj':data,'count':1}
    	}
    }
    return retData
}
const createTree = (dataSet,minSup=2)=>{
	let headTable = {}
	for(let key in dataSet){
		let arr = dataSet[key].obj.arr
		for(let val of arr){
			if(val in headTable){
				headTable[val] += 1
			}else{
				headTable[val] = 1
			}
		}
	}
	let freqItemArr = []
	for(let key in headTable){
		if(headTable[key] < minSup){
			delete headTable[key]
		}else{
			freqItemArr.push(key)
			headTable[key] = [headTable[key],null]
		}
	}
	if(freqItemArr.length == 0){
		return [null,null]
	}
	let retTree = new TreeNode('empty',1,null)
	for(let key in dataSet){
		let freqArr = dataSet[key].obj.arr;
		let count = dataSet[key].count;
		let filterArr = freqArr.filter((key)=>{if(key in headTable){return key}})
		if(filterArr.length > 0){
			filterArr.sort((a,b)=>{return headTable[b][0] - headTable[a][0]})
			updateTree(filterArr,retTree,headTable,count)
		}
	}
	return [retTree,headTable]
}
const updateHeadTable = (tmpNode,node) => {
	while(tmpNode.nodeLink != null){
		tmpNode = tmpNode.nodeLink;
	}
	tmpNode.nodeLink = node;
}
const updateTree = (items,tree,headTable,count) => {
	if(items[0] in tree.children){
		tree.children[items[0]].inc(count)
	}else{
		tree.children[items[0]] = new TreeNode(items[0],count,tree)
		if(headTable[items[0]][1] == null){
			headTable[items[0]][1] = tree.children[items[0]]
		}else{
			updateHeadTable(headTable[items[0]][1],tree.children[items[0]])
		}
	}
	if(items.length > 1){
		updateTree(items.slice(1),tree.children[items[0]],headTable,count)
	}
}

let dataSet = loadSimpDat()
let set = initSet(dataSet)
res = createTree(set)
res[0].disp()
print(res[1])
