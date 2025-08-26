const http = require('http');
let data=[];
http.createServer((req,res)=>{
     if(req.method=='POST'){
    let body="";
    req.on('data',chunk=>{
            body+=chunk;
    });
    req.on('end',()=>{
        let finalData = JSON.parse(body);
        data.push(finalData);
        console.log(data);
        res.statusCode=200;
        res.end('Data Inserted');
    });

}
 if(req.method=='GET'){
    let body="";
    req.on('data',chunk=>{
        body+=chunk;
    });
    req.on('end',()=>{
        if(body){
            let parsed=JSON.parse(body);
            if(parsed.rollno){
                let result = data.find(s=>s.rollno===parsed.rollno);
                res.end(JSON.stringify(result||{}));
                return;
            }
        }
        else{
            res.end(JSON.stringify(data));
        }
    });
 }
 if(req.method=='DELETE'){
    let body="";
    req.on('data',chunk=>{
        body+=chunk;
    });
    req.on('end',()=>{
        let parsed=JSON.parse(body);
        let index = data.findIndex(s=>s.rollno===parsed.rollno);
        data.splice(index, 1);
        console.log(data);
        res.end('Data Deleted');

    });

}
 if(req.method=='PUT'){
    if(req.url==='getStudentByrollno'){
    let body="";
    req.on('data',chunk=>{
        body+=chunk;
    });
    req.on('end',()=>{
        let parsed=JSON.parse(body);
        let index = data.findIndex(s=>s.rollno===parsed.rollno);
        data.splice(index, 1);
        console.log(data);
        res.end('Data Updated');

    });

}
else{
    res.end(JSON.stringify(data))
}
 }

}).listen(3000);