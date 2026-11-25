const sharp = require("sharp");

sharp("public/og-image.png")
  .resize(1200, 630, { fit: "cover" })
  .png()
  .toBuffer()
  .then((buffer) => {
    const fs = require("fs");
    fs.writeFileSync("public/og-image.png", buffer);
    return sharp("public/og-image.png").metadata();
  })
  .then((m) => {
    console.log("og-image.png:", m.width + "x" + m.height, m.format);
  })
  .catch((e) => {
    console.error("ERROR", e);
    process.exit(1);
  });