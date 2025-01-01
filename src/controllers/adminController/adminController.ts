import { Request, Response } from "express";
import { AdminService } from "../../services/admin/adminService";
import { HttpStatus } from "../../enums/HttpStatus";

const adminService = new AdminService()

class AdminController {
    getUserList = async (req: Request, res: Response) => {
        try {
            const users = await adminService.getallUsers()
            res.status(HttpStatus.CREATED).json(users)
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error)
        }
    }

    getMechanicList = async (req: Request, res: Response) => {
        try {
            const mechanics = await adminService.getallMechanics()
            res.status(HttpStatus.CREATED).json(mechanics)
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error)
        }
    }

    verifyMechanic = async (req: Request, res: Response) => {
        try {
            const { mechId } = req.body;

            if (!mechId) {
                res.status(400).json({
                    success: false,
                    message: 'Mechanic ID is required',
                });
            }
    
            const response = await adminService.verifyMechanic(mechId);
    
            res.status(200).json({
                success: true,
                message: 'Mechanic verified successfully',
                data: response,
            });
        } catch (error: any) {
            console.error('Error verifying mechanic:', error);
    
            res.status(500).json({
                success: false,
                message: 'An error occurred while verifying the mechanic',
                error: error.message || 'Internal Server Error',
            });
        }
    };
    
}

export default AdminController