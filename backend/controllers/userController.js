const { User } = require('../models');
const bcrypt = require('bcrypt');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Ancien et nouveau mots de passe requis.' });
    }
    

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Ancien mot de passe incorrect.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProfile,
  changePassword,
};
