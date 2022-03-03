import fs from "fs";

class FilesService {
    exists = (name: string) => {
        try {
            return fs.existsSync(`/uploads/${name}`);
        } catch (e) {
            return false;
        }
    }
    deleteFile = (name: string) => {
        try {
            if (this.exists(name)) {
                fs.unlinkSync(`/uploads/${name}`);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
}

export default new FilesService();
