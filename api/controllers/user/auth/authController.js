import { User, } from "../../../../models/index.js";
import pkg from 'bcryptjs';
const { compare, hash} = pkg;

const updateAccount = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    console.log(email, currentPassword, newPassword);
    // Validate the current password
    const user = await User.findOne({ email }); // Assuming you have a User model
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    console.log(user)
    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid current password' });
    }

    // Hash the new password
    const hashedNewPassword = await hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.log('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default {
  updateAccount,
}


