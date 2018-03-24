const print = (obj) => {
	console.log(obj)
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
const loadDataSet = ()=>{
    return [[1,3,4],[2,3,5],[1,2,3,5],[2,5]]
}
const createC1 = (dataSet) => {
    let C1 = []
    for(let i=0;i<dataSet.length;i++){
        for(let j=0;j<dataSet[i].length;j++){
            let val = dataSet[i][j];
            if(C1.indexOf(val) == -1){
                C1.push(val)
            }
        }
    }
    C1.sort()
    return C1.map((key) => {return new CustomSet([key])})
}
const scanD = (D,Ck,minSupport) => {
    let ssCnt = {}
    for(let subSet of Ck){
        for(let dataSet of D){
            let hashCode = subSet.hashCode()
            if(dataSet.contains(subSet)){
                if(!(hashCode in ssCnt)){
                    ssCnt[hashCode] = {'count':0,'obj':subSet}
                }
                ssCnt[hashCode].count += 1
            }
        }
    }
    let dataLen = D.length
    let supportDataSet = {}
    let retList = []
    for(let key in ssCnt){
        support  = ssCnt[key].count/dataLen
        if(support >= minSupport){
            retList.push(ssCnt[key].obj)
        }
        supportDataSet[key] = {'support':support,'obj':ssCnt[key].obj}
    }
    return [retList,supportDataSet]
}
const arrsREqual = (arr1,arr2) => {
    if(arr1.length != arr2.length){
        return false;
    }
    for(let i=0;i<arr1.length;i++){
        if(arr1[i] != arr2[i]){
            return false;
        }
    }
    return true;
}
const combineArrs2Arr = (arr1,arr2) => {
    let s = new Set(arr1);
    for(let i=0;i<arr2.length;i++){
        s.add(arr2[i]);
    }
    let retArr = []
    for(let val of s){
        retArr.push(val);
    }
    retArr.sort()
    return retArr
}
const updateKeyValue = (dataSet,subSet) => {
    for(let key in subSet){
        dataSet[key] = subSet[key];
    }
}
const aprioriGen = (Lk,k) => {
    let dataLen = Lk.length
    let retList = []
    for(let i=0;i<dataLen;i++){
        for(let j=i+1;j<dataLen;j++){
            let arr1 = Lk[i].arr.slice(0,k)
            let arr2 = Lk[j].arr.slice(0,k)
            arr1.sort();
            arr2.sort();
            if(arrsREqual(arr1,arr2)){
                let arr = combineArrs2Arr(Lk[i].arr,Lk[j].arr)
                retList.push(new CustomSet(arr))
            }
        }
    }
    return retList
}
const apriori = (dataSet,minSupport=0.5) => {
    let C1 = createC1(dataSet)
    let D =  dataSet.map((key)=>{return new CustomSet(key)})
    res = scanD(D,C1,minSupport)
    let L1 = res[0]
    let supportDataSet = res[1]
    let L = [L1]
    let k = 0
    while(L[k].length > 0){
        let Ck = aprioriGen(L[k],k)
        let tmp = scanD(D,Ck,minSupport)
        let Lk = tmp[0]
        let supK = tmp[1]
        updateKeyValue(supportDataSet,supK)
        L.push(Lk)
        k += 1
    }
    return [L,supportDataSet]
}

const calcConf = (freqSet,H,supportDataSet,brl,minConf=0.7) => {
    let goodH = []
    for(let conseq of H){
        let target = freqSet.substract(conseq)
        // print('--------------')
        // print(freqSet)
        // print(conseq)
        // print(target)
        let conf = supportDataSet[freqSet.hashCode()].support / supportDataSet[target.hashCode()].support
        // print(conf)
        if(conf >= minConf){
            brl.push([target,conseq,conf])
            goodH.push(conseq)
        }
    }
    return goodH
}

const rulesFromConseq = (freqSet,H,supportDataSet,brl,minConf=0.7) => {
    let m = H[0].length
    if(freqSet.size()-1 > m){
        let h1 = aprioriGen(H,m-1)
        h1 = calcConf(freqSet,h1,supportDataSet,brl,minConf)
        if(h1.length > 1){
            rulesFromConseq(freqSet,h1,supportDataSet,brl,minConf)
        }
    }
}


const generateRules = (L,supportDataSet,minConf=0.7) => {
    let ruleList = []
    for(let i=1;i<L.length;i++){
        for(let freqSet of L[i]){
            let h1 = freqSet.copy()
            h1 = h1.map((key) => {return new CustomSet([key])})
            // print(h1)
            if(i>1){
                rulesFromConseq(freqSet,h1,supportDataSet,ruleList,minConf)
            }else{
                calcConf(freqSet,h1,supportDataSet,ruleList,minConf)
            }
        }
    }
    return ruleList
}



let dataSet = loadDataSet()
let [L,supportDataSet] = apriori(dataSet)
// print(L)
// print(supportDataSet)
let pp = generateRules(L,supportDataSet,0.5)
print(pp)