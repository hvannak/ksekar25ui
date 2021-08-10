
export function readBufferImg(imagedata) {
  var bytes = new Uint8Array(imagedata.data);
  var binary = bytes.reduce(
    (data, b) => (data += String.fromCharCode(b)),
    ""
  );
  return binary;
}
