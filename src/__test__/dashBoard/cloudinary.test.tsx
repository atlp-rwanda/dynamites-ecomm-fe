import axios from 'axios';
import { vi } from 'vitest';
import { uploadSingleImage, uploadGalleryImages } from '@/utils/cloudinary';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Cloudinary Functions', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('uploadSingleImage', () => {
    it('should return the image URL when upload is successful', async () => {
      const file = new File(['dummy content'], 'example.png', {
        type: 'image/png',
      });
      const mockUrl = 'https://example.com/image.jpg';

      // Mock axios.post to resolve with a mock URL
      mockedAxios.post.mockResolvedValueOnce({ data: { secure_url: mockUrl } });

      const url = await uploadSingleImage(file);

      expect(url).toBe(mockUrl);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.cloudinary.com/v1_1/dtl8gpxzt/upload',
        expect.any(FormData)
      );
    });

    it('should throw an error when upload fails', async () => {
      const file = new File(['dummy content'], 'example.png', {
        type: 'image/png',
      });
      const mockError = new Error('Upload failed');

      // Mock axios.post to reject with an error
      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(uploadSingleImage(file)).rejects.toThrow(mockError);
    });
  });

  describe('uploadGalleryImages', () => {
    it('should return an array of image URLs when uploads are successful', async () => {
      const files = [
        new File(['dummy content'], 'example1.png', { type: 'image/png' }),
        new File(['dummy content'], 'example2.png', { type: 'image/png' }),
      ];
      const mockUrls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ];

      // Mock axios.post to resolve with mock URLs for each file
      mockedAxios.post
        .mockResolvedValueOnce({ data: { secure_url: mockUrls[0] } })
        .mockResolvedValueOnce({ data: { secure_url: mockUrls[1] } });

      const urls = await uploadGalleryImages(files);

      expect(urls).toEqual(mockUrls);
      expect(mockedAxios.post).toHaveBeenCalledTimes(files.length);
    });

    it('should throw an error when any upload fails', async () => {
      const files = [
        new File(['dummy content'], 'example1.png', { type: 'image/png' }),
        new File(['dummy content'], 'example2.png', { type: 'image/png' }),
      ];
      const mockError = new Error('Upload failed');

      // Mock axios.post to reject with an error for the first file
      mockedAxios.post.mockRejectedValueOnce(mockError).mockResolvedValueOnce({
        data: { secure_url: 'https://example.com/image2.jpg' },
      });

      await expect(uploadGalleryImages(files)).rejects.toThrow(mockError);
    });
  });
});
