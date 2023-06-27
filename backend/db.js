const mongoose=require('mongoose')

const URI="mongodb://0.0.0.0:27017/inotebook"

main().catch((err) => console.log(err));
async function main() {
    try{
        await mongoose.connect(URI);   //to connect it, if some special characters are present in password then encode it ,like here we have @ ..   @ = %40
        console.log("Database is connected");
    }
    catch(e){
        console.log(e.message)
    }
   
}

module.exports=main