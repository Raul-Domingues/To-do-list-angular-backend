import mongoose from 'mongoose';

const tarefaSchema = new mongoose.Schema({
  tarefa: {
    type: String,
    required: true,
  },
  concluido: {
    type: Boolean,
    required: false,
  }
});

export default mongoose.model('tarefaModel', tarefaSchema);