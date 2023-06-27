const jwt=require('jsonwebtoken')

var JWT_SECRET = "my name is amaan";

const fetchDataMiddleWare=async(req,res,next)=>{   //next means after this middleware execution further function will proceed

     // Get the user from the jwt token and add id to req object ,further which get verified with details entered

     const token = req.header('auth-token');
     if (!token) {
         res.status(401).send({ error: "Please authenticate using a valid token" })
     }
     try {
        
         const data = jwt.verify(token, JWT_SECRET);
        //  console.log(data)
         
        req.user=data.foundedUser  //jo login se bhejoge wahi keyword use krna pdega
        
         next();
     } catch (error) {
         res.status(401).send({ error: "Please authenticate using a valid token" })
     }

}

module.exports=fetchDataMiddleWare;

//basically this middleware decodes the token and make data drom database available