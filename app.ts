import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import tarefaModel from './model/tarefaModel';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://raulhdomingues:QS93TQxTtx5gujMw@todo-pdi.vdhx2hz.mongodb.net/?retryWrites=true&w=majority&appName=ToDo-PDI').then(() => {
    console.log('Connected to the database');
}).catch((err: any) => {
    console.log('Error connecting to the database', err);
})

app.listen('3030', () => {
    console.log('Server is running on port 3030');
});


//--------------------------ROTAS----------------------------------//

app.get('/listar-tarefas', async (req: any, res: any) => {
    try {
        const tarefas = await tarefaModel.find();
        res.status(200).json(tarefas);
    } catch (error) {
        console.error('Erro ao listar tarefas:', error);
}});

app.post('/criar-tarefa', (req: any, res: any) => {
    try {
        const tarefa = req.body;
        const novaTarefa = new tarefaModel(tarefa);
        novaTarefa.save();
      res.status(200).json({ message: 'Tarefa criada com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
});





















// app.put('concluir-tarefa/:id', (req: any, res: any) => {
//     const id = req.params.id;
//     tarefaModel.findByIdAndUpdate(id, { concluido: true }).then(() => {
//         res.send('Tarefa concluída com sucesso!');
//     }).catch((err: any) => {
//         res.send('Erro ao concluir a tarefa', err);
//     })
// });

// app.delete('remover-tarefa/:id', (req: any, res: any) => {
//     const id = req.params.id;
//     tarefaModel.findByIdAndDelete(id).then(() => {
//         res.send('Tarefa removida com sucesso!');
//     }).catch((err: any) => {
//         res.send('Erro ao remover a tarefa', err);
//     })
// });