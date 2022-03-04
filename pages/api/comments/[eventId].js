import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../components/helpers/util-db";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to the Database." });
    return;
  }

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
      res.status(422).json({ message: "Invalid Input(s)." });
      client.close();
      return;
    }

    const newComment = { ...req.body, eventId };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Comment Posted Succesfully", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed." });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 },{ eventId: eventId });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Fetching comments failed." });
    }
  }

  client.close();
}
export default handler;
