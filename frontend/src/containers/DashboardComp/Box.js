import React, { useState, useEffect } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import Card1 from "./Card1";
import MainProfileImage from "../../assets/mainprofileimage.png";
import CircleImage from "../../assets/circleImage.svg";
import { getToken } from "../../services/LocalStorageService";

function Box({ className = "", name, nic, email }) {
  const [profileImage, setProfileImage] = useState(MainProfileImage);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { access_token } = getToken(); // Get the access token

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/account/profile/image",
          {
            responseType: "blob", // Expecting the response to be a blob (binary data)
            headers: {
              Authorization: `Bearer ${access_token}`, // Add the access token to the headers
            },
          }
        );

        if (response.status === 200) {
          const imageUrl = URL.createObjectURL(response.data);
          setProfileImage(imageUrl);
        } else {
          // Use the default image if status code is not 200
          setProfileImage(MainProfileImage);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        // Fallback to default image in case of an error
        setProfileImage(MainProfileImage);
      }
    };

    fetchProfileImage();
  }, [access_token]);

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        setUploading(true);
        try {
            // Compress the file
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
            });

            // Convert compressed file to base64
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = async () => {
                const base64data = reader.result;

                // Create the JSON payload with the base64 string
                const payload = {
                    user_image: base64data, // Assign the base64 string to user_image
                };

                // Make the POST request to upload the image
                await axios.post(
                    "http://localhost:8000/api/account/profile/image",
                    payload, // Send the payload directly
                    {
                        headers: {
                            "Content-Type": "application/json", // Set the content type to application/json
                            Authorization: `Bearer ${access_token}`,
                        },
                        onUploadProgress: (event) => {
                            const percentCompleted = Math.round(
                                (event.loaded * 100) / event.total
                            );
                            setProgress(percentCompleted);
                        },
                    }
                );

                // Update the profile image preview
                setProfileImage(base64data);
            };
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    }
};
  
  
  
  
  return (
    <header className={`self-stretch flex flex-row items-center sm:flex-col md:flex-col justify-center gap-[13px] max-w-full text-left text-xs text-color-gray-80 font-inter ${className}`}>
      <div className="flex flex-row items-center justify-center py-0 px-5 relative">
        <img
          className="h-[100px] w-[100px] relative cursor-pointer"
          alt=""
          src={CircleImage}
          onClick={handleImageClick}
        />
        <div className="h-[72px] w-[72px] absolute !m-[0] top-[14px] bottom-[14px] left-[34px] max-h-full z-[1] flex items-center justify-center rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            loading="lazy"
            alt="Profile Image"
            src={profileImage}
            onClick={handleImageClick}
          />
        </div>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      {uploading && (
        <div className="w-full mt-2">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-xs font-medium text-blue-600">Uploading...</div>
              <div className="text-xs font-medium text-blue-600">{progress}%</div>
            </div>
            <div className="relative pt-1">
              <div className="flex">
                <div
                  className="bg-blue-500 text-xs leading-none py-1 text-center text-white whitespace-nowrap"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Card1 iconPath="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" label={name} />
      <Card1 iconPath="M256 0h64c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H256c-17.7 0-32-14.3-32-32V32c0-17.7 14.3-32 32-32zM64 64H192v48c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V64H512c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64zM176 437.3c0 5.9 4.8 10.7 10.7 10.7H389.3c5.9 0 10.7-4.8 10.7-10.7c0-29.5-23.9-53.3-53.3-53.3H229.3c-29.5 0-53.3 23.9-53.3 53.3zM288 352a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" label={nic} />
      <Card1 iconPath="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" label={email} />
    </header>
  );
}

export default Box;
