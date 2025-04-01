import { Sequelize } from "sequelize-typescript";
import { Artist } from "../models/artist.model";
import { Event } from "../models/event.model";
import dotenv from "dotenv";
import { Booking } from "../models/booking.model";
import { User } from "../models/user.model";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Supabase SSL
    },
  },
  models: [Artist, Event, Booking, User],
  logging: false,
});

export default sequelize;
