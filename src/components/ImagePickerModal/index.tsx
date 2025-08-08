import { useEffect, useState, type ChangeEvent } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { fetchCloudImages, type CloudImage } from '../../scripts/uploadApi';

export type Tab = 'library' | 'upload';

export interface ImageItem {
  id: number;
  src: string;
  name: string;
  file?: File;
}

interface Props {
  onClose: () => void;
  onSelect: (image: ImageItem) => void;
}

const ImagePickerModal = ({ onClose, onSelect }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('library');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [libraryImages, setLibraryImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    if (activeTab !== 'library') return;

    const loadImages = async () => {
      try {
        const data: CloudImage[] = await fetchCloudImages('products');
        const mapped = data.map((img, idx) => ({
          id: idx + 1,
          src: img.url,
          name: img.public_id,
        }));
        setLibraryImages(mapped);
      } catch (error) {
        console.error('❌ Lỗi khi load ảnh:', error);
      }
    };

    loadImages();
  }, [activeTab]);

  const handleImageSelect = (image: ImageItem) => setSelectedImage(image);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        const newImage: ImageItem = {
          id: Date.now(),
          src: result,
          name: file.name,
          file,
        };
        setSelectedImage(newImage);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onSelect(selectedImage);
      setSelectedImage(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl mx-4 max-h-[90vh] rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex space-x-1">
            {(['library', 'upload'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab === 'library' ? 'Library' : 'Upload'}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'library' && (
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                {libraryImages.map((image) => (
                  <div key={image.id} className="relative">
                    <div
                      onClick={() => handleImageSelect(image)}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage?.id === image.id
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={image.src} alt={image.name} className="w-full h-32 object-cover" />
                      <div className="p-2 bg-white text-center text-sm font-medium">
                        {image.name}
                      </div>
                    </div>
                    {selectedImage?.id === image.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-gray-400">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Drag your file here</p>
                  <p className="text-gray-500 mb-4">or</p>
                  <label className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 cursor-pointer">
                    <Plus size={20} />
                    Browse
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {selectedImage && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.name}
                      className="w-32 h-32 object-cover rounded mx-auto mb-2"
                    />
                    <p className="text-sm font-medium">{selectedImage.name}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedImage}
            className={`px-4 py-2 rounded-lg ${
              selectedImage
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePickerModal;
