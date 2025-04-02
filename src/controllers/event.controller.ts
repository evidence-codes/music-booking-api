import { Request, Response } from "express";
import { Event } from "../models/event.model";
import { errorResponse, successResponse } from "../utils/response.handler";
import { catchAsync } from "../utils/helpers";
import EventService from "../services/Event.service";
import { BadRequestError, NotFoundError } from "../utils/error";
import { ArtistRequest } from "./artist.controller";
import { Op } from "sequelize";

class EventController {
  constructor(private readonly eventService = EventService) {}

  createEvent = catchAsync(async (req: ArtistRequest, res: Response) => {
    const { title, date, location } = req.body;
    const artistId = req?.artistId;

    const eventData: Partial<Event> = {
      title,
      date,
      location,
      artistId: Number(artistId),
    };
    const event = await this.eventService.createEvent(eventData as Event);
    successResponse({
      res,
      message: "Event created successfully",
      data: event,
    });
  });

  getEvents = catchAsync(async (req: Request, res: Response) => {
    const { date, location } = req.query;

    const whereClause: any = {};
    if (date) whereClause.date = { [Op.gte]: new Date(date as string) };
    if (location) whereClause.location = location;

    const events = await this.eventService.getEvents(whereClause);

    successResponse({
      res,
      message: "Events fetched successfully",
      data: events,
    });
  });

  getEventById = catchAsync(async (req: ArtistRequest, res: Response) => {
    const { id } = req.params;
    const event = await this.eventService.getEventById(Number(id));
    successResponse({
      res,
      message: "Event fetched successfully",
      data: event,
    });
  });

  updateEvent = catchAsync(async (req: ArtistRequest, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError("Event ID is required");
    }
    const event = await this.eventService.getEventById(Number(id));
    if (!event) throw new NotFoundError("Event not found");
    const eventData: Partial<Event> = req.body;
    const updatedEvent = await this.eventService.updateEvent(
      id,
      eventData as Event
    );
    successResponse({
      res,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  });

  deleteEvent = catchAsync(async (req: ArtistRequest, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError("Event ID is required");
    }
    const event = await this.eventService.getEventById(Number(id));
    if (!event) throw new NotFoundError("Event not found");
    await this.eventService.deleteEvent(id);
    successResponse({ res, message: "Event deleted successfully" });
  });
}

export default new EventController();
