import File from '../models/fileModel.js'; 

export const storeFileInfo = async (req, res) => {
    try {
        const { fileUrl, uniqueCode } = req.body;

        if (!fileUrl || !uniqueCode) {
            return res.status(400).json({ message: "Missing fileUrl or uniqueCode" });
        }

        const newFile = new File({ fileUrl, uniqueCode });
        await newFile.save();

        res.status(201).json({ message: "File stored successfully" });
    } catch (error) {
        console.error("Error storing file:", error);
        res.status(500).json({ message: "Error storing file", error: error.message });
    }
};
