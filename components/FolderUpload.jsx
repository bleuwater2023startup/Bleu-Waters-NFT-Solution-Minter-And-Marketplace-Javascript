import { useState } from "react";
import axios from "axios";
import { data } from "./FolderUploadData";
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5OGRmMGQzYi04ZWYzLTQ3YWMtYTNlNi01NWViZmI1NTJiN2EiLCJlbWFpbCI6ImVtbWFudWVsX3RlY2gtbGVhZEB2aXNpb252b2ljZWluYy5vcmciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYjAzNmZmOTU4NjBmNTQ5OWY1NjIiLCJzY29wZWRLZXlTZWNyZXQiOiJlMTkwZjU4ZDM0ZDEwYThjNWU0NjUwNmVhNjI2NjI4MDJhN2E5NDQyOWM1MTBhZGUyNzdlMTlmMzk1MDAxMTBlIiwiaWF0IjoxNjY4MzM2MzgxfQ.owJ3D5Cz91dZLTDU0KuMKu9jL84kn-2BHrm4rMmBQOw`;

const FolderUpload = () => {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    // data.forEach((obj, idx) => {
    //   formData.append(
    //     "file",
    //     new File([JSON.stringify(obj)], `image_${idx}.json`)
    //   );
    // });

    formData.append(
      "file",
      new File([JSON.stringify(data[0])], `image_2.json`)
    );

    // formData.append(
    //   "json",
    //   new File([JSON.stringify(data[1])], `image_1.json`)
    // );

    // Array.from(selectedFile).forEach((file) => {
    //   formData.append("file", file);
    // });

    console.log([...formData]);
    // return;

    const metadata = JSON.stringify({
      name: "json 1 upload",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      console.log("running...");
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label">choose Folder</label>
      <input
        directory=""
        webkitdirectory=""
        type="file"
        onChange={changeHandler}
      />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
};

export default FolderUpload;
