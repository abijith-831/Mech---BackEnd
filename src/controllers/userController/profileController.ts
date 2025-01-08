import { Request, Response } from "express";
import { ProfileService } from "../../services/user/profileServices";

const profileService = new ProfileService();

class ProfileController {

  async changeImage(req: Request, res: Response): Promise<void> {
    try {
        
      const file = req.file;
      const { userId } = req.body;

      if (!file) {
        res.status(400).json({ message: "No file uploaded!" });
        return;
      }

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }


      const filePath = file.path;
      
      const updatedUser = await profileService.changeImage(userId, filePath);

      if (updatedUser) {
        res.status(200).json({
          success: true,
          message: "Image uploaded successfully!",
          data: {
            imageUrl: filePath,  
            user: updatedUser
          }
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to update user image" 
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Error uploading image", error });
    }
  }


  async removeImage(req:Request , res:Response):Promise<void>{
      try {
        const userId = req.query.userId as string; 
        
        if (!userId) {
          res.status(400).json({ message: "User ID is required" });
          return;
        }
        
        const updatedUser = await profileService.removeImage(userId);
        res.status(200).json({
          message: 'Image removed successfully',
          user: updatedUser,
        });
        
      } catch (error) {
        
      } 
  }


  async changeName(req:Request , res:Response):Promise<void>{
    try {
      const {userId , username} = req.body

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      if (!username) {
        res.status(400).json({ message: "Username is required" });
        return;
      }
      
      const updatedUser = await profileService.changeName(userId,username)

      if (updatedUser) {
        res.status(200).json({
          message: 'Name changed successfully',
          user: updatedUser,
        });
      } else {
        res.status(404).json({ message: 'User not found or name update failed' });
      }
  
      
    } catch (error) {
      console.error('Error changing name:', error);
      res.status(500).json({ message: 'An error occurred while changing name' });
    }
  }


  async addNumber(req:Request , res:Response):Promise<void>{
    try {
        const {userId , phone} = req.body

        if (!userId) {
          res.status(400).json({ message: "User ID is required" });
          return;
        }
        if (!phone) {
          res.status(400).json({ message: "Phone Number is required" });
          return;
        }

        const updatedUser = await profileService.addPhone(userId,phone)
        
        if (updatedUser) {
          res.status(200).json({
            message: 'Phone number updated successfully',
            user: updatedUser,
          });
        } else {
          res.status(404).json({ message: 'User not found or phone update failed' });
        }
        
        
    } catch (error) {
      console.error('Error updating phone:', error);
      res.status(500).json({ message: 'An error occurred while updating phone' });
    }
  }


  async addAddress(req:Request , res:Response):Promise<void>{
    try {
      
      const formData = req.body

      if (!formData) {
        res.status(400).json({ message: "Address is required" });
        return;
      }

      const updatedUser = await profileService.addAddress(formData)

      if (updatedUser) {
        res.status(200).json({
          message: 'Address Added successfully',
          user: updatedUser,
        });
      } else {
        res.status(404).json({ message: 'User not found or address adding failed' });
      }
      
      
    } catch (error) {
      
    }
  }

  async deleteAddress(req:Request,res:Response):Promise<void>{
    try {

      const {userId , index} = req.body
      
            
      
    } catch (error) {
      
    }
  }
} 

export default ProfileController;
