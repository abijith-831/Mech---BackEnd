import User, { IUser , IAddress} from '../../models/user/userModel';

export class UserProfileRepositories {
  
  async changeImage(userId: string, filePath: string): Promise<IUser | null> {
    try {

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { image: filePath },
        { new: true }  
      );

      return updatedUser;
    } catch (error) {
      console.error('Error updating image in UserProfileRepositories:', error);
      throw error;
    }
  }



  async removeImage(userId: string): Promise<IUser | null> {
    try {

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { image: null }, 
        { new: true }  
      );

      return updatedUser;
    } catch (error) {
      console.error('Error removing image in UserProfileRepositories:', error);
      throw error;
    }
  }


  async changeName(userId: string, username: string): Promise<IUser | null> {
    try {

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username }, 
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      console.error('Error updating username in UserProfileRepositories:', error);
      throw error;
    }
  }

  async addNumber(userId:string,phone:string):Promise<IUser | null>{
    try {
      const updatedUser = await User.findOneAndUpdate(
        {_id:userId},
        {$set:{phone:phone}},
        {new:true}
      )
      if (!updatedUser) {
        throw new Error('User not found');
      }
  
      return updatedUser
    } catch (error) {
      console.error('Error updating user phone:', error);
      return null;
    }
  }

  async addAddress(formData: { userId: string; address: IAddress }): Promise<IUser | null> {
    try {

      console.log('form',formData);
      
      const updatedUser = await User.findByIdAndUpdate(
        formData.userId,
        {
          $push: {
            addresses: formData,
          },
        },
        { new: true }
      );
  
      return updatedUser; 
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  }
}
