export type RawColorStop = {
  color: string;
  offset?: number;
};

export type ColorStop = Required<RawColorStop>;
