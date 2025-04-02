import { Event } from "../models/event.model";
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

  async getEvents(whereClause: any): Promise<Event[]> {
    return await Event.findAll({ where: whereClause });
  }

  async getEventById(id: number): Promise<Event> {
    const event = await Event.findByPk(id);
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
