import express, {Request, Response, NextFunction} from 'express';

const app = express();



app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send( {foo: 'dalionhendituy'});
});

app.listen(3000, () => {
    console.log('Application running on port 3000.');
});