import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 6,
    },
    Bio: {
      type: String,
      default: "",
    },
    ProfilePicture: {
      type: String,
      default: "",
    },
    Country: {
      type: String,
      default: "",
    },
    NativeLanguage: {
      type: String,
      default: "",
    },
    LearningLanguage: {
      type: String,
      default: "",
    },
    Friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isOnboarded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("Password")) return;

  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

UserSchema.methods.MatchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.Password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;