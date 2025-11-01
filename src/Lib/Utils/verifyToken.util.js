import USER from "@/Lib/Models/User.model";
import connectDb from "@/Lib/Db/connectDb";


export async function refreshAccessToken(refreshToken) {
  try {
    await connectDb();
    
    const user = await USER.findOne({ refreshToken }).select('+refreshToken');
    
    if (!user) {
      return createErrorResponse(HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token');
    }

    // Verify refresh token is still valid (not expired, etc.)
    // Add your refresh token validation logic here
    
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    
    const newAccessToken = createAccessToken(userData);
    
    return createSuccessResponse(
      HTTP_STATUS.SUCCESS, 
      'Token refreshed successfully',
      { accessToken: newAccessToken }
    );

  } catch (error) {
    console.error('Refresh token error:', error);
    return createErrorResponse(HTTP_STATUS.UNAUTHORIZED, 'Token refresh failed');
  }
}