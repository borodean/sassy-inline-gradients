export type RawColorStop = {
  offset?: number;
  premultiplied: string;
};

export type ColorStop = Required<RawColorStop>;

export type Options = {
  optimize?: boolean;
  resolver?: (result: Buffer) => string;
};
