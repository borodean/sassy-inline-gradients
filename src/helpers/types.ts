export type RawColorStop = {
  color: string;
  offset?: number;
};

export type ColorStop = Required<RawColorStop>;

export type Options = {
  optimize?: boolean;
  resolver?: (result: Buffer) => string;
};
