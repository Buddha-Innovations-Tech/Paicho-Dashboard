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

const Previews = ({ image, setImage }) => {
  const [imagecut, setImageCut] = useState([]);
  const [imageshow, setImageShow] = useState(image);
  // const [uploading, setUploading] = useState(false);
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
    onDrop: (acceptedFiles) => {
      uploadHeroImageHandler(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" className="dragzoneimg" />
        <ImCross
          className="dragzoneimg-icon"
          onClick={(e) => setFiles(files.filter((i) => i !== file))}
        />
      </div>
      {/* {imagecut &&
        imagecut.map((curElm, index) => {
          return (
          );
        })} */}
    </div>
  ));
  // {
  //   seo &&
  //     seo.map((curElm, index) => {
  //       return (
  //         <li
  //           className="d-flex align-items-center justify-content-between"
  //           key={index}
  //         >
  //           <p>{curElm}</p>
  //           <ImCross
  //             className="crossicon"
  //             onClick={(e) => setSeo(seo.filter((i) => i !== curElm))}
  //           />
  //         </li>
  //       );
  //     });
  // }
  const uploadHeroImageHandler = async (photo) => {
    // console.log(e);
    // e.preventDefault();
    const file = photo[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    // setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads/", formData, config);
      setImage(data.image);

      // console.log(data.image);

      // setUploading(false);
    } catch (error) {
      console.error(error);
      // setUploading(false);
    }
  };

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks
  // files.forEach((file) => uploadHeroImageHandler(e));
  // uploadHeroImageHandler();
  // }, [files]);
  // const style = useMemo(
  //   () => ({
  //     ...baseStyle,
  //     ...(isFocused ? focusedStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {}),
  //   }),
  //   [isFocused, isDragAccept, isDragReject]
  // );
  return (
    <section className="container dragdroppadding">
      <div {...getRootProps({ className: "dropzone" })}>
        <input type="file" {...getInputProps()} />
        <div className="drapanddrop-content">
          <SiGumtree className="treeicon" />
          <p>Drag and drop images or click to upload media</p>
        </div>
      </div>
      <div className="carouselCard__image d-flex align-items-center">
        <div className="carouselCard__image--img">
          {/* <img
            src={`http://localhost:5000${image}`}
            alt="card"
            name="image"
            className="img-fluid"
            style={{ position: "relative" }}
          /> */}
          <img
            src={`${image}`}
            alt="card"
            name="image"
            className="img-fluid"
            style={{ position: "relative" }}
          />
          {/* {imagecut.map((curElm) => {
            return (
              <div>
                <img
                  src={`http://localhost:5000${image}`}
                  alt="card"
                  name="image"
                  className="img-fluid"
                  style={{ position: "relative" }}
                />
                <ImCross
                  style={{ position: "absolute", fontSize: "12px" }}
                  className="crossicon"
                  onClick={(e) =>
                    setImageCut(imagecut.filter((i) => i !== curElm))
                  }
                />
              </div>
            );
          })} */}
        </div>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default Previews;
