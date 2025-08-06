const { Post } = require('../models');

const createPost = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Campos obrigatórios: title e content' });
    }

    const newPost = await Post.create({
      userId,
      title,
      content
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ message: 'Erro interno ao criar post.' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    console.log('Usuário autenticado:', req.user); 
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return res.status(500).json({ error: 'Erro ao buscar posts' });
  }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.id;

        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ message: 'Você não tem permissão para editar este post' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        res.json(post);
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        res.status(500).json({ message: 'Erro ao atualizar post' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ message: 'Você não tem permissão para deletar este post' });
        }

        await post.destroy();

        res.json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar post:', error);
        res.status(500).json({ message: 'Erro ao deletar post' });
    }
};


module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};