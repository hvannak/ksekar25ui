
export function readBufferImg(imagedata) {
  var bytes = new Uint8Array(imagedata.data);
  var binary = bytes.reduce(
    (data, b) => (data += String.fromCharCode(b)),
    ""
  );
  return binary;
}

export function localizeProperty(list,property) {
  var data = list.find(x=>x.props == property);
  if(data)
    return data.text;
  else return 'NOT SET'
}