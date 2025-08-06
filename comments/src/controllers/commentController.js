const { Comment } = require('../../models/');

const createComment = async (req, res) => {
  try {
    
    const { postId, userId, content } = req.body;

    if (!postId || !userId || !content) {
      return res.status(400).json({ error: 'postId, userId e content são obrigatórios' });
    }

    const newComment = await Comment.create({ postId, userId, content });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getComments = async (req, res) => {
  try {

    const { postId } = req.query;
    const where = {};
    if (postId) where.postId = postId;

    const comments = await Comment.findAll({ where });

    return res.status(200).json(comments);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const updateComment = async (req, res) => {
  try {

    const commentId = req.params.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'O campo content é obrigatório' });
    }
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ error: 'Permissão negada: não é o autor do comentário' });
    }
    comment.content = content;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const deleteComment = async (req, res) => {
  try {

    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ error: 'Permissão negada: você não é o autor do comentário' });
    }
    await comment.destroy();

    return res.status(200).json({ message: 'Comentário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
