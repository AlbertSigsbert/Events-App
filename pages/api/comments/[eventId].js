import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const newComment = {
      id: new Date().toISOString(),
      ...req.body
    };
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData)
    data.push(newComment);
    fs.writeFileSync(filePath,JSON.stringify(data));

    return res.status(201).json({ message: "Comment Posted Succesfully" });
  }



}
export default handler;
