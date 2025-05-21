"use client";
import { useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return alert("Please select a video file.");

        setUploading(true);
        const formData = new FormData();
        formData.append("video", file); // ✅ correct field name

        try {
            const res = await fetch("http://localhost:5000/api/upload/video", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok && data.url) {
                setVideoUrl(data.url);
            } else {
                alert(data.message || "Upload failed!");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-2xl font-bold mb-4">📤 Upload Video</h1>

            <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4 bg-white text-black p-2 rounded"
            />

            <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>

            {videoUrl && (
                <div className="mt-6">
                    <p className="mb-2">✅ Video Uploaded:</p>
                    <video
                        src={videoUrl}
                        controls
                        className="w-full max-w-xl rounded shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}
