import mongoose from "mongoose";
import USER from "@/Lib/Models/User.model";
import { validateUserData } from "../Utils/validateUserData";
import { createAccessToken, createRefreshToken } from '../Utils/createToken.util.js';
import connectDb from "@/Lib/Db/connectDb";
import bcrypt from "bcrypt";

// Constants for better maintainability
const HTTP_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  CREATED: 201,
  SUCCESS: 200
};

const MESSAGES = {
  VALIDATION_ERROR: "Invalid input data provided",
  USER_EXISTS: "User already exists. Please try logging in instead",
  USER_NOT_FOUND: "Invalid credentials provided",
  PASSWORD_INVALID: "Invalid credentials provided",
  USER_CREATED: "User created successfully",
  USER_AUTHENTICATED: "User authenticated successfully",
  INTERNAL_ERROR: "An internal error occurred"
};

// Utility function for consistent error responses
const createErrorResponse = (status, message) => ({
  status,
  message,
  error: message,
  timestamp: new Date().toISOString()
});

// Utility function for consistent success responses
const createSuccessResponse = (status, message, data = {}) => ({
  status,
  message,
  timestamp: new Date().toISOString(),
  ...data
});

// Input validation wrapper
const validateInput = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      return {
        valid: false,
        message: `${field} is required`
      };
    }
  }
  return { valid: true };
};

export async function createUser(data) {
  try {
    await connectDb();

    // Enhanced validation with better error handling
    const validationResult = validateUserData(data);
    if (!validationResult.valid) {
      return createErrorResponse(HTTP_STATUS.BAD_REQUEST, validationResult.message);
    }

    // Input validation
    const inputValidation = validateInput(data, ['username', 'email', 'password']);
    if (!inputValidation.valid) {
      return createErrorResponse(HTTP_STATUS.BAD_REQUEST, inputValidation.message);
    }

    // Check for existing user with specific query
    const existingUser = await USER.findOne({
      $or: [
        { email: data.email.toLowerCase().trim() }, 
        { username: data.username.trim() }
      ]
    }).select('_id username email'); // Only select needed fields for performance

    if (existingUser) {
      return createErrorResponse(HTTP_STATUS.CONFLICT, MESSAGES.USER_EXISTS);
    }

    // Prepare user data with sanitization
    const userData = {
      username: data.username.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password // Will be hashed by pre-save middleware
    };

    const newUser = new USER(userData);
    
    // Generate tokens
    const accessToken = createAccessToken({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    });
    
    const refreshToken = createRefreshToken({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    });
    
    newUser.refreshToken = refreshToken;
    await newUser.save();

    return createSuccessResponse(
      HTTP_STATUS.CREATED, 
      MESSAGES.USER_CREATED,
      { 
        accessToken,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
      }
    );

  } catch (error) {
    console.error('Create user error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return createErrorResponse(HTTP_STATUS.CONFLICT, MESSAGES.USER_EXISTS);
    }
    
    if (error.name === 'ValidationError') {
      return createErrorResponse(HTTP_STATUS.BAD_REQUEST, MESSAGES.VALIDATION_ERROR);
    }
    
    return createErrorResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.INTERNAL_ERROR);
  }
}

export async function loginUser(data) {
  try {
    await connectDb();

    // // Enhanced input validation
    // const inputValidation = validateInput(data, ['email', 'password']);
    // if (!inputValidation.valid) {
    //   return createErrorResponse(HTTP_STATUS.BAD_REQUEST, inputValidation.message);
    // }
    console.log("reached controller")
    console.log("data:->"+data);

    const existingUser = await USER.findOne({username:data.username})
    .select('+password refreshToken username email'); // Explicitly include password for comparison

    console.log(existingUser);

    if (!existingUser) {
      return createErrorResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.USER_NOT_FOUND);
    }

    //const isPasswordValid = await bcrypt.compare(data.password, existingUser.password);
    
    // if (!isPasswordValid) {
    //   return createErrorResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.PASSWORD_INVALID);
    // }
    
    const userData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email
    };
    
    // Generate new tokens
    const accessToken = createAccessToken(userData);
    const refreshToken = createRefreshToken(userData);

    // Update refresh token in database
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    return createSuccessResponse(
      HTTP_STATUS.SUCCESS, 
      MESSAGES.USER_AUTHENTICATED,
      { 
        accessToken,
        user: userData
      }
    );

  } catch (error) {
    console.error('Login user error:', error);
    
    return createErrorResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.PASSWORD_INVALID);
  }
}

// Additional utility functions for better maintainability

/**
 * Refresh access token using refresh token
 */


/**
 * Logout user and invalidate refresh token
 */
