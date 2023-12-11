import express from "express"
import cors from "cors"
import { credentials } from "@grpc/grpc-js";
import { GetTodosResponse, TodoServiceClient } from "./proto/todo";

const app = express()
app.use(cors());
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

// app.get('/api/todo', async (_, res) => {
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})