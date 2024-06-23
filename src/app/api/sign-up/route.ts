import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bycrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, phoneNumber, password } = await request.json();

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      verified: true,
    });
    const existingUserVerifiedByPhoneNumber = await UserModel.findOne({
      phoneNumber,
      verified: true,
    });
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserVerifiedByEmail) {
      return Response.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    } else if (existingUserVerifiedByPhoneNumber) {
      return Response.json(
        {
          success: false,
          message: "Phone Number already exists",
        },
        {
          status: 400,
        }
      );
    } else {
        const hashedPassword = await bycrypt.hash(password, 10);
        const verifyTokenExpire = new Date();
        verifyTokenExpire.setHours(verifyTokenExpire.getHours() + 1);
        const newUser = new UserModel({
            email,
            phoneNumber,
            password: hashedPassword,
            verificationToken: verificationToken,
            verifyTokenExpire: verifyTokenExpire,
            verified: false,
            orderHistory: [],
            cart: [],
        })

        await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(email, verificationToken);

    if(!emailResponse.sucess){
        return Response.json(
            {
                success: false,
                message: emailResponse.message,
            },
            {
                status: 500,
            }
        );
    }
    return Response.json({
        success: true,
        message: "User Registered Successfully. Please Verify Your Email",
    }, {status: 201})

  } catch (error) {
    console.error("Error Registering User: ", error);
    return Response.json(
      {
        success: false,
        message: "Error Registering User",
      },
      {
        status: 500,
      }
    );
  }
}
