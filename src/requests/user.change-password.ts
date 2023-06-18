export default interface UserChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
