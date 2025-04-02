import { Op, col, fn, literal } from "sequelize";
import { Event } from "../models/event.model";
import { Booking } from "../models/booking.model";
import { BadRequestError } from "../utils/error";

interface EventUpdateData {
  title?: string;
  date?: Date;
  location?: string;
}

class EventService {
  async createEvent(eventData: Event): Promise<Event> {
    return await Event.create(eventData);
  }

  async getEvents(whereClause: any) {
    return await Event.findAll({
      where: whereClause,
      attributes: {
        include: [
          [
            fn("COUNT", col("bookings.id")), // Count number of bookings
            "bookingCount",
          ],
        ],
      },
      include: [
        {
          model: Booking,
          attributes: [], // We only need the count
        },
      ],
      group: ["Event.id"], // Group by event ID to ensure count works
    });
  }

  async getEventById(id: number): Promise<Event> {
    const event = await Event.findOne({
      where: { id },
      attributes: {
        include: [
          [
            fn("COUNT", col("bookings.id")), // Count number of bookings
            "bookingCount",
          ],
        ],
      },
      include: [
        {
          model: Booking,
          attributes: [], // We only need the count
        },
      ],
      group: ["Event.id"], // Group by event ID to ensure count works
    });

    if (!event) {
      throw new BadRequestError("Event not found");
    }

    return event;
  }

  async updateEvent(
    eventId: string,
    data: Partial<EventUpdateData>
  ): Promise<Event> {
    const event = await Event.findByPk(eventId);
    if (!event) throw new BadRequestError("Event not found");

    await event.update(data);
    return event;
  }

  async deleteEvent(eventId: string): Promise<void> {
    const event = await Event.findByPk(eventId);
    if (!event) throw new BadRequestError("Event not found");

    await event.destroy();
  }
}

export default new EventService();
