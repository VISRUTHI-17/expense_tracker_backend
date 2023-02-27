const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { getExpenses, getExpenseById, addExpense, deleteExpenses, loggerfunc, checkAdmin } = require('./controller/expense');



// const expenses=[
//     {id:1,name:'Movie',amount: 190,desc:'Vaathi'},
//     {id:2,name:'Treat',amount: 5000,desc:'Birthday Treat'},
//     {id:3,name:'Dress',amount: 2000,desc:'Kurtis'},
// ]

// const expenseDetails = [
//     {id:1, paymentMode:'UPI'},
//     {id:2, paymentMode:'Cash'},
//     {id:3, paymentMode:'Cash'},
// ]
// app.get('/api/v1/expenses',(req,res)=>{
//     res.status(200).json(expenses);
// })

// app.get('/api/v1/expense/:id',(req,res)=>{
//     let id = req.params.id;
//     for(let i=0;i<expenses.length;i+=1){
//         if(id==expenses[i].id){
//             let detailedExpense = {
//                 id: id,
//                 name: expenses[i].name,
//                 amount: expenses[i].amount,
//                 desc: expenses[i].desc,
//                 paymentMode: expenseDetails[i].paymentMode
//             }
//             res.status(200).json(detailedExpense);
//         }
//     }


// })
// app.post('/api/v1/expenses',(req,res)=>{
//     let newExpense = req.body;
//     newExpense.id = expenses[expenses.length-1].id + 1;
//     expenses.push(newExpense);
//     res.status(201).json(newExpense);
// })
// app.delete('/api/v1/expense/:id',(req,res)=>{
//     for(let i=0;i<expenses.length;i+=1){
//         if(expenses[i].id == req.params.id){
//             expenses.splice(i,1);
//         }
//     }
//     res.send("Deleted");
// })

// app.put('/api/v1/expense/:id',(req,res)=>{
//     console.log(req.body);
//     for(let i=0;i<expenses.length;i+=1){
//         if(expenses[i].id == req.params.id){
//             if(req.body.amount){
//                 expenses[i].amount = req.body.amount;
//             }
//             if(req.body.desc){
//                 expenses[i].desc = req.body.desc;
//             }
//         }
//     }
//     res.send("Updated")
// })
mongoose.connect('mongodb://localhost:27017/expense-tracker',
    {
        useNewUrlParser: true
    }
);

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error: "));
db.once("open",function(){
    console.log("Connected successfully");
});


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(loggerfunc);

app.get('/api/v1/health',(req,res)=>{
    res.status(200).json({
        message:"It worked!",
        status:"Success"
    })
})

app.get('/api/v1/expenses', getExpenses);
app.get('/api/v1/expenses/:id', getExpenseById);
app.post('/api/v1/expenses', checkAdmin, addExpense);
// app.delete('/api/v1/expenses/:id', deleteExpenses);
app.listen(3000,()=>{
    console.log("Server is running");
})