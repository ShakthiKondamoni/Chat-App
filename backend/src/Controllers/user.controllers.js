import User from "../Models/User.js";
import FriendRequest from "../Models/FriendRequest.js";

export const GetRecommendedUsers = async (req, res) => {
  try {
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      _id: {
        $ne: currentUser._id,
        $nin: currentUser.Friends || [],
      },
    }).select("-Password");

    res.status(200).json({ recommendedUsers });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recommended users",
      error: error.message,
    });
  }
};


export const GetMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "Friends",
      "Username ProfilePicture NativeLanguage LearningLanguage Bio Country"
    );

    res.status(200).json({ myFriends: user.Friends });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch my friends",
      error: error.message,
    });
  }
};

export const SendFriendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    if (myId.toString() === recipientId) {
      return res.status(400).json({ message: "You can't friend yourself" });
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    if (recipient.Friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already exists" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json({
      message: "Friend request sent successfully",
      friendRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error: error.message });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to accept this request",
      });
    }

    friendRequest.status = "Accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { Friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { Friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({
      message: "Internal error in accept friend request",
      error: error.message,
    });
  }
};

export const GetFriendRequest = async (req, res) => {
  try {
    const incomingReq = await FriendRequest.find({
      recipient: req.user._id,
      status: "Pending",
    }).populate(
      "sender",
      "Username ProfilePicture NativeLanguage LearningLanguage Bio Country"
    );

    const acceptedReq = await FriendRequest.find({
      sender: req.user._id,
      status: "Accepted",
    }).populate(
      "recipient",
      "Username ProfilePicture NativeLanguage LearningLanguage Bio Country"
    );

    res.status(200).json({
      incomingReq,
      acceptedReq,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error: error.message });
  }
};

export const OutGoingRequest = async (req, res) => {
  try {
    const outgoingReq = await FriendRequest.find({
      sender: req.user._id,
      status: "Pending",
    }).populate(
      "recipient",
      "Username ProfilePicture NativeLanguage LearningLanguage Bio Country"
    );

    res.status(200).json({ outgoingReq });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch outgoing requests",
      error: error.message,
    });
  }
};