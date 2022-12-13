import { Request, Response } from 'express';
import Chat from '../models/chatModel';

export async function getChatHistory(req: Request, res: Response) {
  const { author, receiver } = req.query;
  try {
    const chatHistory = await Chat.find({
      members: { $all: [author, receiver] },
    }).sort({ timestamp: -1 });

    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(400).json({ message: 'Not available data' });
  }
}

export async function createNewMessage(req: Request, res: Response) {
  try {
    await Chat.create(req.body);
    res.status(200).json({ msg: 'Successfully created new message' });
  } catch (error) {
    res.status(400).json({ msg: 'Unable to create new message' });
  }
}
