import { Artist } from "../models/artist.model";
import { BadRequestError } from "../utils/error";

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

interface ArtistProfile {
  name: string;
  email: string;
  genre: string;
  bio: string;
  password: string;
}

class ArtistService {
  async saveArtist(data: Artist): Promise<Artist> {
    return await Artist.create(data);
  }

  async getArtistByEmail(email: string): Promise<Artist | null> {
    return await Artist.findOne({ where: { email } });
  }

  async editArtistProfile(
    artistId: string,
    data: Partial<ArtistProfile>
  ): Promise<Artist> {
    const artist = await Artist.findByPk(artistId);
    if (!artist) throw new BadRequestError("Artist not found");

    await artist.update(data);
    return artist;
  }

  async getArtistById(id: string): Promise<Artist | null> {
    return await Artist.findByPk(id);
  }
}

export default new ArtistService();
