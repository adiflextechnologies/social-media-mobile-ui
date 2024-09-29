import { OverlayStyle } from "../../../../types/editor";

const template = (baseUri: string, templateUri: string) => {
  const command = `-y -i ${baseUri} -i ${templateUri} -filter_complex "[1:v][0:v]scale2ref[img][vid];[vid][img]overlay=0:0"`;

  // const command = `-y -i ${baseUri} -i ${templateUri} -filter_complex "overlay"`;
  return command;
};

const scale = (baseUri: string, heightRatio: number, widthRatio: number) => {
  const command = `-y -i ${baseUri} -vf "scale=iw:ow*${heightRatio}/${widthRatio}"`;
  return command;
};

const overlayImage = (baseUri: string, imgUri: string, style: OverlayStyle) => {
  const {
    position: { x, y },
    style: { height, width },
  } = style;
  const command = `-y -i ${baseUri} -i ${imgUri} -filter_complex "[1]scale=w=${width}:h=${height}[ovr];[0][ovr]overlay=x=${x}:y=${y}"`;
  return command;
};

const overlayText = (baseUri: string, text: string, style: OverlayStyle) => {
  const {
    position: { x, y },
    style: { height, width, fontColor = "#000" },
  } = style;

  const command = `-y -i ${baseUri} -vf "drawtext=text='${text}':fontcolor=${fontColor}:fontsize=${height}:x=${x}:y=${y}" `;
  return command;
};

const commands = {
  addTemplate: template,
  changeScale: scale,
  addOverlayImage: overlayImage,
  addOverlayText: overlayText,
};

export default commands;
