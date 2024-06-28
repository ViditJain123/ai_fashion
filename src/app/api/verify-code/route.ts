import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";

export async function POST(request: Request){
    await dbConnect();
    try {
        const {email, code}= await request.json();
        const decodedEmail = decodeURIComponent(email);
        const user = await UserModel.findOne({email: decodedEmail})

        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            })
        }

        const isCodeValid = user.verificationToken == code;
        const isCodeNotExpired = new Date(user.verifyTokenExpire) > new Date();

        if(isCodeValid && isCodeNotExpired){
            user.verified = true;
            await user.save();
            return Response.json({
                success: true,
                message: "User verified"
            })
        } else {
            return Response.json({
                success: false,
                message: "Invalid code, retry"
            })
        }
    } catch(error){
        console.error(error);
        return Response.json({
            success: false,
            message: "Error verifying user"
        })
    }
}