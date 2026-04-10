import cloudinary from '../config/cloudinary.js';

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = 'pixoralabz'
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!.secure_url);
        }
      )
      .end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicUrl: string): Promise<void> {
  try {
    // Extract public_id from the URL
    const parts = publicUrl.split('/');
    const folderAndFile = parts.slice(parts.indexOf('pixoralabz')).join('/');
    const publicId = folderAndFile.replace(/\.[^.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
  }
}
