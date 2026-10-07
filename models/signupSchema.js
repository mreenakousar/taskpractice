import mongoose from "mongoose";
const signupSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
        role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});
// export default mongoose.model("Signup", signupSchema);
const Signup = mongoose.models.Signup || mongoose.model("Signup", signupSchema);

export default Signup;