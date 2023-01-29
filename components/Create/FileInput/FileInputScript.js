import JSZip from "jszip";

export const extractZip = async (file) => {
  let fileName = file.name;
  fileName = fileName.replace(/\.+\s*\./, ".").split(".");
  fileName = fileName.slice(0, fileName.length - 1)[0];
  const zip = new JSZip();
  const data = await zip.loadAsync(file);
  let files;
  if (data.files["metadata.json"]) {
    files = data.files["metadata.json"];
  } else if (data.files[`${fileName}/metadata.json`]) {
    files = data.files[`${fileName}/metadata.json`];
  } else {
    return alert("Unsupported file format1");
  }
  const metadataString = await files.async("string");
  const metadata = JSON.parse(metadataString);
  console.log("loading...");
  return await Promise.all(
    metadata.map(async ({ image, name, description, attributes }, idx) => {
      let _name = image.replace(/\.+\s*\./, ".").split(".");
      let type = _name.pop();
      let imgFile;
      if (data.files[image]) {
        imgFile = data.files[image];
      } else if (data.files[`${fileName}/${image}`]) {
        imgFile = data.files[`${fileName}/${image}`];
      } else {
        return alert("Unsupported file format2");
      }
      const uint8array = await imgFile.async("uint8array");
      const blob = new File([uint8array], `${idx + Date.now()}.${type}`, {
        type: `image/${type}`,
      });
      return {
        image: blob,
        name,
        description,
        attributes,
      };
    })
  );
};

// read a json file

// const onReaderLoad = (event) => {
//   let { data } = JSON.parse(event.target.result);
//   setMetadata((m) => ({ ...m, [name]: data }));
// };

// let reader = new FileReader();
// reader.onload = onReaderLoad;
// reader.readAsText(event.target.files[0]);
