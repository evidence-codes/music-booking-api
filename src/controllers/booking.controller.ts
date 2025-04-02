import { Response } from "express";
import { Request } from "../types/express";
import { successResponse } from "../utils/response.handler";
import { catchAsync } from "../utils/helpers";
import { Booking } from "../models/booking.model";
import { Event } from "../models/event.model";
import { BadRequestError } from "../utils/error";
import BookingService from "../services/Booking.service";

class BookingController {
  constructor(private readonly bookingService = BookingService) {}

  createBooking = catchAsync(async (req: Request, res: Response) => {
    const { eventId } = req.body;
    const userId = req?.userId;
    const bookingData: Partial<Booking> = {
      eventId: Number(eventId),
      userId: Number(userId),
    };

    // const event = Event.findByPk(eventId);
    // if (!event) throw new BadRequestError("Event not found");

    const booking = await this.bookingService.createBooking(
      bookingData as Booking
    );
    successResponse({
      res,
      message: "Booking created successfully",
      data: booking,
    });
  });

  updateBooking = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookingData: Partial<Booking> = req.body;

    if (!id) throw new BadRequestError("Booking id is required");

    const booking = await this.bookingService.getBookingById(
      Number(id),
      Number(req?.userId)
    );
    // const event = await Event.findByPk(booking.eventId);
    const updatedBooking = await this.bookingService.updateBooking(
      id,
      bookingData as Booking
    );
    successResponse({
      res,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  });

  getBookings = catchAsync(async (req: Request, res: Response) => {
    const userId = req?.userId;
    const bookings = await this.bookingService.getBookings(Number(userId));
    successResponse({
      res,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  });

  getBookingById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req?.userId;
    const booking = await this.bookingService.getBookingById(
      Number(id),
      Number(userId)
    );
    successResponse({
      res,
      message: "Booking fetched successfully",
      data: booking,
    });
  });

  deleteBooking = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req?.userId;
    await this.bookingService.deleteBooking(Number(id), Number(userId));
    successResponse({ res, message: "Booking deleted successfully" });
  });
}

export default new BookingController();
