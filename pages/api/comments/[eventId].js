import fs from "fs";
import path from "path";

function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { name, email, text } = req.body;

    //Server-side validation
    if (
      !name ||
      !name.trim() === "" ||
      !email ||
      !email.includes("@") ||
      !text ||
      !text.trim() === ""
    ) {
      res.status(422).json({message: 'Invalid Input(s).'});
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      ...req.body,
    };
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));

    return res.status(201).json({ message: "Comment Posted Succesfully", comment: newComment });
  }


  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const comments = JSON.parse(fileData);
    const selectedComments = comments.filter((comment) => comment.eventId === eventId);

    return res.status(200).json({  comments: selectedComments });
  }
}
export default handler;
