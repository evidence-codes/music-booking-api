import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Event } from "./event.model";
import { User } from "./user.model"; // Assuming you have a User model

@Table({ tableName: "bookings" })
export class Booking extends Model<Booking> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  eventId!: number;

  @BelongsTo(() => Event)
  event!: Event;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;
}
