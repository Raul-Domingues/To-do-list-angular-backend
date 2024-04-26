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
    }
});

app.post('/criar-tarefa', async (req: any, res: any) => {
    try {
        const tarefa = req.body;
        const novaTarefa = new tarefaModel(tarefa);
        await novaTarefa.save();
      res.status(200).json({ message: 'Tarefa criada com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
});

app.delete('/deletar-tarefa/:_id', async (req: any, res: any) => {
    try {
        const id = req.params._id;
        const { concluido } = req.body;
        await tarefaModel.findByIdAndDelete(id, { concluido })
        res.status(200).json({ message: 'Tarefa deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
}})

app.patch('/editar-tarefa/:_id', async (req: any, res: any) => {
    try {
        const id = req.params._id;
        const tarefa = await tarefaModel.findById(id);
        const statusTarefa = !tarefa?.concluido

        await tarefaModel.findByIdAndUpdate(id,{ concluido: statusTarefa });
        res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
    }
})