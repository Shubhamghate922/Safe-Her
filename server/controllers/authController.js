import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { sendEmail } from '../services/emailService.js';

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    if (user) {
      // Send welcome email
      await sendEmail(
        email,
        'Welcome to SafeHer!',
        `Hello ${name},\n\nWelcome to SafeHer - Your safety companion.\n\nYour account has been created successfully.\n\nStay safe, stay secure!\n\n- The SafeHer Team`
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid user data',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      let isPasswordValid = false;
      
      // Attempt 1: Compare using bcrypt (for users created via API)
      try {
        isPasswordValid = await user.comparePassword(password);
      } catch (err) {
        // If comparePassword fails, the DB might have plain text
        isPasswordValid = false;
      }

      // Attempt 2: Direct comparison (for users pasted directly into Compass)
      if (!isPasswordValid && user.password === password) {
        isPasswordValid = true;
      }

      if (isPasswordValid) {
        return res.json({
          success: true,
          message: 'Login successful',
          data: { 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            phone: user.phone, 
            role: user.role, 
            token: generateToken(user._id) 
          }
        });
      }
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });

//     if (user && (await user.comparePassword(password))) {
//       res.json({
//         success: true,
//         message: 'Login successful',
//         data: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           role: user.role,
//           token: generateToken(user._id),
//         },
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      res.json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.profileImage = req.body.profileImage || user.profileImage;
      user.emergencyEnabled = req.body.emergencyEnabled ?? user.emergencyEnabled;
      user.updatedAt = new Date();

      const updatedUser = await user.save();

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check current password
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  try {
    // JWT is stateless, so logout is handled on client side
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};