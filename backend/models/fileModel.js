import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    uniqueCode: { type: String, required: true, unique: true }
});

const File = mongoose.model('File', fileSchema);
export default File;
