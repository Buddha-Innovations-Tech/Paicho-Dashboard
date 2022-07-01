import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SiGumtree } from "react-icons/si";
import axios from "axios";
import { ImCross } from "react-icons/im";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};
const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const Previews = ({ imgarray, setImgArray }) => {
  const [imagePath, setImagePath] = useState([]);
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isFocused,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      uploadHeroImageHandler(acceptedFiles);
      if (acceptedFiles) {
        const fileArray = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFiles(...files, fileArray);
      }
    },
  });

  const uploadHeroImageHandler = async (photo) => {
    const file = photo[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads/", formData, config);
      imagePath.push(data.image);
      setImgArray([data.image, ...imgarray]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container dragdroppadding">
      <div {...getRootProps({ className: "dropzone" })}>
        <input type="file" {...getInputProps()} />
        <div className="drapanddrop-content">
          <SiGumtree className="treeicon" />
          <p>Drag and drop images or click to upload media</p>
        </div>
      </div>

      {/* <div className="d-flex  align-items-center mt-4">
        {imagePath.length > 0 &&
          imagePath.map((curElm) => {
            return (
              <div>
                <img
                  src={`${curElm}`}
                  alt="card"
                  name="image"
                  className="img-fluid"
                  style={{
                    position: "relative",
                    width: "60px",
                    height: "60px",
                  }}
                />
                <ImCross
                  style={{ position: "absolute", fontSize: "12px" }}
                  className="crossicon"
                  onClick={(e) =>
                    setImagePath(imagePath.filter((i) => i !== curElm))
                  }
                />
              </div>
            );
          })}
      </div> */}
    </section>
  );
};

export default Previews;
