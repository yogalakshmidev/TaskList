console.log("Hello javascript");
const promise= new Promise((resolve,reject)=>{
  setTimeout(()=>{
  // fetch data
  // do something with the data
  let data=10;
  let successFactor=false;
  // take decision whether the operation is success or not
  if(successFactor){
    resolve(data);

  }
  else{
    reject("Network error in the operation");
  }
    },3000);
});

promise
  .then((data)=>{
    console.log('operation completed');
    console.log('data received : ',data);
  })
  .catch((error)=>{
    console.log('operation failed');
    console.log('error : ',error);
  })
  .then(()=>{
    console.log('I will execute no matter success or failure');
    throw new Error('something unexpected happened');
  })
  .then(()=>{
    console.log('I will execute too!');
  })
  .catch((errormsg)=>{1
    console.log(errormsg)
  })

