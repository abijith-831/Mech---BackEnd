import { UserProfileRepositories } from '../../repositories/implementation/UserProfileRepositories';

const userProfileRepository = new UserProfileRepositories();

export class ProfileService {

  async changeImage(userId:string,filePath: string) {
    try {
      console.log('us',userId);
      console.log('us',filePath);
      
      const updatedUser = await userProfileRepository.changeImage(userId, filePath);
      
      return updatedUser;
    } catch (error) {
      console.error('Error in ProfileService:', error);
      throw error;
    }
  }



  async removeImage(userId: string) {
    try {

      const updatedUser = await userProfileRepository.removeImage(userId);
  
      if (updatedUser) {
        console.log('User image removed successfully:', updatedUser);
        return updatedUser;
      } else {
        console.log('User not found or image already removed');
        return null; 
      }
    } catch (error) {
      console.error('Error removing image:', error);
      throw new Error('Error removing image');
    }
  }
  
  async changeName(userId: string, username: string) {
    try {

      const updatedUser = await userProfileRepository.changeName(userId, username);
  
      if (updatedUser) {
        console.log('User name updated successfully:', updatedUser);
        return updatedUser;
      } else {
        console.log('User not found or username update failed');
        return null; 
      }
    } catch (error) {
      console.error('Error changing name:', error);
      throw new Error('Error changing name'); 
    }
  }


  async addPhone(userId:string , phone:string){
    try {
      const updatedUser = await userProfileRepository.addNumber(userId,phone)

      if (updatedUser) {
        console.log('Phone Number inserted successfully:', updatedUser);
        return updatedUser;
      } else {
        console.log('User not found or phone number update failed');
        return null; 
      }
      
    } catch (error) {
      console.error('Error setting phone', error);
      throw new Error('Error changing phone'); 
    }
  }


  async addAddress(formData:any){
    try {
      
      const updatedUser = await userProfileRepository.addAddress(formData)

      return updatedUser
      
    } catch (error) {
      console.error('Error setting address', error);
      throw new Error('Error setting address'); 
    }
  }
}
