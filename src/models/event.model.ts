import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Artist } from "./artist.model";
import { Booking } from "./booking.model";

@Table({ tableName: "events" })
export class Event extends Model<Event> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

  @ForeignKey(() => Artist)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  artistId!: number;

  @BelongsTo(() => Artist)
  artist!: Artist;

  @HasMany(() => Booking)
  bookings!: Booking[];

  // Virtual field to get the booking count dynamically
  get bookingCount(): number {
    return this.bookings ? this.bookings.length : 0;
  }
}
