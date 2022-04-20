
import express from 'express';
import statusRoute from './routes/status.route';
import usersRoute from "./routes/users.route";

const app = express();



// Config da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Config de rotas
app.use(statusRoute);
app.use(usersRoute);



// Inicialização do servidor
app.listen(3000, () => {
    console.log('Application running on port 3000.');
});