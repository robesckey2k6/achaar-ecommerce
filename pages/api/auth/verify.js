import bcrypt_compare from "../../../lib/crypt";
import prisma from "../../../lib/db";
import {gen_admin_token} from "../../../lib/token";


export default async function verify(req, res){
	console.log("TEST");
    if (req.method == "POST"){
        var password = req.body.password;
        if(!password){
            res.status(200).json({
                message: "Password missing",
            });
            return;
        }


        try{
            console.log("Debug 1");
            var admin = await prisma.Admin.findUnique({
                where: {
                    id: 1
                }
            });
            console.log("Debug 2");
	 	console.log(admin.passwordHash);

            var pass_cmp = await bcrypt_compare(password, admin.passwordHash);

            console.log("Debug 3");
	    console.log(pass_cmp);
            if (!pass_cmp){
                res.status(200).json({
                    message: "Invalid password",
                    success: false
                });
                return;
            }

            console.log("Debug 4");

            let token = gen_admin_token();
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader("Set-Cookie", `auth=${token}`);
            res.status(200).json({
                token: token,
                message: "Login sucessfull.",
                success: true
            });
            console.log("Debug 5");
        }
        catch(error){

            res.status(200).json({
                sucess:false,
                message:error
            });
        }
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
    
    return;
}
