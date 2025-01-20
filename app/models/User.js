import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true },

});
// Crea el modelo basado en el esquema
const User = mongoose.models.Usuarios || mongoose.model('Usuarios', UserSchema);

export default User;