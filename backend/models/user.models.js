import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.phone && !this.phone.startsWith("+")) {
    this.phone = "+91" + this.phone.replace(/^0+/, "");
  }
  next();
});

userSchema.plugin(mongooseAggregatePaginate);
export const User = mongoose.model("User", userSchema);