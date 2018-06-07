
import axios from "axios";

export function cloudinaryUpload(uploadImage, tags) {
    const formData = new FormData();
    formData.append("file", uploadImage);
    formData.append("tags", tags);
    formData.append("upload_preset", "h1c679t8"); 
    formData.append("api_key", "589119119773594"); 
    formData.append("timestamp", (Date.now() / 1000) | 0);
    return axios.post(
        "https://api.cloudinary.com/v1_1/cgrsmith/image/upload", 
        formData, {
        headers: { "common" : null, "X-Requested-With": "XMLHttpRequest" }
        });
}
