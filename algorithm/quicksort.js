let arr = [1,3,6,2,7,9,3,5,6]
const print = (obj) => {
	console.log(obj)
}
const swap = (arr,i,j) => {
	let tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}
const splitByIndex = (arr,index) => {
	let start = 0;
	let end = arr.length - 1;
	let val = arr[index];
    while(start < end){
    	while(arr[start]<=val)start++;
    	while(arr[end]>val)end--;
    	if(start >= end){
    		break;
    	}
    	swap(arr,start,end);
    }
    swap(arr,index,start);
    return start;
}

const quickSort = (arr,start,end) => {
	if(start>end){
		return;
	}
	let randIndex = Math.floor((Math.random()*(end - start))) + start
	let val = arr[randIndex]
	let index = splitByIndex(arr,randIndex)
	// quickSort(arr,start,index-1)
	// quickSort(arr,index+1,end)
	print(val)
	print(index)
	print(arr)
}

// quickSort(arr,0,8)

index = splitByIndex(arr,3)
print(index)
print(arr)