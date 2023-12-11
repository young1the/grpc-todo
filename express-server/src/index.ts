import express from "express"
import { HelloReply, HelloRequest, MyServiceClient } from "./proto/hello";
import { credentials } from "@grpc/grpc-js";

const app = express()
const port = 3001

const grpcClient = new MyServiceClient(
    'localhost:9090',
    credentials.createInsecure()
);

app.get('/', async (_, res) => {
    const message: HelloRequest = { name: "young" };
    grpcClient.sayHello(message, (error, reply: HelloReply) => {
        res.send(reply)
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})