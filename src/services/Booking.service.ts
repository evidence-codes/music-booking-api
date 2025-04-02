import { where } from "sequelize";
import { Booking } from "../models/booking.model";
import { BadRequestError } from "../utils/error";

export interface BookingData {
  status: string;
}

class BookingService {
  async createBooking(bookingData: Booking): Promise<Booking> {
    return await Booking.create(bookingData);
  }

  async updateBooking(bookingId: string, data: BookingData): Promise<Booking> {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) throw new BadRequestError("Booking not found");
    await booking.update(data);
    return booking;
  }

  async getBookings(userId: number): Promise<Booking[]> {
    return await Booking.findAll({
      where: { userId },
    });
  }

  async getBookingById(bookingId: number, userId: number): Promise<Booking> {
    const booking = await Booking.findOne({
      where: { id: bookingId, userId },
    });

    if (!booking)
      throw new BadRequestError("Booking not found or does not belong to you");

    return booking;
  }

  async deleteBooking(bookingId: number, userId: number): Promise<void> {
    const booking = await Booking.findOne({
      where: { id: bookingId, userId },
    });

    if (!booking)
      throw new BadRequestError("Booking not found or does not belong to you");

    await booking.destroy();
  }
}

export default new BookingService();
