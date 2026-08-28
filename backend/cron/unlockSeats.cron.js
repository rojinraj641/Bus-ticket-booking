import cron from "node-cron";
import { Seats } from "../models/seats.models.js";

const startUnlockSeatsCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const now = new Date();
      const result = await Seats.updateMany(
        {
          status: "Locked",
          lockExpiresAt: { $lt: now },
        },
        {
          $set: {
            status: "Available",
            lockedBy: null,
            lockExpiresAt: null
          }
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`Unlocked ${result.modifiedCount} expired seats`);
      }
    } catch (error) {
      console.error("Cron error:", error);
    }
  });

  console.log("Seat unlock cron started...");
};

export default startUnlockSeatsCron;
