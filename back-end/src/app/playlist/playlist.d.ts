interface PlaylistInput {
  id?: string;
  name: string;
  description?: string;
  audios?: string[];
  image?: string;
  owner: string;
}

export { PlaylistInput };
