import React, { useState } from "react";
import { X, UploadCloud, Image as ImageIcon } from "lucide-react"; // Icons ke liye

const MultipleImageUpload = () => {
  // Images (Files) aur previews (URLs) ko store karne ke liye states
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // File select hone par handle karne wala function
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // FileList ko Array mein convert kiya

    if (files.length === 0) return;

    // --- Validations (Optional lekin zaroori hain) ---
    // 1. Max Images Limit (e.g., 5 images)
    if (selectedFiles.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }

    // New files ko state mein add karein
    setSelectedFiles((prev) => [...prev, ...files]);

    // --- Previews Generate Karna ---
    const filePreviews = files.map((file) => {
      // 2. File Type Validation (Only images)
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file.`);
        return null;
      }

      // 3. File Size Validation (e.g., max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} is too large (max 2MB).`);
        return null;
      }

      // FileReader API use karke temporary URL banana preview ke liye
      const reader = new FileReader();
      reader.readAsDataURL(file); // File ko Base64 string mein convert karta hai

      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result); // Base64 URL return karega
        };
      });
    });

    // Sare previews generate hone ke baad state update karein
    Promise.all(filePreviews.filter((p) => p !== null)).then((results) => {
      setPreviews((prev) => [...prev, ...results]);
    });
  };

  // Kisi ek image ko remove karne ka function
  const removeImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submit karne par data handle karna
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    // --- Backend par bhejne ke liye FormData ---
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`image_${index}`, file); // Har file ko FormData mein add kiya
    });

    // console.log("FormData ready to be sent:", formData);
    alert(`${selectedFiles.length} images ready for upload! Check console.`);

    // Yahan aap apna API call karenge (e.g., axios.post('/api/upload', formData))
  };

  return (
    <div className="p-6 md:p-10 bg-white border border-gray-100 rounded-xl max-w-4xl mx-auto mt-10 shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="text-[14px] font-black uppercase tracking-[0.3em] mb-2">
          Upload Product Images
        </h2>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          Max 5 images, each under 2MB. (PNG, JPG, WEBP)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- DND / Click-to-Upload Area --- */}
        <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-black hover:bg-zinc-50 transition-all group cursor-pointer">
          <UploadCloud className="w-10 h-10 text-gray-300 group-hover:text-black transition-colors" />
          <p className="text-[11px] font-bold text-gray-400 group-hover:text-black uppercase tracking-widest text-center leading-relaxed">
            Drag & Drop images or{" "}
            <span className="text-black border-b border-black">
              click to browse
            </span>
          </p>

          {/* Chupa hua file input tag */}
          <input
            type="file"
            multiple // YE SABSE ZAROORI HAI multiple images ke liye
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* --- Images Preview Grid --- */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-6 border-t border-gray-100">
            {previews.map((previewUrl, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group shadow-inner"
              >
                <img
                  src={previewUrl}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Remove Button (Sirf hover par dikhega) */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-black hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Image Size info (Demo ke liye) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-[9px] text-white font-medium uppercase tracking-widest text-center">
                    Image {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- Submit Button --- */}
        <div className="text-center pt-8 border-t border-gray-100">
          <button
            type="submit"
            className="bg-black text-white px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 active:scale-95 transition-all w-full md:w-auto"
          >
            Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}{" "}
            Images
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultipleImageUpload;
