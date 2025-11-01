export async function logoutUser(refreshToken) {
  try {
    await connectDb();
    
    await USER.findOneAndUpdate(
      { refreshToken },
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
    
    return createSuccessResponse(HTTP_STATUS.SUCCESS, 'User logged out successfully');
    
  } catch (error) {
    console.error('Logout error:', error);
    return createErrorResponse(HTTP_STATUS.INTERNAL_ERROR, 'Logout failed');
  }
}