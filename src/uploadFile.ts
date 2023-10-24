import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';

export const uploadFile = async (
    file: Express.Multer.File,
    name: string
): Promise<string> => {
    let newFileName = null;
    try {
        // Generate a new file name
        const originalName = file.originalname;
        const filename = originalName.substring(0, originalName.lastIndexOf('.'));
        const extension = originalName.substring(
            originalName.lastIndexOf('.'),
            originalName.length,
        );
        newFileName = filename + '-' + makeid(8) + extension;
        // Specify the directory path for file uploads
        const directoryPath = `./public/uploads/${name}`;
        const filePath = join(directoryPath, newFileName);

        // Create the directory if it doesn't exist
        if (!existsSync(directoryPath)) {
            mkdirSync(directoryPath, { recursive: true });
        }

        // Write the file to disk
        const writeStream = createWriteStream(filePath);
        writeStream.write(file.buffer);
        writeStream.end();

        return `/uploads/${name}/` + newFileName;
    } catch (error) {
        throw new Error('Failed to upload file');
    }
};

const makeid = (length): string => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};