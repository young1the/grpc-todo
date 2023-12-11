import express from "express"
import cors from "cors"
import { credentials } from "@grpc/grpc-js";
import { GetTodosResponse, SaveTodoRequest, TodoServiceClient } from "./proto/todo";

const app = express()
app.use(cors());
app.use(express.json())
const port = 3001

const grpcClient = new TodoServiceClient(
    'localhost:9090',
    credentials.createInsecure()
);

app.get('/api/todo', async (_, res) => {
    grpcClient.getTodos({}, (_, reply: GetTodosResponse) => {
        res.json(reply);
    })
})

app.post('/api/todo', async (req, _) => {
    console.log(req.body);
    const message = { title: req.body.title ?? "" }
    grpcClient.saveTodo(message, (error, reply) => {
        console.log(reply);
        console.log(error);
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})