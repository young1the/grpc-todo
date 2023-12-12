import express from "express"
import cors from "cors"
import { credentials } from "@grpc/grpc-js";
import { GetTodosResponse, TodoServiceClient } from "./proto/todo";

const app = express()
app.use(cors());
app.use(express.json())
const port = 3001

const grpcClient = new TodoServiceClient(
    'localhost:9090',
    credentials.createInsecure()
);

app.get('/api/todo', async (_, res) => {
    grpcClient.readTodos({}, (_, reply: GetTodosResponse) => {
        res.json(reply);
    })
})

app.post('/api/todo', async (req, res) => {
    console.log(req.body);
    const message = { title: req.body.title ?? "" }
    grpcClient.createTodo(message, (_, reply) => {
        res.json(reply);
    })
})

app.delete('/api/todo/:id', async (req, res) => {
    const id = req.params.id;
    const message = { id: +id ?? -1 };
    grpcClient.deleteTodo(message, (_, reply) => {
        res.json(reply);
    })
})

app.put('/api/todo/:id', async (req, res) => {
    const message = {...req.body};
    console.log(message);
    grpcClient.updateTodo(message, (_, reply) => {
        res.json(reply);
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})